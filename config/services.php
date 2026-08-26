<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'smsoffice' => [
        'key' => env('SMS_OFFICE_KEY'),
        'sender' => env('SMS_OFFICE_SENDER'),
        'callback_url' => env('SMS_OFFICE_CALLBACK_URL'),
    ],

    'google_recaptcha' => [
        'url' => 'https://www.google.com/recaptcha/api/siteverify',
        'site_key' => env('GOOGLE_RECAPTCHA_SITE_KEY'),
        'secret_key' => env('GOOGLE_RECAPTCHA_SECRET_KEY'),
    ],

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'weglot' => [
        'api_key' => env('WEGLOT_API_KEY'),
    ],

    'mobile_app' => [
        // Must match the sonniva-mobile app's NATIVEPHP_DEEPLINK_SCHEME —
        // used to hand off from the payment bridge page back into the app.
        'deeplink_scheme' => env('MOBILE_APP_DEEPLINK_SCHEME', 'sonniva'),
    ],

];
