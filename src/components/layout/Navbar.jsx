import { Link } from "react-router-dom";

const Navbar = () => {
   return (
      <nav className="flex items-center gap-3 xl:gap-8">
         <Link to='/' className="text-base font-medium text-black capitalize">Shop</Link>
         <Link to='/category' className="text-base font-medium text-black capitalize">Category</Link>
         <Link  className="text-base font-medium text-black capitalize">New Arrivals</Link>
         <Link  className="text-base font-medium text-black capitalize">On Sale</Link>
         <Link  className="text-base font-medium text-black capitalize">Brands</Link>
      </nav>
   );
};

export default Navbar;