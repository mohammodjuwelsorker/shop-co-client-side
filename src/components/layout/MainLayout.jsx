import { Link, Outlet } from "react-router-dom";
import Container from "../Container";
import Navbar from "./Navbar";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const MainLayout = () => {
  
  const {user, logout} = useAuth();
  // console.log(user?.email)

  return (
    <Container>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar justify-between p-0  gap-8 bg-white py-6 mb-6">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="flex items-center btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 flex items-center gap-5">
              <Link to='/' className="text-2xl sm:text-3xl font-bold">SHOP.CO</Link>
              <div className="flex-none hidden lg:block">
              <div className="menu-horizontal">
                {/* Navbar menu content here */}
                <Navbar></Navbar>
              </div>
            </div>
            </div>
            {/* right side content  */}
            <div className="flex-1 flex items-center gap-6 justify-end">
              {/* search box  */}
              <div className="hidden sm:block xl:max-w-lg w-full  h-12">
                  <input className="focus:outline-none px-4 w-full h-full bg-[#F0F0F0] rounded-2xl" type="text" placeholder="search here" />
              </div>
              
              {/* cart content  */}
              <div className="flex items-center gap-5">
                <button className="text-2xl font-bold"><Link to='/cart'>
                  <FiShoppingCart/>
                </Link></button>
                {
                  user?.email ? 
                    <><button onClick={() => logout()} className="text-base font-medium capitalize text-green-500">{user?.displayName}</button></> 
                  :
                    <button className="text-2xl font-bold"><FaRegUserCircle/></button>
                  }
              </div>
            </div>
          </div>
          {/* Page content here */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
   </Container>
  );
};

export default MainLayout;
