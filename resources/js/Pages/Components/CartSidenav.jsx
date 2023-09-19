import {Button, Modal, Textarea, TextInput} from "flowbite-react";
import {useEffect, useState} from "react";

export default function CartSidenav({ orders, setOrders }) {
    const [totalPrice, setTotalPrice] = useState(0);
    const [openConfirm, setOpenConfirm] = useState(false);

    const disabledClass = orders.length === 0 ? 'cursor-not-allowed' : '';
    let numOrders = orders.length;

    useEffect(() => {
        if (orders.length > 0) {
            setTotalPrice(orders.reduce((total, order) => total + (order.price * order.quantity), 0));
        }
    }, [orders]);

    return (
        <aside id="cart_sidenav"
               className="fixed top-0 right-0 z-40 h-screen overflow-x-hidden overflow-y-auto inset-0 transition-transform translate-x-full"
               tabIndex="-1"
               aria-labelledby="cart_sidenav_label"
        >
            <div className="fixed inset-y-0 right-0 max-w-full flex">
                <div className="relative w-screen max-w-md">
                    <section className={"relative px-4 flex h-full flex-col w-full max-w-md bg-white dark:bg-gray-800"}>
                        <header className={"absolute top-0 z-10 inset-x-0 flex w-full items-center justify-between border-b border-gray-400 border-opacity-25 px-6 py-3 bg-white dark:bg-gray-800"}>
                            <div className={"flex align-middle text-blue-600 dark:text-blue-500"}>
                                <svg className={"w-5 h-5 mr-2"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                                </svg>
                                <h5 id="cart_sidenav_label" className="text-base font-semibold uppercase">{numOrders} Items</h5>
                            </div>
                            <button type="button"
                                    data-drawer-hide="cart_sidenav"
                                    aria-controls="cart_sidenav"
                                    className={"text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"}
                            >
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close menu</span>
                            </button>
                        </header>
                        <div className="overflow-y-auto pt-16 pb-20">
                            {numOrders > 0 ? orders.map((order, index) => (
                                <CartItem key={index} order={order} setOrders={setOrders} />
                            )) : (
                                <div className={"flex flex-col items-center justify-center h-full"}>
                                    <svg className={"w-16 h-16 text-gray-400"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16Zm0-2a6 6 0 100-12 6 6 0 000 12Zm0-6a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1Zm0-4a1 1 0 011 1v2a1 1 0 11-2 0V7a1 1 0 011-1Z"/>
                                    </svg>
                                    <h5 className={"text-gray-400 text-sm font-medium mt-2"}>No items in cart</h5>
                                </div>
                            )}
                        </div>

                        <footer className={"absolute bottom-0 left-0 right-0 w-full flex items-center p-4 bg-white dark:bg-gray-800"}>
                            <button onClick={() => setOpenConfirm(true)}
                                    disabled={numOrders === 0}
                                    className={disabledClass + " flex w-full items-center justify-between text-white h-12 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-1 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"}
                            >
                                <span className={"flex h-full flex-1 items-center px-5 text-light"}>Order</span>
                                <span className={"flex p-3 w-auto h-full items-center justify-center text-sm text-green-600 bg-gray-200 rounded-full"}>P {totalPrice}</span>
                            </button>
                        </footer>
                    </section>
                </div>
            </div>

            <ConfirmOrder openConfirm={openConfirm} orders={orders} totalPrice={totalPrice} setOpenConfirm={setOpenConfirm} setOrders={setOrders} setTotalPrice={setTotalPrice} />
        </aside>
    );
}

const CartItem = ({ order, setOrders }) => {
    const handleClick = () => {
        setOrders(orders => orders.filter(o => o.product_id !== order.product_id));
    }

    return (
        <div className={"flex items-center border-b border-gray-400 border-opacity-10 p-3 text-sm md:p-4"}>
            <CartQuantity order={order} setOrders={setOrders} />
            <div className={"relative mx-4 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden bg-gray-100 sm:h-16 sm:w-16"}>
                <img src={"/images/products/" + order.image} alt={order.name} className={"object-contain object-center"} />
            </div>
            <div>
                <h3 className={"text-sm font-semibold text-gray-900 dark:text-white"}>{order.name}</h3>
                <p className={"text-sm my-2 font-semibold text-blue-500 dark:text-blue-400"}>P {order.price}</p>
                <span className={"bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"}>
                    {order.category}
                </span>
            </div>
            <span className={"font-bold text-heading ml-auto dark:text-gray-100"}>
                P {order.quantity * order.price}
            </span>
            <button onClick={handleClick}
                    type={"button"}
                    className={"ml-2 text-gray-400 shrink-0 transition-all duration-200 bg-transparent hover:bg-gray-200 hover:text-red-600 rounded-full text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-red-300"}
            >
                <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
    );
}

const CartQuantity = ({ order, setOrders }) => {
    const disabledClass = order.quantity === 1 ? 'cursor-not-allowed' : '';

    const handleClick = (type) => {
        setOrders(orders => orders.map(o => {
            if (o.product_id === order.product_id) {
                const q = (type === 'minus') ? o.quantity - 1 : o.quantity + 1;

                return {
                    ...o,
                    quantity: q,
                }
            }
            return o;
        }));
    }

    return (
        <div className={"flex-shrink-0"}>
            <div className={disabledClass + " flex overflow-hidden flex-col-reverse items-center w-8 h-24 bg-gray-300 text-heading rounded-full dark:bg-gray-700"}>
                <button onClick={() => handleClick('minus')}
                        disabled={order.quantity === 1}
                        type={"button"}
                        className={"cursor-pointer p-2 transition-colors duration-250 hover:bg-blue-400 focus:outline-0"}
                >
                    <svg className="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                    </svg>
                </button>
                <div className={"flex flex-1 items-center justify-center text-sm font-semibold px-0 text-heading text-gray-900 dark:text-gray-200"}>
                    {order.quantity}
                </div>
                <button onClick={() => handleClick('plus')}
                        type={"button"}
                        className={"cursor-pointer p-2 transition-colors duration-250 hover:bg-blue-400 focus:outline-0"}
                >
                    <svg className="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

const ConfirmOrder = ({ openConfirm, orders, totalPrice, setOpenConfirm, setOrders, setTotalPrice }) => {
    const [loading, setLoading] = useState(false);
    const [customerName, setCustomerName] = useState('');
    const [notes, setNotes] = useState('');

    const handleClick = () => {
        setLoading(true);

        window.axios.post('/api/orders', {
            orders: orders,
            customer_name: customerName,
            notes: notes,
            total_price: totalPrice,
        }).then(() => {
            setOrders([]);
            setOpenConfirm(false);
            setTotalPrice(0);
            setCustomerName('');
            setNotes('');
            localStorage.removeItem('orders');
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <Modal popup show={openConfirm} size={'md'} onClose={() => setOpenConfirm(false)}>
            <Modal.Header />
            <Modal.Body>
                <div className={'text-center'}>
                    <svg className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Confirm your order?
                    </h3>
                    <div className={'mb-5'}>
                        <TextInput
                            onChange={(event) => setCustomerName(event.target.value)}
                            id={"customer_name"}
                            name={"customer_name"}
                            placeholder="Enter name (optional)"
                            type="text"
                            maxLength={50}
                        />
                    </div>
                    <div className={"mb-5"}>
                        <Textarea
                            onChange={(event) => setNotes(event.target.value)}
                            id={"notes"}
                            name={"notes"}
                            placeholder="Leave a note... (optional)"
                            maxLength={150}
                            rows={4}
                        />
                    </div>
                    <div className="flex justify-center gap-4">
                        <Button color="success" onClick={handleClick}>
                            {loading && (
                                <span role="status" className={"flex items-center mr-2"}>
                                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                        </svg>
                                    </span>
                            )}

                            Place Order
                        </Button>
                        <Button color="dark" onClick={() => setOpenConfirm(false)}>
                            No, cancel
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
