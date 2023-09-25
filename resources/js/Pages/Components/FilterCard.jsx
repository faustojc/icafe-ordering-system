import {Card} from "flowbite-react";

export default function FilterCard({ category = '', setCategory, className }) {
    return (
        <Card className={className}>
            <h5 className={"hidden md:block text-xl font-bold dark:text-white"}>Categories</h5>
            <div className={"flex flex-row justify-around md:block"}>
                <div onClick={() => setCategory('COFFEE')}
                     className={"flex items-center flex-col md:flex-row md:mb-2 px-3 md:py-2 rounded-lg cursor-pointer " + (category === 'COFFEE' && 'bg-blue-200 dark:bg-blue-700')}
                >
                    <div>
                        <img src={"/images/categories/coffee_icon.png"} className={"w-10 h-10"} alt={''} />
                    </div>
                    <p className="md:ml-2 text-sm font-bold text-gray-900 dark:text-gray-300">Coffee</p>
                </div>
                <div onClick={() => setCategory('BEER')}
                     className={"flex items-center flex-col md:flex-row md:mb-2 px-3 md:py-2 rounded-lg cursor-pointer " + (category === 'BEER' && 'bg-blue-200 dark:bg-blue-700')}
                >
                    <div>
                        <img src={"/images/categories/beer_icon.png"} className={"w-10 h-10"} alt={''} />
                    </div>
                    <p className="md:ml-2 text-sm font-bold text-gray-900 dark:text-gray-300">Beer</p>
                </div>
                <div onClick={() => setCategory('COCKTAIL')}
                     className={"flex items-center flex-col md:flex-row px-3 md:py-2 rounded-lg cursor-pointer " + (category === 'COCKTAIL' && 'bg-blue-200 dark:bg-blue-700')}
                >
                    <div>
                        <img src={"/images/categories/cocktail_icon.png"} className={"w-10 h-10"} alt={''} />
                    </div>
                    <p className="md:ml-2 text-sm font-bold text-gray-900 dark:text-gray-300">Cocktail</p>
                </div>
            </div>
        </Card>
    );
}
