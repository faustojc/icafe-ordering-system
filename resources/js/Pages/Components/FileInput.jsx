import {useCallback, useEffect, useState} from "react";

function FileInput({data, setData}) {
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState((data.image !== null) ? URL.createObjectURL(data.image) : "");

    useEffect(() => {
        return () => {
            if (url) {
                URL.revokeObjectURL(url);
            }
        }
    }, [url])

    const onDrop = useCallback((event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;

        if (files.length) {
            uploadFile(files[0]);
        }
    }, []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
    }, []);

    const uploadFile = (file) => {
        if (progress > 0) {
            setProgress(0);
        }

        if (file === undefined) {
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        window.axios.post('/admin/products/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (event) => {
                const p = Math.round((event.loaded * 100) / event.total);
                setProgress(p);
            }
        }).then(response => {
            if (response.status === 200) {
                setData('image', file);
                setUrl(URL.createObjectURL(file));

                setTimeout(() => {
                    setProgress(0);
                }, 100);
            }
        });
    }

    return (
        <>
            <div className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>
                Image
            </div>
            <label htmlFor={"dropzone-file"}
                   onDrop={onDrop}
                   onDragOver={onDragOver}
                   className={"flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"}
            >
                <div className={"flex flex-col items-center justify-center pt-5 pb-6"}>
                    {data.image === null ?
                        (<>
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, JPEG (MAX 3MB)</p>
                        </>) : (
                            <>
                                <img src={url}
                                     alt={""}
                                     className={"object-cover object-center rounded-lg"}
                                     style={{ maxHeight: 180 + 'px' }}
                                />
                                <p className={"mt-2 text-sm text-gray-500 dark:text-gray-400 truncate"}>{data.image.name}</p>
                            </>
                        )
                    }
                    {(progress > 0) && (
                        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-500 mt-3">
                            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: progress + '%' }}>{progress}%</div>
                        </div>
                    )}
                </div>
                <input onChange={(e) => {
                    uploadFile(e.target.files[0]);
                }}
                       id={"dropzone-file"} type={"file"} className={"hidden"} name={"image"} accept={"image/png, image/jpeg, image/jpg"}
                />
            </label>
        </>
    );
}

export default FileInput;
