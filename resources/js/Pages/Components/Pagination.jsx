const Pagination = ({ paginator, onPageChange, className }) => {
    return (
        <div className={`flex items-center justify-between w-full ${className}`}>
            <div className="flex justify-center flex-1 sm:hidden">
                <PaginationLink
                    onClick={() => onPageChange(paginator.current_page - 1)}
                    disabled={paginator.current_page === 1}
                >
                    Prev
                </PaginationLink>

                <PaginationLink
                    onClick={() => onPageChange(paginator.current_page + 1)}
                    disabled={paginator.current_page === paginator.last_page}
                >
                    Next
                </PaginationLink>
            </div>

            <div className="hidden sm:flex sm:items-center sm:justify-between w-full">
                <p className="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{paginator.from}</span> to <span className="font-semibold text-gray-900 dark:text-white">{paginator.to}</span> of <span className="font-semibold text-gray-900 dark:text-white">{paginator.total}</span> results
                </p>
                <div>
                    <PaginationLinks links={paginator.links} currentPage={paginator.current_page} onPageChange={onPageChange} />
                </div>
            </div>
        </div>
    );

}

const PaginationLink = ({children, disabled, active, onClick}) => {
    let label = children;
    let className = "flex items-center justify-center px-3 h-8 ml-0 leading-tight border border-gray-300 dark:border-gray-700";

    if (children.includes('Prev') || children.includes('Next')) {

    }

    if (children.includes('Previous') || children.includes('Next')) {
        label = children.replace(/&laquo;|&raquo;/g, "");

        className += label.includes('Prev') ? " rounded-l-lg" : " rounded-r-lg";
    }

    className += (active) ? " bg-blue-400 text-white dark:bg-gray-600 dark:text-white" : " bg-white text-gray-500 dark:text-gray-400 dark:bg-gray-800";
    className += (disabled) ? " opacity-50" : " hover:bg-blue-500 hover:text-gray-700 hover:text-gray-200 dark:hover:bg-gray-500 dark:hover:text-white";

    return (
        <>
            {disabled ? (
                <span className={className} >
                    {label}
                </span>
            ) : (
                <button
                    onClick={onClick}
                    className={className}
                    disabled={active}
                >
                    {label}
                </button>
            )}
        </>
    );
};


const PaginationLinks = ({links, currentPage, onPageChange}) => {
    return (
        <nav>
            <ul className="inline-flex items-center flex-wrap -space-x-px text-base h-10">
                {links.map((link, index) => {
                    let page = link.label;

                    if (page.includes('Prev')) {
                        page = currentPage - 1;
                    }
                    else if (page.includes('Next')) {
                        page = currentPage + 1;
                    }

                    return (

                        <li key={index}>
                            <PaginationLink
                                onClick={() => onPageChange(page)}
                                active={link.active}
                                disabled={link.url === null}
                            >
                                {link.label}
                            </PaginationLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
};

export default Pagination;
