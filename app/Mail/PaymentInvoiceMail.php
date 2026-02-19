<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PaymentInvoiceMail extends Mailable
{
    use Queueable, SerializesModels;
    public $pdfUrl;

    public $invoiceNumber;

    public function __construct($pdfUrl, $invoiceNumber)
    {
        $this->pdfUrl = $pdfUrl;
        $this->invoiceNumber = $invoiceNumber;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Invoice #{$this->invoiceNumber}",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.payment-invoice',
            with: [
                'invoiceNumber' => $this->invoiceNumber,
                'pdfUrl' => $this->pdfUrl,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
//        $path = storage_path('app/public/invoices/invoice_' . $this->invoiceNumber . '.pdf');
//
//        if (!file_exists($path)) {
//            return [];
//        }
//
//        return [
//            Attachment::fromPath($path)
//                ->as('Invoice_' . $this->invoiceNumber . '.pdf')
//                ->withMime('application/pdf'),
//        ];
        return [];
    }
}
