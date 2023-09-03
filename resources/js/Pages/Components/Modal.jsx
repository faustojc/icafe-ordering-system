import React from 'react';

function Modal({ modal_id, modal_title, children }) {
    let body = null;
    let footer = null;

    React.Children.forEach(children, (child) => {
       if (child.type === Modal.Body) {
           body = child;
       }
       else if (child.type === Modal.Footer) {
           footer = child;
       }
    });

    return (
        <div id={modal_id} data-modal-backdrop="static" tabIndex="-1" aria-hidden="true"
             className={"fixed inset-0 z-50 flex hidden items-center justify-center w-full overflow-x-hidden overflow-y-auto outline-none focus:outline-none"}
        >
            <div className={"relative w-full max-w-2xl max-h-full"}>
                {/*content*/}
                <div className={"relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none"}>
                    {/*header*/}
                    <div className={"flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200"}>
                        <h3 className={"text-3xl font-semibold"}>
                            {modal_title}
                        </h3>
                        <button data-modal-hide={modal_id}
                                id={modal_id + "_close_button"} type={"button"}
                                className={"p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/*body*/}
                    {body}

                    {/*footer*/}
                    {footer}
                </div>
            </div>
        </div>
    );
}

const ModalBody = (props) => (<div className={"relative flex-auto p-6"}>{props.children}</div>)
Modal.Body = ModalBody;

const ModalFooter = (props) => (<div className={"flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200"}>{props.children}</div>)
Modal.Footer = ModalFooter;

export {ModalBody, ModalFooter};
export default Modal;
