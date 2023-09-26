<?php

namespace App\Http\Controllers\Customer\Components;

use App\Events\PlaceOrder;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     */
    public function index(Request $request): JsonResponse
    {
        $search = $request->input('query');
        $page = (is_null($request->input('page'))) ? 1 : (int)$request->input('page');

        $query = Order::with('orderItems.product');

        if ($search) {
            $query->where('customer_name', 'LIKE', "%{$search}%")
                ->orWhere('id', 'LIKE', "%{$search}%");
        }

        $orders = $query->oldest()->paginate(perPage: 20, page: $page);

        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     *
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->input('orders');
        $customer_name = $request->input('customer_name');
        $notes = $request->input('notes');

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

        return response()->json([
            'message' => 'Order placed successfully'
        ]);
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
     *
     */
    public function destroy(string $id): bool|string
    {
        Order::with('orderItems')->where('id', $id)->delete();

        return response()->json(['message' => 'Order served successfully']);
    }
}
