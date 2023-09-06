import {Navbar} from "flowbite-react";

export default function OrderNavbar() {
    return (
        <>
            <Navbar fluid rounded>
                <Navbar.Brand>
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        Flowbite React
                    </span>
                </Navbar.Brand>
                
            </Navbar>
        </>
    );
}
