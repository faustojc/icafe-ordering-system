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
        $orders = Order::with(['orderItems.product'])->whereHas('orderItems.product', function ($query) {
                $query->where('name', 'like', "%{$this->query}%");
            })->orderBy('created_at', 'desc')
            ->paginate(15);

        return view('livewire.admin.components.display-orders', [
            'orders' => $orders,
        ]);
    }
}
