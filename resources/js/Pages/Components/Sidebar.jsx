export default function Sidebar({ activeTab, setActiveTab }) {
    const activeClass = "active text-white bg-blue-700 hover:bg-blue-800 focus:ring-0 dark:text-white focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";
    const inactiveClass = "text-gray-100 hover:bg-blue-500 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300";

    return (
        <aside id={"sidebar"}
               aria-labelledby="sidebar_label"
               role={'dialog'}
               className={"fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"}
        >
            <div className={"h-full px-3 py-4 overflow-y-auto bg-blue-600 dark:bg-gray-800"}>
                <h5 id="sidebar_label" className={"flex items-center pl-2.5 mb-5"}>
                    <img src="https://flowbite.com/docs/images/logo.svg" className={"h-6 mr-3 sm:h-7"} alt="Flowbite Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </h5>
                <button type="button"
                        data-drawer-hide="sidebar"
                        aria-controls="sidebar"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex sm:hidden items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>

                <ul id={"sidenav_tab"} data-tabs-toggle="#tab_content" role="tablist" className={"space-y-2 font-medium"}>
                    <li role={"presentation"}>
                        <button onClick={() => setActiveTab('orders')}
                                id="orders-tab" type="button"
                                className={`flex items-center w-full font-bold px-4 py-3 rounded-lg ${activeTab === 'orders' ? activeClass : inactiveClass}`}
                        >
                            <span className={"mr-3"}>
                                <svg className="w-5 h-5 text-gray-100 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                                </svg>
                            </span>
                            Orders
                        </button>
                    </li>
                    <li role={"presentation"}>
                        <button onClick={() => setActiveTab('products')}
                                id="products-tab" type="button"
                                className={`flex items-center w-full font-bold px-4 py-3 rounded-lg ${activeTab === 'products' ? activeClass : inactiveClass}`}
                        >
                            <span className={"mr-3"}>
                                <svg className="w-5 h-5 text-gray-100 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
                                    <path d="M10.013 4.175 5.006 7.369l5.007 3.194-5.007 3.193L0 10.545l5.006-3.193L0 4.175 5.006.981l5.007 3.194ZM4.981 15.806l5.006-3.193 5.006 3.193L9.987 19l-5.006-3.194Z"/>
                                    <path d="m10.013 10.545 5.006-3.194-5.006-3.176 4.98-3.194L20 4.175l-5.007 3.194L20 10.562l-5.007 3.194-4.98-3.211Z"/>
                                </svg>
                            </span>
                            Products
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
