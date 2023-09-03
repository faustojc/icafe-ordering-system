import {Head, router} from "@inertiajs/react";
import {useState} from 'react';

export default function Auth({error}) {
    const [data, setData] = useState({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState({
        username: false,
        password: false
    });

    const errorClass = 'border-red-300 placeholder-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-600 dark:focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500';
    const noErrorClass = 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500';
    let currClass = (!error || !hasError.username || !hasError.password) ? noErrorClass : errorClass;

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setData({
            ...data,
            [key]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.username === '' || data.password === '') {
            setHasError({
                username: (data.username === ''),
                password: (data.password === '')
            });
            return;
        }

        setLoading(true);

        router.post('/admin/auth', data, {
            onFinish: () => {
                setLoading(false);
            }
        });
    }

    return (
        <>
            <Head>
                <title>Admin Login</title>
            </Head>

            <div className={"grid h-screen place-items-center"}>
                <div
                    className={"w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"}>
                    <h5 className={"text-xl text-center font-medium text-gray-900 dark:text-white mb-4"}>
                        Admin Login
                    </h5>

                    {error && (<ErrorAlert error={error} />)}

                    <form className={"space-y-6"} onSubmit={handleSubmit}>
                        <div className={"relative"}>
                            <input type={"text"} id={"username"} name={"username"}
                                   value={data.username}
                                   onChange={handleChange}
                                   autoComplete={"username"}
                                   className={`block px-2.5 pb-2.5 pt-4 w-full text-gray-950 dark:text-gray-200 text-sm bg-transparent rounded-lg border-1 appearance-none focus:ring-0 peer '${currClass}'`} />
                            <label htmlFor={"username"}
                                   className={"absolute text-sm text-gray-950 dark:text-gray-200 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"}> Username </label>
                            {hasError.username && (
                                <p className={"mt-2 text-xs text-red-600 dark:text-red-400"}>Please input your username.</p>
                            )}
                        </div>
                        <div className={"relative"}>
                            <input type={"password"} id={"password"} name={"password"}
                                   value={data.password}
                                   onChange={handleChange}
                                   autoComplete={"current-password"}
                                   className={`block px-2.5 pb-2.5 pt-4 w-full text-gray-950 dark:text-gray-200 text-sm bg-transparent rounded-lg border-1 appearance-none focus:ring-0 peer '${currClass}'`} />
                            <label htmlFor={"password"}
                                   className={"absolute text-sm text-gray-950 dark:text-gray-200 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"}> Password </label>
                            {hasError.password && (
                                <p className={"mt-2 text-xs text-red-600 dark:text-red-400"}>Please input your password.</p>
                            )}
                        </div>
                        <button type={"submit"}
                                className={"w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}
                        >
                            {loading && (
                                <svg className={"animate-spin inline w-4 h-4 mr-3"} aria-hidden={true} xmlns={"http://www.w3.org/2000/svg"} fill={"none"} viewBox={"0 0 24 24"}>
                                    <circle className={"opacity-25"} cx={"12"} cy={"12"} r={"10"} stroke={"currentColor"} strokeWidth={"4"} />
                                    <path className={"opacity-75"} fill={"currentColor"} d={"M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z"} />
                                </svg>
                            )}
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

function ErrorAlert({error}) {
    return (
        <>
            <div
                className={"flex items-center p-4 my-3 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"}
                role={"alert"}
            >
                <svg className={"flex-shrink-0 inline w-4 h-4 mr-3"}
                     aria-hidden={true}
                     xmlns={"http://www.w3.org/2000/svg"}
                     fill={"currentColor"}
                     viewBox={"0 0 20 20"}>
                    <path d={"M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"} />
                </svg>
                <span className={"sr-only"}>Info</span>
                <div>
                    <span className={"font-medium"}>Error! </span> {error}
                </div>
            </div>
        </>
    );
}
