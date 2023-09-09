import {Card} from "flowbite-react";

export default function ProductCard({ product, setOrders }) {
    return (
        <Card renderImage={() => (
            <img src={"/images/products/" + product.image} alt={product.name}
                 className={"object-cover object-center h-48 rounded-t-lg"}
            />
        )}>
            <div className={"flex-1"}>
                <div className={"mb-2"}>
                    <span className="bg-blue-100 text-blue-800 text-xs rounded-full font-medium px-2.5 py-0.5 dark:bg-blue-900 dark:text-blue-300">
                        {product.category}
                    </span>
                </div>
                <div className={"flex-1"}>
                    <p className={"text-sm truncate text-gray-900 dark:text-white"}>
                        {product.name}
                    </p>
                    <p className={"text-md font-bold text-blue-400 dark:text-blue-300"}>P {product.price}</p>
                </div>
                <button className={"flex items-center justify-center mt-4 w-full hover:text-white border border-black hover:border-green-500 hover:bg-green-500 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"}>
                    <svg className={"w-4 h-4 mr-2"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm1-4H5m0 0L3 4m0 0h5.501M3 4l-.792-3H1m11 3h6m-3 3V1"/>
                    </svg>
                    Add
                </button>
            </div>
        </Card>
    );
}
