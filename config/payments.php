<?php

return [
    'tbc' => [
        'client_id' => env('TBC_CLIENT_ID'),
        'client_secret' => env('TBC_CLIENT_SECRET'),
        'api_key'     => env('BOG_API_KEY'),
        'secret_key' => env('BOG_SECRET'),
        'api_url' => env('TBC_API_URL'),
        'callback_url' => env('TBC_CALLBACK_URL') . '/payment/callback?provider=tbc',
        'iban' => env('TBC_IBAN'),
    ],
    'flitt' => [
        'merchant_id' => env('FLITT_MERCHANT_ID'),
        'secret_key' => env('FLITT_SECRET_KEY'),
        'api_version' => env('FLITT_API_VERSION', '1.0'),
        'request_type' => env('FLITT_REQUEST_TYPE', 'json'),
        'callback_url' => env('FLITT_CALLBACK_URL') . '/payment/callback?provider=tbc',
    ],
    'bog' => [
        'client_id' => env('BOG_CLIENT_ID'), // For Production
        'client_secret' => env('BOG_CLIENT_SECRET'), // For Production
        'api_key'     => env('BOG_API_KEY'), // For local development
        'secret_key' => env('BOG_SECRET'), // For local development
        'api_url' => env('BOG_API_URL'),
        'callback_url' => env('BOG_CALLBACK_URL')  .'/payment/callback?provider=bog',
        'iban' => env('BOG_IBAN'),
    ],
    'pcb' => [
        'base_url' => env('PCB_TEST_URL', 'https://3dss2test.quipu.de:8000'),
        'merchant_id' => env('PCB_TEST_MERCHANT_ID'),
        'ca_path'   => storage_path('app/private/pcb-certs/ca.pem'),
        'cert_path' => storage_path('app/private/pcb-certs/cert.pem'),
        'key_path'  => storage_path('app/private/pcb-certs/key.pem'),
    ],
];
