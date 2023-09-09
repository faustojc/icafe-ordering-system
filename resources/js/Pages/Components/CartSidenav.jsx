export default function CartSidenav({ orders, setOrders }) {
    let numOrders = (orders !== undefined) ? Object.values(orders).length : 0;

    const handleClick = (event) => {
        setOrders({});
    }

    return (
        <aside id="cart_sidenav"
               className="fixed w-96 top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white dark:bg-gray-800"
               tabIndex="-1"
               aria-labelledby="cart_sidenav_label"
        >
            <section className={"relative flex h-full flex-col"}>
                <div className={"flex align-middle text-blue-600 dark:text-blue-500"}>
                    <svg className={"w-5 h-5 mr-2"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                    </svg>
                    <h5 id="cart_sidenav_label" className="text-base font-semibold uppercase">{numOrders} Items</h5>
                </div>
                <button type="button"
                        data-drawer-hide="cart_sidenav"
                        aria-controls="cart_sidenav"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <div className="py-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                                </svg>
                                <span className="ml-3">Dashboard</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <footer className={"fixed flex items-center bottom-0 p-4 w-full"}>
                    <button onClick={handleClick}
                            className={"flex items-center justify-between text-white h-12 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"}
                    >
                        <span className={"flex h-full flex-1 items-center px-5 text-light"}>Order</span>
                        <span className={"flex items-center justify-center text-sm text-green-600 bg-gray-200 rounded-full h-6 w-6"}>{numOrders}</span>
                    </button>
                </footer>
            </section>
        </aside>
    );
}
