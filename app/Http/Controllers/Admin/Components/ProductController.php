<?php

namespace App\Http\Controllers\Admin\Components;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use JsonException;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @throws JsonException
     */
    public function index(Request $request)
    {
        $query = $request->input('query');
        $products = Product::query()->where('name', 'LIKE', "%{$query}%")->latest()->paginate(10);

        return json_encode([
            'products' => $products,
        ], JSON_THROW_ON_ERROR);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @throws JsonException
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $data['image'] = $request->file('image')->storePubliclyAs('products', $request->file('image')->getClientOriginalName(), 'public');

        $product = Product::query()->create($data);

        return json_encode([
            'message' => 'Product created successfully',
            'product' => $product,
        ], JSON_THROW_ON_ERROR);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Product::query()->find($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
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
     * @throws JsonException
     */
    public function destroy(string $id)
    {
        Product::query()->where('id', $id)->delete();

        return json_encode([
            'message' => 'Product deleted successfully',
        ], JSON_THROW_ON_ERROR);
    }
}
