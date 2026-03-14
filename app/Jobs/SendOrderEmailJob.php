<?php

namespace App\Jobs;

use App\Models\Order;
use App\Models\Payment;
use App\Models\User;
use App\Mail\OrderSendMail;
use App\Mail\OrderApprovedEmail;
use App\Services\PDFGeneratorService;
use App\Services\SmsService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendOrderEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 300;

    public function __construct(
        public string $orderId,
        public string $paymentId,
        public string $invoiceNumber,
        public ?User $customer = null
    ) {}

    public function handle(PDFGeneratorService $pdfService, SmsService $smsService)
    {
        $order = Order::with(['items.item', 'user'])->findOrFail($this->orderId);
        $payment = Payment::findOrFail($this->paymentId);

        $viewVars = [
            'order'   => $order,
            'payment' => $payment,
        ];

        $fileName = 'order_' . $this->invoiceNumber . '.pdf';

        $pdfService->generate($viewVars, $fileName);
        $pdfUrl = route('download.file', ['filename' => $fileName]);

        Mail::to(config('mail.company.address'))->send(new OrderSendMail($pdfUrl, $this->invoiceNumber));

        if ($this->customer) {
            $msg = Order::paymentConfirmedMessage($this->invoiceNumber);
            Mail::to($this->customer->email)->send(new OrderApprovedEmail($msg));
            $smsService->send($this->customer->phone, $msg, true);
        }
    }
}