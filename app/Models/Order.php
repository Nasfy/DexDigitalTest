<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public const TRANSACTION_FAIL = 'fail';

    public const TRANSACTION_SUCCESS = 'success';

    protected $fillable = [
        'status',
        'order_id'
    ];
}
