<?php
   
    return [
        'paths' => ['api/*'],
        'allowed_methods' => ['*'],
        'allowed_origins' => ['http://localhost:3000', 'http://localhost:5173'], // Add both frontend URLs
        'allowed_headers' => ['*'],
        'exposed_headers' => [],
        'max_age' => 0,
        'supports_credentials' => false,
    ];