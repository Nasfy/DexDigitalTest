<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Success Request</title>

    </head>

    <body class="antialiased">
        <div class="relative flex items-top justify-center min-h-screen  dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
            <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <h1>Success</h1>
                <h2>Order status: {{$_POST['order_status']}}</h2>

            </div>
        </div>
    </body>
</html>
