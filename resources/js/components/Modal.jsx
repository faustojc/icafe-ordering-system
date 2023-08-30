function Body({children}) {
    return (
        <div className={"relative flex-auto p-6"}>
            {children}
        </div>
    );
}

function Footer({children}) {
    return (
        <div className={"flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200"}>
            {children}
        </div>
    );
}

function Modal({ modal_id, modal_title }) {
    return (
        <div id={modal_id} className={"fixed inset-0 z-50 flex items-center justify-center w-full overflow-x-hidden overflow-y-auto outline-none focus:outline-none"}>
            <div className={"relative w-full max-w-2xl max-h-full"}>
                {/*content*/}
                <div className={"relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none"}>
                    {/*header*/}
                    <div className={"flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200"}>
                        <h3 className={"text-3xl font-semibold"}>
                            {modal_title}
                        </h3>
                        <button className={"p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"} onClick={() => document.getElementById(modal_id).classList.add("hidden")}>
                            <span className={"bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none"}>×</span>
                        </button>
                    </div>
                    {/*body*/}
                    <Modal.Body/>

                    {/*footer*/}
                    <Modal.Footer/>
                </div>
            </div>
        </div>
    );
}

Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
