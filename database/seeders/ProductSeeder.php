<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'AMERICANO',
                'category' => 'COFFEE',
                'price' => 90
            ],
            [
                'name' => 'LATTE',
                'category' => 'COFFEE',
                'price' => 100
            ],
            [
                'name' => 'COLDBREW',
                'category' => 'COFFEE',
                'price' => 100
            ],
            [
                'name' => 'CHOCO',
                'category' => 'COFFEE',
                'price' => 100
            ],
            [
                'name' => 'CARAMEL',
                'category' => 'COFFEE',
                'price' => 120
            ],
            [
                'name' => 'RED HORSE',
                'category' => 'BEER',
                'price' => 70
            ],
            [
                'name' => 'SAN MIG LIGHT',
                'category' => 'BEER',
                'price' => 70
            ],
            [
                'name' => 'SMB',
                'category' => 'BEER',
                'price' => 70
            ],
            [
                'name' => 'SM APPLE',
                'category' => 'BEER',
                'price' => 70
            ],
            [
                'name' => 'ANTIDOTE',
                'category' => 'COCKTAILS',
                'price' => 80
            ],
            [
                'name' => 'MEADOW',
                'category' => 'COCKTAILS',
                'price' => 80
            ],
        ];

        DB::transaction(static function () use ($products) {
            foreach ($products as $product) {
                $product['image'] = 'default.png';

                DB::table('products')->updateOrInsert($product);
            }
        });
    }
}
