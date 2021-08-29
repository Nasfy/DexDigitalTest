<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Redirect;

class ApiController extends Controller
{
    public function callback(Request $request): void
    {
        if ($request->order) {
            if ($order = Order::query()->where('order_id', $request->order['order_id'])->first()) {
                if ($order->status != $request->order['status']) {
                    $order->update($request->order);
                }
            } else {
                Order::create($request->order);
            }
        }
    }

    public function getSuccess()
    {
        return view('success');
    }

    public function getFail()
    {
        return view('fail');
    }
}
