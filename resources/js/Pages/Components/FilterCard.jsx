import {Card} from "flowbite-react";

export default function FilterCard({ categories = [], handleChange, className }) {
    return (
        <Card className={className}>
            <h5 className={"text-xl font-bold dark:text-white"}>Categories</h5>
            <div className={"mb-4"}>
                <div className={"flex items-center mb-4"}>
                    <input onChange={handleChange} id="coffee" type="checkbox" value={"COFFEE"}
                           checked={categories.includes("COFFEE")}
                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="coffee" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Coffee</label>
                </div>
                <div className={"flex items-center mb-4"}>
                    <input onChange={handleChange} id="beer" type="checkbox" value={"BEER"}
                            checked={categories.includes("BEER")}
                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="beer" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Beer</label>
                </div>
                <div className={"flex items-center mb-4"}>
                    <input onChange={handleChange} id="cocktail" type="checkbox" value={"COCKTAIL"}
                            checked={categories.includes("COCKTAIL")}
                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="cocktail" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cocktail</label>
                </div>
            </div>
        </Card>
    );
}
