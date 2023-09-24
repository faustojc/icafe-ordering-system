import ShowOrderModal from "@/Admin/Orders/ShowOrderModal.jsx";
import Loading from "@/Components/Loading.jsx";
import Pagination from "@/Components/Pagination.jsx";
import {Card} from "flowbite-react";
import {useEffect, useState} from "react";

function ShowOrders({ orders, setOrders, query, setQuery, ...props }) {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState({});
    const [selectedCustomerName, setSelectedCustomerName] = useState('');
    const [openOrderModal, setOpenOrderModal] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/orders?query=${query}&page=${page}`)
            .then(response => response.json())
            .then(data => setOrders(data))
            .finally(() => setLoading(false));
    }, [query, page]);

    function timeSince(dateString) {
        const now = new Date();
        const past = new Date(dateString);
        const seconds = Math.floor((now - past) / 1000);

        let interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " yr";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " month";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " d";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hr";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " min";
        }
        return Math.floor(seconds) + " sec";
    }

    return (
        <div {...props}>
            {Object.hasOwn(orders, 'data') && Object.values(orders.data).length > 0 ? (
                <div className={"relative"}>
                    {loading && <Loading />}

                    <Pagination paginator={orders} onPageChange={setPage} className={"mb-2"} />

                    {Object.values(orders.data).map((order, index) => (
                        <Card key={index} className={"w-full mb-3 cursor-pointer hover:border-blue-500"} onClick={() => {
                            setSelectedOrder(order);
                            setOpenOrderModal(true);
                            setSelectedCustomerName(order.customer_name === null ? 'Order #' + order.id : order.customer_name);
                        }}>
                            <div className={"flex items-center"}>
                                <div className={"w-1/2 h-full text-left"}>
                                    <h3 className={"mb-2 font-bold text-lg lg:text-xl text-dark dark:text-white"}>
                                        {order.customer_name === null ? 'Order #' + order.id : order.customer_name}
                                    </h3>
                                    <div className={"text-left text-sm text-gray-500 dark:text-gray-400"}>
                                        NOTES: {order.notes ? order.notes : 'No notes'}
                                    </div>
                                </div>
                                <div className={"w-1/2 h-full text-right"}>
                                    <h5 className={"mb-2 font-medium text-md lg:text-lg text-dark dark:text-white"}>
                                        P {order.total_price} ({order.order_items.length} {order.order_items.length === 1 ? 'item' : 'items'})
                                    </h5>
                                    <p className={"text-xs text-gray-500 dark:text-gray-400"}>
                                        {timeSince(order.created_at)}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-bold">No orders yet...!</span> Sit and relax your orders will come soon.
                    </div>
                </div>
            )}

            <ShowOrderModal customerName={selectedCustomerName}
                            setOrders={setOrders}
                            selectedOrder={selectedOrder}
                            openOrderModal={openOrderModal} setOpenOrderModal={setOpenOrderModal}
            />
        </div>
    );
}

export default ShowOrders;
