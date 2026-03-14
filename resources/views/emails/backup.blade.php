<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sonniva Backup Completed</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f6f8;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            background-color: #ffffff;
            margin: 40px auto;
            border-radius: 12px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
            overflow: hidden;
        }

        .header {
            background-color: #2563eb;
            color: #ffffff;
            padding: 20px 30px;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 22px;
            font-weight: 600;
        }

        .content {
            padding: 25px 30px;
            color: #333333;
            line-height: 1.6;
        }

        .content p {
            margin: 10px 0;
        }

        .footer {
            background-color: #f4f6f8;
            text-align: center;
            padding: 15px;
            font-size: 13px;
            color: #888888;
        }

    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>✅ Sonniva Daily Backup Completed</h1>
    </div>

    <div class="content">
        <p>Hello,</p>

        <p>Your scheduled <strong>daily backup</strong> has been completed successfully.</p>

        <p>The latest backup file is attached to this email.</p>

        <p>Stay safe,<br><strong>Sonniva Backup System</strong></p>
    </div>

    <div class="footer">
        <p>© {{ date('Y') }} Sonniva. All rights reserved.</p>
    </div>
</div>
</body>
</html>
