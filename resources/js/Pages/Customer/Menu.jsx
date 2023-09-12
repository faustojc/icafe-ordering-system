import CartSidenav from "@/Components/CartSidenav.jsx";
import FilterCard from "@/Components/FilterCard.jsx";
import Loading from "@/Components/Loading.jsx";
import OrderNavbar from "@/Components/OrderNavbar.jsx";
import Pagination from "@/Components/Pagination.jsx";
import ProductCard from "@/Components/ProductCard.jsx";
import SearchCard from "@/Components/SearchCard.jsx";
import {Head} from "@inertiajs/react";
import {useEffect, useState} from "react";

export default function Menu() {
    const [categories, setCategories] = useState([]);

    const [products, setProducts] = useState({});
    const [orders, setOrders] = useState([]);

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    let isEmpty = !products.data || Object.values(products.data).length === 0;

    useEffect(() => {
        const params = new URLSearchParams();
        params.append('query', query);
        params.append('page', page.toString());
        params.append('categories', categories.join(',') || '');

        setLoading(true);

        window.axios.get("/api/products", {params}).then(response => {
            setProducts(response.data);
            setLoading(false);
        });
    }, [categories, query, page]);

    useEffect(() => {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        setOrders(orders);

        if (orders.length > 0) {
            localStorage.setItem('orders', JSON.stringify(orders));
        }
        else {
            localStorage.removeItem('orders');
        }
    }, [setOrders]);

    const onPageChange = (page) => {
        setPage(page);
    }

    const handleChange = (event) => {
        if (event.target.checked) {
            setCategories([...categories, event.target.value]);
        } else {
            setCategories(categories.filter(category => category !== event.target.value));
        }
    }

    return (
        <>
            <Head>
                <title>Wolfspider</title>
            </Head>

            <OrderNavbar orders={orders}/>
            <CartSidenav orders={orders} setOrders={setOrders} />

            <div className={"flex gap-4 p-2"}>
                <div className={"hidden md:block w-64 relative"}>
                    <FilterCard categories={categories} handleChange={handleChange} className={"sticky top-2"} />
                </div>

                <div className={"flex-1 flex flex-col"}>
                    <div className={"flex grow w-full mb-3"}>
                        <SearchCard openFilter={openFilter} setOpenFilter={setOpenFilter} setQuery={setQuery}/>
                    </div>

                    {openFilter && <FilterCard categories={categories} handleChange={handleChange} className={"block md:hidden mb-3 md:mb-0"} />}

                    <div className={"relative grow"}>
                        {loading && <Loading />}

                        {!isEmpty > 0 && (
                            <div className={"mb-2"}>
                                <Pagination paginator={products} onPageChange={onPageChange} />
                            </div>
                        )}

                        <div className={"grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"}>
                            {Object.hasOwn(products, 'data') && Object.values(products.data).map((product) =>
                                <div key={product.id} className={"grow"}>
                                    <ProductCard product={product} orders={orders} setOrders={setOrders}/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
