<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderSendMail extends Mailable
{
    use Queueable, SerializesModels;

    public $pdfUrl;
    public $invoiceNumber;

     /**
     * Create a new message instance.
     *
     * @return void
     */

    public function __construct($pdfUrl, $invoiceNumber=null)
    {
        $this->pdfUrl = $pdfUrl;
        $this->invoiceNumber = $invoiceNumber;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'თქვენ გაქვთ ახალი შეკვეთა #' . $this->invoiceNumber,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.order',
            with: [
                'pdfUrl' => $this->pdfUrl,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
