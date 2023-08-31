/**
 *
 * @param {JSX.Element} children
 * @param {"default" | "alternative"} variant
 * @param {"submit" | "reset" | "button"} type
 * @param onClick
 * @param {string} className
 * @param {[] | {}} props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Button({ children, variant, type, onClick, className, ...props }) {
    switch (variant) {
        case "default":
            className = "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-blue-200 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500 dark:focus:ring-offset-blue-200 dark:text-gray-100";
            break;
        case "alternative":
            className = "bg-gray-50 hover:bg-gray-100 focus:ring-gray-500 focus:ring-offset-gray-200 text-gray-700 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-500 dark:focus:ring-offset-gray-200 dark:text-gray-100";
            break;
        default:
            className = "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-blue-200 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500 dark:focus:ring-offset-blue-200 dark:text-gray-100";
            break;
    }

    return (
        <button type={type} onClick={onClick} className={`px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none ${className}`} {...props}>
            {children}
        </button>
    );
}
