import FileInput from "@/Components/FileInput.jsx";
import {Button, Modal} from "flowbite-react";
import {useState} from "react";

const ErrorMessage = ({message}) => (<p className={"mt-2 text-sm text-red-600 dark:text-red-500"}>{message}</p>)

export default function EditProductModal({ openModal, setOpenModal, products, setProducts, editProduct, setEditProduct }) {
    const [errors, setErrors] = useState({
        name: false,
        price: false,
        image: false
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (editProduct.name === '' || editProduct.price === 0 || editProduct.image === null) {
            setErrors({
                name: (editProduct.name === ''),
                price: (editProduct.price === 0),
                image: (editProduct.image === null)
            })

            return;
        }

        setLoading(true);
        window.axios.put(`/admin/products/${editProduct.id}`, editProduct)
            .then(response => {
                if (response.status === 200) {
                    setEditProduct({});
                    setProducts({
                        ...products,
                        ['data']: products.data.map(product => product.id === response.data.product.id ? response.data.product : product)
                    })
                }
            }).finally(() => {
                setLoading(false);
                setOpenModal('');
            });
    }

    const handleChange =  (event) => {
        let value = (event.target.name === 'name') ? event.target.value.toUpperCase() : event.target.value;

        if (event.target.name === 'is_available' || event.target.name === 'featured') {
            value = event.target.checked ? 1 : 0;
        }

        setEditProduct({
            ...editProduct,
            [event.target.name]: value
        });
    }

    const handleDiscard = () => {
        setEditProduct({})
        setErrors({
            name: false,
            price: false,
            image: false
        })
    }

    return (
        <>
            <Modal show={openModal === 'edit_product_modal'} onClose={() => {
                setOpenModal('');
                setEditProduct({});
            }}>
                <Modal.Header>Edit {editProduct.name}</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className={"grid gap-4 mb-4 sm:grid-cols-2"}>
                            <div className={"col-span-2"}>
                                <label htmlFor="name" className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Name</label>
                                <input onChange={handleChange}
                                       value={editProduct.name}
                                       type={"text"} name={"name"} id={"name"}
                                       placeholder={"Type product name"}
                                       required={true}
                                       className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"}
                                />
                                {errors.name && <ErrorMessage message={"Please input product name."} />}
                            </div>
                            <div>
                                <label htmlFor={"price"} className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Price</label>
                                <input onChange={handleChange}
                                       value={editProduct.price}
                                       type={"number"} name={"price"} id={"price"}
                                       placeholder={"Type product price"}
                                       className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"}
                                />
                                {errors.price && <ErrorMessage message={"Please input price."} />}
                            </div>
                            <div>
                                <label htmlFor={"category"} className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Category</label>
                                <select onChange={handleChange} value={editProduct.category} id={"category"} name={"category"} className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"}>
                                    <option value={"COFFEE"}>COFFEE</option>
                                    <option value={"BEER"}>BEER</option>
                                    <option value={"COCKTAIL"}>COCKTAIL</option>
                                </select>
                            </div>
                            <div className="flex items-center sm:py-2">
                                <input onChange={handleChange}
                                       name={"is_available"} id={"is_available"} type={"checkbox"}
                                       value={editProduct.is_available} checked={editProduct.is_available === 1}
                                       className={"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"}
                                />
                                <label htmlFor={"is_available"} className={"ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"}>Available</label>
                            </div>
                            <div className="flex items-center sm:py-2">
                                <input onChange={handleChange}
                                       name={"featured"} id={"featured"} type={"checkbox"}
                                       value={editProduct.featured} checked={editProduct.featured === 1}
                                       className={"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"}
                                />
                                <label htmlFor={"featured"} className={"ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"}>Featured</label>
                            </div>
                            <div className={"sm:col-span-2"}>
                                <label htmlFor={"description"} className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Description (Optional)</label>
                                <textarea onChange={handleChange}
                                          id={"description"} name={"description"} rows={4}
                                          placeholder={"Type product description"}
                                          value={editProduct.description === null ? '' : editProduct.description}
                                          className={"block p-2.5 w-full h-full sm:h-fit text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"}
                                ></textarea>
                            </div>
                            <div className={"sm:col-span-2"}>
                                <FileInput data={editProduct} setData={setEditProduct} />
                                {errors.image && <ErrorMessage message={"Please upload an image."} />}
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleSubmit}
                            className={"text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"}
                    >
                        {loading ? (
                            <span role="status" className={"flex items-center mr-2"}>
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>
                            </span>
                        ) : (
                            <span className={"flex items-center mr-2"}>
                                <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
                                </svg>
                            </span>
                        )}
                        Update Product
                    </Button>
                    <Button color={"dark"} onClick={() => {
                        setOpenModal('');
                        handleDiscard();
                    }}>
                        <span className={"flex items-center mr-2"}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </span>
                        Discard
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
