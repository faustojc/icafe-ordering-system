const Pagination = ({ paginator, onPageChange }) => {
    const { currentPage, lastPage, links } = paginator;

    return (
        <div className="flex items-center justify-between">
            <div className="flex justify-between flex-1 sm:hidden">
                <PaginationLink
                    onClick={() => onPageChange('previous')}
                    disabled={currentPage === 1}
                >
                    Prev
                </PaginationLink>

                <PaginationLink
                    onClick={() => onPageChange('next')}
                    disabled={currentPage === lastPage}
                >
                    Next
                </PaginationLink>
            </div>

            <div className="hidden sm:flex sm:items-center sm:justify-between">
                <p className="text-sm text-gray-700">
                    Showing <span>{paginator.firstItem()}</span> to <span>{paginator.lastItem()}</span> of <span>{paginator.total()}</span> results
                </p>
                <div>
                    <PaginationLinks links={links} onPageChange={onPageChange} />
                </div>
            </div>
        </div>
    );

}

const PaginationLink = ({children, disabled, onClick}) => {
    if(disabled) {
        return (
            <span
                className="px-4 py-2 text-gray-500 bg-white border border-gray-300 cursor-default rounded-md"
                aria-disabled="true"
            >
                {children}
            </span>
        );
    }

    return (
        <button
            onClick={onClick}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition duration-150 ease-in-out"
        >
            {children}
        </button>
    );

};

const PaginationLinks = ({links, onPageChange}) => {
    return (
        <div>
            {links.map((link, index) => (
                <PaginationLink
                    key={index}
                    onClick={() => onPageChange(link.label)}
                    disabled={link.url === null}
                >
                    {link.label}
                </PaginationLink>
            ))}
        </div>
    );

};

export default Pagination;
