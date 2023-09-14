import ShowOrders from "@/Admin/Orders/ShowOrders.jsx";
import DeleteProductModal from "@/Admin/Products/DeleteProductModal.jsx";
import EditProductModal from "@/Admin/Products/EditProductModal.jsx";
import ShowProducts from "@/Admin/Products/ShowProducts";
import {Head} from "@inertiajs/react";
import {Card} from "flowbite-react";
import {useEffect, useState} from "react";
import AddProductModal from "../../Pages/Admin/Products/AddProductModal";
import Sidebar from "../Components/Sidebar";

export default function Dashboard({ token, userId }) {
    const [activeTab, setActiveTab] = useState("orders");
    const [openModal, setOpenModal] = useState(''); // ['add_product_modal', 'edit_product_modal', 'delete_product_modal']
    const [query, setQuery] = useState("");
    const [isFetched, setIsFetched] = useState(false);

    const [orders, setOrders] = useState({});
    const [products, setProducts] = useState({});
    const [editProduct, setEditProduct] = useState({});
    const [deleteProduct, setDeleteProduct] = useState(0);

    useEffect(() => {
        import('../../notification.js');
    });

    useEffect(() => {
        if (deleteProduct !== 0) {
            fetch('/admin/products')
                .then(response => response.json())
                .then(data => setProducts(data))
        }

        if (Object.hasOwn(editProduct, 'id')) {
            setProducts({
                ...products,
                ['data']: products.data.map(product => product.id === editProduct.id ? editProduct : product)
            })
        }
    }, [isFetched, setIsFetched]);

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            setQuery(event.target.value);
        }
    }

    window.Echo.channel('place-order').listen('PlaceOrder', (e) => {
        setOrders(e.orders);
    });

    return (
        <>
            <Head>
                <title>Dashboard</title>
                <meta name={"api-token"} content={token} />
                <meta name={"userId"} content={userId} />
            </Head>

            <button data-drawer-target="sidebar" data-drawer-toggle="sidebar" aria-controls="sidebar" type="button"
                    className={"inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"}
            >
                <span className="sr-only">Open sidebar</span>
                <svg className={"w-6 h-6"} aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <div id={"tab_content"} className={"p-4 bg-white dark:bg-gray-700 sm:ml-64"}>
                <Card className={"mb-4"}>
                    <div className={"w-full mb-1"}>
                        <div className={"mb-3"}>
                            <h1 className={"text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"}>
                                {activeTab === "orders" ? "Orders" : "Products"}
                            </h1>
                        </div>
                        <div className={"items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700"}>
                            <div className={"flex-initial w-72 mb-4 sm:mb-0"}>
                                <label htmlFor="search-product" className={"mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"}>Search</label>
                                <div className="relative">
                                    <div className={"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"}>
                                        <svg className={"w-4 h-4 text-gray-500 dark:text-gray-400"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input onKeyDown={handleKeyDown}
                                           type="search" id={"search_product"}
                                           className={"block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                                           placeholder={`Search for ${activeTab}`}
                                    />
                                </div>
                            </div>
                            {activeTab === "products" && (
                                <button onClick={() => setOpenModal('add_product_modal')}
                                        id={"product_modal_btn"} type={"button"}
                                        className={"text-white mt-0 sm:mt-4 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}
                                >
                                    Add Product
                                </button>
                            )}
                        </div>
                    </div>
                </Card>

                <div>
                    <ShowOrders orders={orders} setOrders={setOrders}
                                query={query} setQuery={setQuery}
                                style={{ display:(activeTab !== 'orders') && "none" }}
                    />
                    <ShowProducts style={{ display:(activeTab !== 'products') && "none" }}
                                  products={products} setProducts={setProducts}
                                  setOpenModal={setOpenModal}
                                  setEditProduct={setEditProduct}
                                  setDeleteProduct={setDeleteProduct}
                                  query={query}
                    />
                </div>
            </div>

            <AddProductModal openModal={openModal} setOpenModal={setOpenModal} />
            <EditProductModal openModal={openModal} setOpenModal={setOpenModal}
                              editProduct={editProduct} setEditProduct={setEditProduct}
                              isFetched={isFetched} setIsFetched={setIsFetched}
            />
            <DeleteProductModal openModal={openModal} setOpenModal={setOpenModal}
                                deleteProduct={deleteProduct} setDeleteProduct={setDeleteProduct}
                                isFetched={isFetched} setIsFetched={setIsFetched}
            />

            <div id={"notification"}></div>
        </>
    );
}
