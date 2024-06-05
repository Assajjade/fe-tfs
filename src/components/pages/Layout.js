import { Outlet } from "react-router-dom"
import Navbar from "../Navbar"
import Footer from "../Footer"

const Layout = () => {
    return(
        // <div className="layout w-full h-full flex flex-col justify-between">
        <div className="main-layout">
            <Navbar/>
            {/* <div className="container mx-auto py-[20px] mb-[216px]"> */}
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Layout