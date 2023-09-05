<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class OrderMenu extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Customer/Menu');
    }
}
