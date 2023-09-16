<?php

namespace App\Http\Controllers\Customer\Components;

use App\Events\PlaceOrder;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use JsonException;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @throws JsonException
     */
    public function index(Request $request)
    {
        $search = $request->input('query');
        $page = (is_null($request->input('page'))) ? 1 : (int)$request->input('page');

        $query = Order::with('orderItems.product');

        if ($search) {
            $query->where('customer_name', 'LIKE', "%{$search}%")
                ->orWhere('id', 'LIKE', "%{$search}%");
        }

        $orders = $query->latest()->paginate(perPage: 15, page: $page);

        return json_encode($orders, JSON_THROW_ON_ERROR);
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

        $order->customer_name ??= $customer_name;
        $order->notes ??= $notes;

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
