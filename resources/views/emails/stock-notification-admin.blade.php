<!DOCTYPE html>
<html lang="ka">
<head>
    <meta charset="UTF-8">
    <title>მარაგის შეტყობინება</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f7fa; font-family:Arial, Helvetica, sans-serif;">
<div style="max-width:600px; margin:40px auto; background-color:#ffffff; border-radius:8px; overflow:hidden;">

    <!-- Header -->
    <div style="padding:20px; text-align:center; background-color:#c80a1d;">
        <h2 style="margin:0; color:#ffffff; font-size:18px;">
            მარაგის შევსების მოთხოვნა
        </h2>
    </div>

    <!-- Content -->
    <div style="padding:28px;">
        <p style="margin:0 0 16px; font-size:15px; color:#374151; line-height:1.6;">
            მომხმარებელს სურს მიიღოს შეტყობინება ქვემოთ მოცემული პროდუქტის მარაგის შევსებისთანავე:
        </p>

        <div style="background-color:#f9fafb; border:1px solid #e5e7eb; border-radius:6px; padding:16px; margin-bottom:16px;">
            <p style="margin:0 0 6px; font-size:13px; color:#6b7280;">მომხმარებლის სახელი</p>
            <p style="margin:0; font-size:15px; font-weight:bold; color:#111827;">{{ $userName }}</p>
        </div>

        <div style="background-color:#f9fafb; border:1px solid #e5e7eb; border-radius:6px; padding:16px; margin-bottom:16px;">
            <p style="margin:0 0 6px; font-size:13px; color:#6b7280;">მომხმარებლის ტელეფონი</p>
            <p style="margin:0; font-size:15px; font-weight:bold; color:#111827;">{{ $userPhone }}</p>
        </div>

        <div style="background-color:#f9fafb; border:1px solid #e5e7eb; border-radius:6px; padding:16px; margin-bottom:16px;">
            <p style="margin:0 0 6px; font-size:13px; color:#6b7280;">კოდი</p>
            <p style="margin:0; font-size:15px; font-weight:bold; color:#111827;">{{ $itemNo }}</p>
        </div>

        <div style="background-color:#f9fafb; border:1px solid #e5e7eb; border-radius:6px; padding:16px; margin-bottom:16px;">
            <p style="margin:0 0 6px; font-size:13px; color:#6b7280;">პროდუქტი</p>
            <p style="margin:0; font-size:15px; color:#111827;">{{ $itemName }}</p>
        </div>
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
