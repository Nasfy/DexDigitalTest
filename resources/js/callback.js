jQuery(document).ready(function($){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
        }
    });
    $.extend(
        {
            redirectPost: function(location, args)
            {
                var form = '';
                $.each( args, function( key, value ) {
                    value = value.split('"').join('\"')
                    form += '<input type="hidden" name="'+key+'" value="'+value+'">';
                });
                $('<form action="' + location + '" method="POST">' + form + '</form>').appendTo($(document.body)).submit();
            }
        });

    jQuery('#success').on('submit', function (e) {
        e.preventDefault();

        success = {
            "pay_form": {
                "token": "xxx",
                "design_name": "des1"
            },
            "transactions": {
                "12345-7891234567": {
                    "id": "12345-7891234567",
                    "operation": "pay",
                    "status": "success",
                    "descriptor": "FAKE_PSP",
                    "amount": 2345,
                    "currency": "USD",
                    "fee": {
                        "amount": 0,
                        "currency": "USD"
                    },
                    "card": {
                        "bank": "CITIZENS STATE BANK",
                    }
                }
            },
            "order": {
                "order_id": "12345-7891234567",
                "status": "accepted",
                "amount": 2345,
                "refunded_amount": 0,
                "currency": "USD",
                "marketing_amount": 2345,
                "marketing_currency": "USD",
                "processing_amount": 2345,
                "processing_currency": "USD",
                "descriptor": "FAKE_PSP",
                "fraudulent": false,
                "total_fee_amount": 0,
                "fee_currency": "USD"
            },
            "transaction": {
                "id": "12345-7891234567",
                "operation": "pay",
                "status": "success"
             }
        }

        $.ajax({
            type: 'POST',
            url: 'callback',
            data: success,
            dataType: 'json',
        });

        if (success.transaction.status == 'success') {
            var redirect = 'thank-you';
            $.redirectPost(redirect, {order_status:success.order.status});
        }
    });

    jQuery('#fail').on('submit', function (e) {
        e.preventDefault();

        fail = {
            "pay_form": {
                "token": "xxx",
                "design_name": "des1"
            },
            "transactions": {
                "12345-7891234567": {
                    "id": "12345-7891234567",
                    "operation": "pay",
                    "status": "fail",
                    "descriptor": "FAKE_PSP",
                    "amount": 2345,
                    "currency": "USD",
                    "fee": {
                        "amount": 0,
                        "currency": "USD"
                    },
                    "card": {
                        "bank": "CITIZENS STATE BANK",
                    }
                }
            },
            "error": {
                "code": "6.01",
                "messages": [
                    "Unknown decline code"
                ],
                "recommended_message_for_user": "Unknown decline code"
            },
            "order": {
                "order_id": "12345-7891234567",
                "status": "declined",
                "amount": 2345,
                "refunded_amount": 0,
                "currency": "USD",
                "marketing_amount": 2345,
                "marketing_currency": "USD",
                "processing_amount": 2345,
                "processing_currency": "USD",
                "descriptor": "FAKE_PSP",
                "fraudulent": false,
                "total_fee_amount": 0,
                "fee_currency": "USD"
            },
            "transaction": {
                "id": "12345-7891234567",
                "operation": "pay",
                "status": "fail"
            }
        }

        $.ajax({
            type: 'POST',
            url: 'callback',
            data: fail,
            dataType: 'json',
        });

        if (fail.transaction.status == 'fail') {
            var redirect = 'sorry';

            $.redirectPost(redirect, {transaction_id:fail.transaction.id, transaction_operation:fail.transaction.operation, transaction_status:fail.transaction.status, order_status:fail.order.status});
        }
    });
});
