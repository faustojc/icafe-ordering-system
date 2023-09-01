export default function Alert({title, message, variant, children}) {
    const infoClass = "text-blue-800 border-blue-300 bg-blue-50 dark:text-blue-400 dark:border-blue-800 dark:bg-gray-800";
    const dangerClass = "text-red-800 border-red-300 bg-red-50 dark:text-red-400 dark:border-red-800 dark:bg-gray-800";
    const successClass = "text-green-800 border-green-300 bg-green-50 dark:text-green-400 dark:border-green-800 dark:bg-gray-800";
    const defaultClass = "text-gray-800 border-gray-300 bg-gray-50 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800";

    let alertClass = "";
    switch (variant) {
        case "info":
            alertClass = infoClass;
            break;
        case "danger":
            alertClass = dangerClass;
            break;
        case "success":
            alertClass = successClass;
            break;
        default:
            alertClass = defaultClass;
            break;
    }

    return (
        <>
            <div id="alert-additional-content-1" className={"p-4 border rounded-lg " + alertClass} role="alert">
                <div className="flex items-center">
                    <svg className="flex-shrink-0 w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">{variant}</span>
                    <h3 className="text-lg font-medium">{title}</h3>
                </div>
                <div className="mt-2 mb-4 text-sm">
                    {message}
                </div>
                <div className="flex">
                    {children}
                </div>
            </div>
        </>
    );
}
