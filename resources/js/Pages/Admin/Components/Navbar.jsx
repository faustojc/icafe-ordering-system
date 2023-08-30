
export default function Navbar() {
    return (
        <aside id={"sidebar"} className={"fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"} aria-label="Sidebar">
            <div className={"h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800"}>
                <a href="https://flowbite.com/" className={"flex items-center pl-2.5 mb-5"}>
                    <img src="https://flowbite.com/docs/images/logo.svg" className={"h-6 mr-3 sm:h-7"} alt="Flowbite Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </a>
                <ul id={"sidenav_tab"} data-tabs-toggle="#tab_content" role="tablist" className={"space-y-2 font-medium"}>
                    <li role={"presentation"}>
                        <button id="orders-tab" data-tabs-target="#orders-panel" type="button" role="tab" aria-controls="orders-panel" aria-selected="true"
                                className={"inline-block p-4 border-b-2 rounded-t-lg"}
                        >
                            Orders
                        </button>
                    </li>
                    <li role={"presentation"}>
                        <button id="products-tab" data-tabs-target="#products-panel" type="button" role="tab" aria-controls="products-panel" aria-selected="false"
                                className={"inline-block p-4 border-b-2 rounded-t-lg"}
                        >
                            Products
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
