<!DOCTYPE html>
<html lang="ka">
<head>
    <meta charset="UTF-8">
    <title>შეკვეთის დადასტურება</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f7fa; font-family:Arial, Helvetica, sans-serif;">
<div style="max-width:600px; margin:40px auto; background-color:#ffffff; border-radius:8px; overflow:hidden;">

    <!-- Header -->
    <div style="padding:20px; text-align:center; background-color: #c80a1d;">
        <h2 style="margin:0; color:#ffffff; font-size:18px;">
            შეკვეთა დადასტურებულია
        </h2>
    </div>

    <!-- Content -->
    <div style="padding:28px;">
        <p style="margin:0 0 12px; font-size:15px; color:#374151; line-height:1.6;">
            {{ $messageText }}
        </p>

        <p style="margin:0; font-size:14px; color:#6b7280; line-height:1.5;">
            შეკვეთის სტატუსს შეგიძლიათ თვალი ადევნოთ თქვენი პროფილიდან.
        </p>
    </div>

    <!-- Footer -->
    <div style="padding:16px; text-align:center; background-color:#f9fafb; border-top:1px solid #e5e7eb;">
        <p style="margin:0; font-size:13px; color:#6b7280;">
            © {{ date('Y') }} Sonniva Georgia. ყველა უფლება დაცულია.
        </p>
    </div>

</div>
</body>
</html>
