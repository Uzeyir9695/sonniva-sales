<?php

namespace App\Services;

use App\Models\BusinessCentralToken;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;

class BusinessCentralService
{
    protected string $clientId;

    protected string $clientSecret;

    protected string $scope;

    protected string $tokenUrl;

    protected string $baseUrl;

    public function __construct()
    {
        $this->clientId = config('bc.client_id');
        $this->clientSecret = config('bc.client_secret');
        $this->scope = config('bc.scope');
        $this->tokenUrl = config('bc.token_url');
        $this->baseUrl = config('bc.api_base_url');
    }

    public function getAccessToken(bool $forceRefresh = false): string
    {
        if (! $forceRefresh) {
            $token = BusinessCentralToken::latest()->first();

            if ($token && ! $token->isExpired() && ! $token->isExpiringSoon()) {
                return $token->access_token;
            }
        }

        $response = Http::asForm()->post($this->tokenUrl, [
            'grant_type' => 'client_credentials',
            'client_id' => $this->clientId,
            'client_secret' => $this->clientSecret,
            'scope' => $this->scope,
        ]);

        if ($response->failed()) {
            throw new \Exception('Failed to get access token: '.$response->body());
        }

        $data = $response->json();

        $expiresAt = Carbon::now()->addSeconds($data['expires_in'] - 60);

        BusinessCentralToken::create([
            'access_token' => $data['access_token'],
            'expires_in' => $data['expires_in'],
            'expires_at' => $expiresAt,
        ]);

        return $data['access_token'];
    }

    public function get(string $endpoint, array $params = [])
    {
        $token = $this->getAccessToken();

        $response = Http::withToken($token)
            ->get($this->baseUrl.ltrim($endpoint, '/'), $params);

        if ($response->failed()) {
            throw new \Exception('API GET failed: '.$response->body());
        }

        return $response->json();
    }

    public function getItemByBarcode($barcode)
    {
        $fields = [
            'Barcode_No',
            'Item_No',
            'Description',
            'Unit_of_Measure_Code',
        ];

        $token = $this->getAccessToken();

        $baseUrl = $this->baseUrl."904668f4-6aa7-44ce-8285-5c27b33faeeb/Production/ODataV4/Company('SONNIVA')/retailitemlistbybarcodes";

        $response = Http::withToken($token)->get($baseUrl, [
            '$filter' => "Barcode_No eq '{$barcode}'",
            '$select' => implode(',', $fields),
        ]);

        return $response->json();
    }

    public function searchItemsByDescription(string $searchTerm)
    {
        $fields = [
            'no',
            'description',
            'image1',
        ];

        $token = $this->getAccessToken();

        $baseUrl = $this->baseUrl.'Production/api/smart/sonniva/v1.0/companies(dc29e11b-78aa-ee11-be38-000d3ab8f033)/itemsDetailed';

        // Use startswith instead of contains for items starting with search term
        $response = Http::withToken($token)->get($baseUrl, [
            '$filter' => "(startswith(description, '{$searchTerm}') or contains(description, '{$searchTerm}'))",
            '$select' => implode(',', $fields),
            '$top' => 100,
        ]);

        return $response->json();
    }

    public function getItemCategoryByCode(string $code): ?array
    {
        $token = $this->getAccessToken();

        $baseUrl = $this->baseUrl.'Production/api/smart/sonniva/v1.0/companies(dc29e11b-78aa-ee11-be38-000d3ab8f033)/itemCategories';

        $response = Http::withToken($token)->get($baseUrl, [
            '$filter' => "code eq '{$code}'",
            '$select' => 'code,imageBase64',
        ]);

        if ($response->failed()) {
            throw new \Exception('Item Category API GET failed: '.$response->body());
        }

        return $response->json()['value'][0] ?? null;
    }

    public function calcInventory($itemNo)
    {
        $fields = [
            'Item_No',
            'Description',
            'Location_Code',
            'Remaining_Quantity',
        ];

        $token = $this->getAccessToken();

        $baseUrl = $this->baseUrl."904668f4-6aa7-44ce-8285-5c27b33faeeb/Production/ODataV4/Company('SONNIVA')/Item_Ledger_Entries_Excel";

        $response = Http::withToken($token)->get($baseUrl, [
            '$filter' => "Item_No eq '{$itemNo}'",
            '$select' => implode(',', $fields),
        ]);

        $data = $response->json();

        $collection = collect($data['value']);

        $shop01Total = $collection
            ->where('Location_Code', 'SHOP01')
            ->sum('Remaining_Quantity');

        $shop02Total = $collection
            ->where('Location_Code', 'SHOP02')
            ->sum('Remaining_Quantity');

        return [
            'shop1Total' => $shop01Total,
            'shop2Total' => $shop02Total,
        ];
    }

    public function getScannedItemDetails($itemNo)
    {
        $fields = [
            'no',
            'description',
            'image1',
        ];

        $token = $this->getAccessToken();

        $baseUrl = $this->baseUrl."Production/api/smart/sonniva/v1.0/companies(dc29e11b-78aa-ee11-be38-000d3ab8f033)/itemsDetailed('$itemNo')";

        $response = Http::withToken($token)->get($baseUrl, [
            '$select' => implode(',', $fields),
            '$expand' => 'itemUnitPrices',
        ]);

        return $response->json();
    }

    public function addCustomer($user)
    {
        $token = $this->getAccessToken();

        $data = [
            'Name' => $user?->name.' '.$user?->lastname,
            'Search_Name' => $user?->name.' '.$user?->lastname,
            'Address' => $user?->address,
            'Address_2' => '',
            'Credit_Limit_LCY' => 0.01,
            'Salesperson_Code' => 'WEB SHOP',
            'Phone_No' => $user?->phone,
            'E_Mail' => $user?->email ?? 'Email not provided',
            'VAT_Registration_No' => $user?->tax_id,
            'Prices_Including_VAT' => true,
            'Gen_Bus_Posting_Group' => 'DOMESTIC',
            'Customer_Posting_Group' => 'DOMESTIC',
        ];

        $custEndpoint = 'Customers?$filter=VAT_Registration_No eq '."'".$user?->tax_id."'";

        $bcCustomer = $this->getCustomer($custEndpoint);

        if (empty($bcCustomer['value'])) {
            $response = Http::withToken($token)
                ->post($this->baseUrl."904668f4-6aa7-44ce-8285-5c27b33faeeb/Production/ODataV4/Company('SONNIVA')/Customers", $data);

            if ($response->failed()) {
                throw new \Exception('Add Customer API POST failed: '.$response->body());
            }

            $user->bc_customer_no = $response['No'];
            $user->save();
        } else {
            $user->bc_customer_no = $bcCustomer['value'][0]['No'];
            $user->save();
        }
    }

    public function updateCustomer(string $endpoint, array $data = [])
    {
        $token = $this->getAccessToken();

        $response = Http::withToken($token)
            ->withHeaders([
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
                'If-Match' => '*',
            ])
            ->patch($this->baseUrl."904668f4-6aa7-44ce-8285-5c27b33faeeb/Production/ODataV4/Company('SONNIVA')/".ltrim($endpoint, '/'), $data);

        if ($response->failed()) {
            throw new \Exception('Update Customer API PUT failed: '.$response->body());
        }

        return $response->json();
    }

    public function getCustomer(string $endpoint)
    {
        $token = $this->getAccessToken();

        $response = Http::withToken($token)
            ->get($this->baseUrl."904668f4-6aa7-44ce-8285-5c27b33faeeb/Production/ODataV4/Company('SONNIVA')/".ltrim($endpoint, '/'));

        if ($response->failed()) {
            throw new \Exception('Get Customer API GET failed: '.$response->body());
        }

        return $response->json();
    }

    public function addSalesOrders($order, $orderItems)
    {
        $token = $this->getAccessToken();

        $user = $order->user;

        $data = [
            'Document_Type' => 'Order',
            'Sell_to_Customer_No' => $user->bc_customer_no,
            'External_Document_No' => $order->invoice_no,
            'Salesperson_Code' => '6002',
            'ShippingOptions' => 'Custom Address',
            'Ship_to_Name' => $user->name,
            'Ship_to_Address' => $order->address.
                ($order->apartment_number
                    ? ' - Apartment number: '.$order->apartment_number
                    : ''),
            'Ship_to_Address_2' => '',
            'Ship_to_City' => '',
            'Ship_to_County' => '',
            'Ship_to_Post_Code' => '',
            'Ship_to_Country_Region_Code' => 'GE',
            'Ship_to_Phone_No' => $user->phone,
            'Ship_to_Contact' => $user->phone,
        ];

        $response = Http::withToken($token)
            ->post($this->baseUrl."904668f4-6aa7-44ce-8285-5c27b33faeeb/Production/ODataV4/Company('SONNIVA')/SalesOrders", $data);

        if ($response->failed()) {
            throw new \Exception('Sales Orders API POST failed: '.$response->body());
        }

        $result = $response->json();

        $this->addSalesOrderLines($order, $orderItems, $result['No']);
    }

    public function addSalesOrderLines($order, $orderItems, $orderNo)
    {
        $token = $this->getAccessToken();

        $salesOrderLines = [];

        $deliveryType = $order->delivery_type;

        if ($deliveryType !== 'office' && ($deliveryType === 'tbilisi' && $order->total < 100)) {
            $code = match ($deliveryType) {
                'tbilisi' => 'NONIN9999-02',
                'regions' => 'NONIN9999-01',
                default => null,
            };
            $salesOrderLines[] = [
                'Document_Type' => 'Order',
                'Document_No' => $orderNo,
                'Line_Discount_Percent' => 0.0,
                'Type' => 'Item',
                'No' => $code,
                'Quantity' => 1,
                'Unit_of_Measure_Code' => 'ცალი/UNIT',
            ];
        }

        foreach ($orderItems as $orderItem) {
            $salesOrderLines[] = [
                'Document_Type' => 'Order',
                'Document_No' => $orderNo,
                'Line_Discount_Percent' => (float) ($orderItem->bc_discount ?? 0),
                'Type' => 'Item',
                'No' => $orderItem->item->no,
                'Quantity' => $orderItem->quantity,
                'Unit_of_Measure_Code' => $orderItem->unit_of_measure_code ?? $orderItem->item->base_uom_desc,
            ];
        }

        foreach ($salesOrderLines as $data) {
            $response = Http::withToken($token)
                ->post($this->baseUrl."904668f4-6aa7-44ce-8285-5c27b33faeeb/Production/ODataV4/Company('SONNIVA')/SalesOrderLines", $data);

            if ($response->failed()) {
                throw new \Exception('Sales Order Lines API POST failed: '.$response->body());
            }

            usleep(200000); // 0.2 seconds delay to avoid overwhelming the API
        }
    }

    public function addShipToAddress($orderItem)
    {
        $token = $this->getAccessToken();

        $user = $orderItem->user;

        $getEndpoint = 'ShipToAddress?$filter=Customer_No eq '."'".$user->bc_customer_no."'";

        $getCustomerNo = $this->getShipToAddress($getEndpoint);
        $values = $getCustomerNo['value'] ?? [];

        if (empty($values)) {
            $nextNumber = 1;
        } else {
            $maxNumber = collect($values)
                ->pluck('Code')
                ->map(fn ($code) => (int) $code) // "0012" → 12
                ->max();

            $nextNumber = $maxNumber + 1;
        }

        $nextCode = str_pad($nextNumber, 4, '0', STR_PAD_LEFT);

        $data = [
            'Customer_No' => $user->bc_customer_no,
            'Code' => $nextCode,
            'Name' => $user->name ?? 'Testing Unknown Customer',
            'Name_2' => '',
            'SMA_Full_Name' => $user->name.' '.$user->lastname,
            'Address' => $orderItem->address,
            'Address_2' => $orderItem->apartment_number ?? '',
            'City' => '',
            'County' => '',
            'Post_Code' => '',
            'Phone_No' => $user->phone,
            'E_Mail' => $user->email,
        ];

        $response = Http::withToken($token)
            ->post($this->baseUrl."904668f4-6aa7-44ce-8285-5c27b33faeeb/Production/ODataV4/Company('SONNIVA')/ShipToAddress", $data);

        if ($response->failed()) {
            throw new \Exception('Ship To Address API POST failed: '.$response->body());
        }
    }

    public function getShipToAddress(string $endpoint)
    {
        $token = $this->getAccessToken();

        $response = Http::withToken($token)
            ->get($this->baseUrl."904668f4-6aa7-44ce-8285-5c27b33faeeb/Production/ODataV4/Company('SONNIVA')/".ltrim($endpoint, '/'));

        if ($response->failed()) {
            throw new \Exception('Ship To Address API GET failed: '.$response->body());
        }

        return $response->json();
    }

    public function getCustomerCreditInfo(string $taxId): array
    {
        $token = $this->getAccessToken();

        $response = Http::withToken($token)
            ->get($this->baseUrl."904668f4-6aa7-44ce-8285-5c27b33faeeb/Production/ODataV4/Company('SONNIVA')/Customers", [
                '$filter' => "VAT_Registration_No eq '{$taxId}'",
                '$select' => 'Balance_Due_LCY,Credit_Limit_LCY',
            ]);

        if ($response->failed()) {
            throw new \Exception('Customer credit info fetch failed: '.$response->body());
        }

        $customer = $response->json()['value'][0] ?? null;

        if (! $customer) {
            return ['has_credit' => false, 'available' => 0, 'limit' => 0, 'used' => 0];
        }

        $limit = (float) $customer['Credit_Limit_LCY'];
        $used = (float) $customer['Balance_Due_LCY'];
        $available = max(0, $limit - $used);

        return [
            'has_credit' => $limit > 0.01,
            'limit' => round($limit, 2),
            'used' => round($used, 2),
            'available' => round($available, 2),
        ];
    }
}
