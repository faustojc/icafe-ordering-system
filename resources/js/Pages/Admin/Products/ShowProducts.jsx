import Alert from "@/Components/Alert.jsx";
import Loading from "@/Components/Loading.jsx";
import Pagination from "@/Components/Pagination.jsx";
import {Card} from "flowbite-react";
import {useEffect, useState} from "react";

function ShowProducts({products, setProducts, setOpenModal, setEditProduct, setDeleteProduct, query, ...props }) {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    let isEmpty = !products.data || Object.values(products.data).length === 0;

    useEffect(() => {
        setLoading(true);
        fetch(`/admin/products?query=${query}&page=${page}`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .finally(() => setLoading(false));
    }, [query, page]);

    return (
        <div {...props}>
            {isEmpty ? (
                <Card className={"relative"}>
                    {loading && <Loading />}
                    <Alert title={"No Products"} variant={"info"} message={"You haven't added any products yet. Click the button 'Add product' above to add a product."} />
                </Card>
            ) : (
                <div className={"relative overflow-x-auto shadow-md sm:rounded-lg"}>
                    {loading && <Loading />}

                    <table className={"w-full text-sm text-left text-gray-500 dark:text-gray-400"}>
                        <thead className="text-xs text-gray-700 uppercase bg-blue-400 dark:bg-gray-900 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.values(products.data).map((product) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600" key={product.id}>
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {product.name}
                                </th>
                                <td className="px-6 py-4">
                                    {product.price}
                                </td>
                                <td className="px-6 py-4">
                                    {product.category}
                                </td>
                                <td className="px-6 py-4">
                                    {product.is_available === 1 ? (
                                        <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                            <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                                            Available
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                                            <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                                            Unavailable
                                        </span>
                                    )}
                                </td>
                                <td className="flex items-center px-6 py-4 space-x-3">
                                    <button type={"button"} onClick={() => {
                                        setOpenModal('edit_product_modal');
                                        setEditProduct({
                                            ...product,
                                            ['id']: product.id,
                                            ['is_available']: product.is_available,
                                            ['featured']: product.featured,
                                            ['image']: `/images/products/${product.image}`
                                        });
                                    }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button type={"button"} onClick={() => {
                                        setOpenModal('delete_product_modal');
                                        setDeleteProduct(product.id);
                                    }} className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {products.links.length > 0 && <Pagination paginator={products} onPageChange={setPage} className={"p-3"} />}
                </div>
            )}
        </div>
    );
}

export default ShowProducts;
