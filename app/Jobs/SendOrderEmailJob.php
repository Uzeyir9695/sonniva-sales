<?php

namespace App\Jobs;

use App\Models\OrderItem;
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

    public $timeout = 300; // 5 minutes for BC API calls

    public function __construct(
        public array $viewVars,
        public string $invoiceNumber,
        public string $fileName,
        public ?User $customer = null
    ) {}

    public function handle(PDFGeneratorService $pdfService, SmsService $smsService)
    {
        // Generate PDF & Email Company
        $pdfService->generate($this->viewVars, $this->fileName);
        $pdfUrl = route('download.file', ['filename' => $this->fileName]);

        Mail::to(config('mail.company.address'))->send(new OrderSendMail($pdfUrl, $this->invoiceNumber));


        // Email/SMS Customer
        if ($this->customer) {
            $msg = \App\Models\OrderItem::paymentConfirmedMessage($this->invoiceNumber);
            Mail::to($this->customer->email)->send(new OrderApprovedEmail($msg));
            $smsService->send($this->customer->phone, $msg, true);

            OrderItem::where('invoice_no', $this->invoiceNumber)
                ->update([
                    'email_sent_at' => now(),
                ]);
        }
    }
}

