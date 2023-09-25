import {Card} from "flowbite-react";
import {useEffect, useState} from "react";

export default function ProductCard({ product, orders, setOrders }) {
    const [inCart, setInCart] = useState(false);

    useEffect(() => {
        if (orders.length > 0) {
            setInCart(orders.some(order => order.product_id === product.id));
        }
        else {
            setInCart(false);
        }
    }, [orders, setOrders]);

    const handleClick = () => {
        setOrders(orders => [...orders, {
            product_id: product.id,
            quantity: 1,
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
        }]);
    }

    return (
        <Card renderImage={() => (
            <img src={"/images/products/" + product.image} alt={product.name}
                 className={"object-cover object-center h-24 sm:h-48 rounded-t-lg"}
            />
        )}>
            <div className={"flex-1"}>
                <div className={"flex-1"}>
                    <p className={"text-sm truncate text-gray-900 dark:text-white"}>
                        {product.name}
                    </p>
                    <p className={"text-md font-bold text-blue-400 dark:text-blue-300"}>P {product.price}</p>
                </div>
                {!inCart ? <AddToCart handleClick={handleClick} /> : <AlreadyInCart product={product} orders={orders} setOrders={setOrders} setInCart={setInCart} />}
            </div>
        </Card>
    );
}

const AddToCart = ({ handleClick }) => {
    return (
        <button onClick={handleClick}
                type={"button"}
                className={"flex items-center justify-center mt-4 w-full hover:text-white border border-black hover:border-green-500 hover:bg-green-500 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"}
        >
            <svg className={"w-4 h-4 mr-2"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm1-4H5m0 0L3 4m0 0h5.501M3 4l-.792-3H1m11 3h6m-3 3V1"/>
            </svg>
            Add
        </button>
    )
}

const AlreadyInCart = ({ product, orders, setOrders, setInCart }) => {
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        if (orders.length > 0) {
            setQuantity(orders.map(order => {
                return (order.product_id === product.id) ? order.quantity : 0;
            }).reduce((a, b) => a + b, 0));
        }
    }, [orders]);

    const handleClick = (type) => {
        setOrders(orders => orders.map(order => {
            if (order.product_id === product.id) {
                const q = (type === 'minus') ? order.quantity - 1 : order.quantity + 1;

                return {
                    ...order,
                    quantity: q,
                }
            }
            return order;
        }).filter(order => {
            setInCart(order.quantity > 0);
            return order.quantity > 0;
        }));
    }

    return (
        <div className={"flex overflow- mt-4 w-full h-7 md:h-9 bg-green-500 text-white rounded"}>
            <button onClick={() => handleClick('minus')}
                    type={"button"}
                    className={"cursor-pointer p-2 transition-colors duration-250 hover:bg-green-700 focus:outline-0 rounded-l"}
            >
                <svg className="w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                </svg>
            </button>
            <div className={"flex flex-1 items-center justify-center px-3 text-sm font-semibold"}>
                {quantity}
            </div>
            <button onClick={() => handleClick('plus')}
                    type={"button"}
                    className={"cursor-pointer p-2 transition-colors duration-250 hover:bg-green-700 focus:outline-0 rounded-r"}
            >
                <svg className="w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                </svg>
            </button>
        </div>
    )
}
