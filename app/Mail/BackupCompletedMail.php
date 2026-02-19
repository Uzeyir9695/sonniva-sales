<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BackupCompletedMail extends Mailable
{
    use Queueable, SerializesModels;
    public string $backupPath;
    /**
     * Create a new message instance.
     */
    public function __construct(string $backupPath)
    {
        $this->backupPath = $backupPath;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '✅ Sonniva Daily Backup Completed Successfully',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.backup',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {

        return [];
//        return [
//            Attachment::fromPath($this->backupPath)
//                ->as('sonniva_frame_daily_backup.zip')
//                ->withMime('application/zip')
//        ];
    }
}
