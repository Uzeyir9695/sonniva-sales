<?php

namespace App\Mail;

use App\Models\Item;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class StockNotificationAdminMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly User $user,
        public readonly Item $item,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "მარაგის მოთხოვნა: {$this->item->name}",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.stock-notification-admin',
            with: [
                'userName' => $this->user->name,
                'userPhone' => $this->user->phone,
                'itemNo' => $this->item->no,
                'itemName' => $this->item->name,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
