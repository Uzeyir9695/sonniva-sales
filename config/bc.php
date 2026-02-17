<?php

return [
    'client_id'     => env('BC_CLIENT_ID'),
    'client_secret' => env('BC_CLIENT_SECRET'),
    'scope'         => env('BC_SCOPE', 'https://api.businesscentral.dynamics.com/.default'),
    'token_url'     => env('BC_TOKEN_URL'),
    'api_base_url'  => env('BC_API_BASE_URL', 'https://api.businesscentral.dynamics.com/v2.0/'),
];
