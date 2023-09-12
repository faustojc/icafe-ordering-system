<?php

namespace App\Http\Controllers\Customer\Components;

use App\Events\PlaceOrder;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use JsonException;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Components/Orders/ShowOrders');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @throws JsonException
     */
    public function store(Request $request)
    {
        $data = $request->get('orders');
        $customer_name = $request->get('customer_name');
        $notes = $request->get('notes');

        $order = new Order();
        $order->total_price = (float)$request->get('total_price');

        if (!is_null($customer_name)) {
            $order->customer_name = $customer_name;
        }

        if (!is_null($notes)) {
            $order->notes = $notes;
        }

        $order->save();

        foreach ($data as $item) {
            $orderItem = new OrderItem([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
            ]);

            $order->orderItems()->save($orderItem);
        }

        $order->refresh();

        PlaceOrder::dispatch($order);

        return json_encode([
            'message' => 'Order placed successfully',
            'order' => $order,
        ], JSON_THROW_ON_ERROR);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
