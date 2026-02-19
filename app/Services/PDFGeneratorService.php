<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Spatie\Browsershot\Browsershot;
use Spatie\LaravelPdf\Facades\Pdf;

class PDFGeneratorService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function generate(array $variables, string $filename = null): string {
        $pdfDir = storage_path('app/public/invoices');

        if (!File::exists($pdfDir)) {
            File::makeDirectory($pdfDir, 0777, true);
        }

        $pdfPath = $pdfDir . '/' . $filename;
            Pdf::view('orders.order-pdf', $variables ?? [])
                ->withBrowsershot(function (Browsershot $browsershot) {
                    $browsershot
                        ->setNodeBinary(config('laravel-pdf.node_binary'))
                        ->setNpmBinary(config('laravel-pdf.npm_binary'))
                        ->noSandbox()
                        ->showBackground()
                        ->format('A4');
                })
                ->save($pdfPath);

        return $pdfPath;
    }
}
