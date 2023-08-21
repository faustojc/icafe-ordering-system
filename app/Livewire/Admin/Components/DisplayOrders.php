<?php

namespace App\Livewire\Admin\Components;

use App\Models\Order;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Livewire\Component;
use Livewire\WithPagination;

class DisplayOrders extends Component
{
    use WithPagination;
    public $paginators = [];
    public string $query = '';

    public function render(): View|\Illuminate\Foundation\Application|Factory|Application
    {
        /* I can do this If I follow Laravel docs in one-to-many relationship query
        $orders = Order::find(1);

        $orders->orderItems->where('product_id', 1)->get();
        */

        $orders = Order::with(['orderItems.product'])->whereHas('orderItems.product', function ($query) {
                $query->where('name', 'like', "%{$this->query}%");
            })->orderBy('created_at', 'desc')
            ->paginate(15);

        return view('livewire.admin.components.display-orders', [
            'orders' => $orders,
        ]);
    }
}
