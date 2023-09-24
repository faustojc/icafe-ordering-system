<?php

namespace App\Http\Controllers\Admin\Components;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Notifications\ProductNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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
        $search = $request->input('query');
        $page = (is_null($request->input('page'))) ? 1 : (int)$request->input('page');
        $categories = (empty($request->input('categories'))) ? '' : explode(',', $request->input('categories'));

        $query = Product::query();

        if ($search) {
            $query->where('name', 'LIKE', "%{$search}%");
        }

        if (!empty($categories)) {
            $query->whereIn('category', $categories);
        }

        $products = $query->latest()->paginate(perPage: 10, page: $page);

        return json_encode($products, JSON_THROW_ON_ERROR);
    }

    /**
     * @throws JsonException
     */
    public function upload(Request $request)
    {
        $image = $request->file('image');
        $validator = Validator::make(['image' => $image], [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return json_encode([
                'message' => $validator->errors()->first(),
            ], JSON_THROW_ON_ERROR);
        }

        return json_encode([
            'message' => 'Valid image',
            'image' => $image->getClientOriginalName(),
        ], JSON_THROW_ON_ERROR);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @throws JsonException
     */
    public function store(Request $request): bool|string
    {
        $request->file('image')?->storePubliclyAs('products', $request->file('image')?->getClientOriginalName());

        $product = new Product();
        $product->name = $request->input('name');
        $product->price = (float)$request->input('price');
        $product->category = $request->input('category');
        $product->description = $request->input('description');
        $product->image = $request->file('image')->getClientOriginalName();
        $product->save();

        $addedProduct = Product::query()->where('id', $product->id)->first();

        auth()->guard('admin')->user()?->notify(new ProductNotification($addedProduct, 'Added', 'success'));

        return json_encode($addedProduct, JSON_THROW_ON_ERROR);
    }

    /**
     * Display the specified resource.
     *
     * @throws JsonException
     */
    public function show(string $id): bool|string
    {
        $product = Product::query()->where('id', $id)->first();

        return json_encode($product, JSON_THROW_ON_ERROR);
    }

    /**
     * Update the specified resource in storage.
     *
     * @throws JsonException
     */
    public function update(Request $request, string $id): bool|string
    {
        $data = $request->all();

        if ($request->hasFile('image')) {
            $request->file('image')->storePubliclyAs('products', $request->file('image')->getClientOriginalName());
            $data['image'] = $request->file('image')->getClientOriginalName();
        }
        else {
            $data['image'] = Product::query()->where('id', $id)->get('image')->first()->image;
        }

        $product = Product::query()->find($id);
        $product->name = $data['name'];
        $product->price = (float)$data['price'];
        $product->category = $data['category'];
        $product->is_available = (int)$data['is_available'];
        $product->featured = (int)$data['featured'];
        $product->description = $data['description'];
        $product->image = $data['image'];
        $product->save();

        auth()->guard('admin')->user()?->notify(new ProductNotification($product, 'Updated', 'success'));

        return json_encode([
            'message' => 'Product updated successfully',
            'product' => $product,
        ], JSON_THROW_ON_ERROR);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @throws JsonException
     */
    public function destroy(string $id): bool|string
    {
        $product = Product::query()->where('id', $id)->get()->first();

        auth()->guard('admin')->user()->notify(new ProductNotification($product, 'Deleted', 'success'));
        Product::query()->where('id', $id)->get()->first()->delete();

        return json_encode([
            'message' => 'Product deleted successfully',
        ], JSON_THROW_ON_ERROR);
    }
}
