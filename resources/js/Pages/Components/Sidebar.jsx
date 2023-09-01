export default function Sidebar({ activeTab, setActiveTab }) {
    const activeClass = "active text-white bg-blue-700 hover:bg-blue-800 focus:ring-0 dark:text-white focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";
    const inactiveClass = "text-gray-500 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white";

    return (
        <aside id={"sidebar"} className={"fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"} aria-label="Sidebar">
            <div className={"h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800"}>
                <a href="https://flowbite.com/" className={"flex items-center pl-2.5 mb-5"}>
                    <img src="https://flowbite.com/docs/images/logo.svg" className={"h-6 mr-3 sm:h-7"} alt="Flowbite Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </a>

                <ul id={"sidenav_tab"} data-tabs-toggle="#tab_content" role="tablist" className={"space-y-2 font-medium"}>
                    <li role={"presentation"}>
                        <button onClick={() => setActiveTab('orders')}
                                id="orders-tab" type="button"
                                className={`flex items-center w-full font-bold px-4 py-3 rounded-lg '${activeTab === 'orders' ? activeClass : inactiveClass}'`}
                        >
                            <span className={"mr-3"}>
                                <svg className="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                                </svg>
                            </span>
                            Orders
                        </button>
                    </li>
                    <li role={"presentation"}>
                        <button onClick={() => setActiveTab('products')}
                                id="products-tab" type="button"
                                className={`flex items-center w-full font-bold px-4 py-3 rounded-lg '${activeTab === 'products' ? activeClass : inactiveClass}'`}
                        >
                            Products
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
