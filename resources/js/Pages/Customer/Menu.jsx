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
    const [category, setCategory] = useState('COFFEE');

    const [products, setProducts] = useState({});
    const [orders, setOrders] = useState([]);

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    let isEmpty = !products.data || Object.values(products.data).length === 0;

    useEffect(() => {
        setPage(1);
    }, [query]);

    useEffect(() => {
        const params = new URLSearchParams();
        params.append('query', query);
        params.append('page', page.toString());
        params.append('category', category);

        setLoading(true);

        window.axios.get("/api/products", {params}).then(response => {
            setProducts(response.data);
            setLoading(false);
        });
    }, [category, query, page]);

    const onPageChange = (page) => {
        setPage(page);
    }

    return (
        <>
            <Head>
                <title>Wolfspider</title>
            </Head>

            <OrderNavbar orders={orders} />
            <CartSidenav orders={orders} setOrders={setOrders} />

            <div className={"flex gap-4 p-2"}>
                <div className={"hidden md:block w-64 relative"}>
                    <FilterCard category={category} setCategory={setCategory} className={"sticky top-2"} />
                </div>

                <div className={"flex-1 flex flex-col"}>
                    <div className={"mb-3"}>
                        <SearchCard category={category} openFilter={openFilter} setOpenFilter={setOpenFilter} setQuery={setQuery}/>
                    </div>

                    <FilterCard category={category} setCategory={setCategory} className={"block md:hidden mb-3 md:mb-0"} />

                    <div className={"relative grow"}>
                        {loading && <Loading />}
                        <h1 className={"text-2xl md:text-3xl font-bold dark:text-white mb-4"}>{category}</h1>

                        <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"}>
                            {Object.hasOwn(products, 'data') && Object.values(products.data).map((product) =>
                                <div key={product.id} className={"grow"}>
                                    <ProductCard product={product} orders={orders} setOrders={setOrders}/>
                                </div>
                            )}
                        </div>

                        {!isEmpty > 0 && (
                            <div className={"mt-2"}>
                                <Pagination paginator={products} onPageChange={onPageChange} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
