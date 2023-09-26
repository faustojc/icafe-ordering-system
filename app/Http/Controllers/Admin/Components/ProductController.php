<?php

namespace App\Http\Controllers\Admin\Components;

use App\Events\ProductProcessed;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use JsonException;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     */
    public function index(Request $request): JsonResponse
    {
        $search = $request->input('query');
        $page = (is_null($request->input('page'))) ? 1 : (int)$request->input('page');
        $category = $request->input('category');

        $query = Product::query();

        if ($search) {
            $query->where('name', 'LIKE', "%{$search}%");
        }

        if (!is_null($category)) {
            $query->where('category', $category);
        }

        $products = $query->latest()->paginate(perPage: 10, page: $page);

        return response()->json($products);
    }

    public function upload(Request $request): JsonResponse
    {
        $image = $request->file('image');
        $validator = Validator::make(['image' => $image], [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
            ]);
        }

        return response()->json([
            'message' => 'Image uploaded successfully',
            'image' => $image->getClientOriginalName(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     */
    public function store(Request $request): JsonResponse
    {
        $request->file('image')?->storePubliclyAs('products', $request->file('image')?->getClientOriginalName());

        $product = new Product();
        $product->name = $request->input('name');
        $product->price = (float)$request->input('price');
        $product->category = $request->input('category');
        $product->description = $request->input('description');
        $product->image = $request->file('image')?->getClientOriginalName();
        $product->save();

        ProductProcessed::dispatch(auth()->guard('admin')->user(), $product, 'Added', 'success');

        return response()->json(['product' => $product]);
    }

    /**
     * Display the specified resource.
     *
     */
    public function show(string $id): JsonResponse
    {
        $product = Product::query()->where('id', $id)->first();

        return response()->json(['product' => $product]);
    }

    /**
     * Update the specified resource in storage.
     *
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $data = $request->all();

        if ($request->hasFile('image')) {
            $request->file('image')?->storePubliclyAs('products', $request->file('image')?->getClientOriginalName());
            $data['image'] = $request->file('image')?->getClientOriginalName();
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

        ProductProcessed::dispatch(auth()->guard('admin')->user(), $product, 'Updated', 'info');

        return response()->json(['product' => $product]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @throws JsonException
     */
    public function destroy(string $id): JsonResponse
    {
        $product = Product::query()->where('id', $id)->get()->first();

        ProductProcessed::dispatch(auth()->guard('admin')->user(), $product, 'Deleted', 'success');
        Product::query()->where('id', $id)->get()->first()->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
