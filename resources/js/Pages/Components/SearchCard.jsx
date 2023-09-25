export default function SearchCard({ category, openFilter, setOpenFilter, setQuery }) {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setQuery(event.target.value);
        }
    }

    return (
        <>
            <div className={"relative w-full md:w-1/2"}>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg className="w-3.5 h-3.5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input onKeyDown={handleKeyDown}
                       type="text" id="query" name="query"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder={`Search ${category.toLowerCase()}...`}
                />
            </div>
        </>
    );
}
