<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ახალი შეკვეთა მიღებულია</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
            line-height: 1.6;
            color: #000;
        }
        .wrapper {
            background-color: #f5f5f5;
            padding: 40px 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: #C80A1D;
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            font-size: 28px;
            font-weight: 600;
            margin: 0;
        }
        .content {
            padding: 40px 30px;
        }
        .content p {
            margin-bottom: 18px;
            font-size: 16px;
        }
        .order-details {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 6px;
            border-left: 4px solid #C80A1D;
            margin: 30px 0;
        }
        .order-details p {
            margin-bottom: 12px;
            font-size: 15px;
        }
        .order-details strong {
            color: #000;
        }
        .button-wrapper {
            text-align: center;
            margin: 30px 0;
        }
        .download-btn {
            display: inline-block;
            background: #C80A1D;
            color: white;
            padding: 14px 32px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            transition: transform 0.2s, box-shadow 0.2s;
            box-shadow: 0 4px 12px rgba(200, 10, 29, 0.3);
        }
        .divider {
            height: 1px;
            background-color: #e5e5e5;
            margin: 40px 0;
        }
        .footer {
            background-color: #f9f9f9;
            padding: 30px;
            text-align: center;
            font-size: 14px;
            color: #666;
            border-top: 1px solid #e5e5e5;
        }
        .footer strong {
            color: #C80A1D;
            font-weight: 600;
        }
    </style>
</head>
<body>
<div class="wrapper">
    <div class="container">
        <div class="header">
            <h1>🧾 ახალი შეკვეთა მიღებულია</h1>
        </div>

        <div class="content">
            <p>მოგესალმებით,</p>

            <p>თქვენ მიიღეთ ახალი ჩარჩოს შეკვეთა.</p>

            <p>სრული შეკვეთის სანახავად ჩამოტვირთეთ ინვოისი.</p>

            <div class="button-wrapper">
                <a href="{{ route('download.file', ['filename' => basename($pdfUrl)]) }}" class="download-btn"style="color: white !important;">
                    📄 ინვოისის გადმოწერა
                </a>
            </div>

            <p style="font-size: 14px; color: #999; text-align: center;">
                ან დააკოპირეთ ლინკი:
            </p>
            <p style="font-size: 12px; color: #333; word-break: break-all; background-color: #f9f9f9; padding: 12px; border-radius: 4px; border-left: 3px solid #C80A1D;">
                {{ $pdfUrl }}
            </p>
        </div>

        <div class="divider"></div>

        <div class="footer">
            {{ config('app.name') }}<br>
            <strong>Admin Panel</strong>
        </div>
    </div>
</div>
</body>
</html>
