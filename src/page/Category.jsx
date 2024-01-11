import { useQuery } from "@tanstack/react-query";
import { VscSettings } from "react-icons/vsc";
import useAxios from "../hooks/useAxios";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import CategoryProduct from "../components/CategoryProduct";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";


const Category = () => {
   const axios = useAxios();
   const [price, setPrice] = useState(0);
   const [category, setCategory] = useState([]);
   const [toggle, setToggle] = useState(!false);
   const [page, setPage] = useState(1);
   const [sortPrice, setSortPrice] = useState(" ");
   console.log(price)

   const {data:products, isLoading} = useQuery({
      queryKey:['products', category, price, page, sortPrice],
      queryFn: async () => {
         const res = await axios.get(`/services-category?category=${category}&priceRange=${price}&page=${page}&size=${dataLimit}&sortPrice=price&sortOrder=${sortPrice}`);
         return res;
      }
   })
   console.log(products?.data?.servicesName)
   // pagination page 
   const dataLimit = 6;
   const totalPage = Math.ceil(Number(products?.data?.totalLength ) / dataLimit);
   // console.log(totalPage)

   return (
      <div>
         <div>
            <div className="md:flex gap-6">
               {/*left side bar container  */}
               <div className="md:h-[100vh] h-full md:w-[295px] w-full mb-6 md:mb-0 p-5 border-2 rounded-lg">
                  {/* filter box  */}
                  <div>
                     {/* filter header  */}
                     <div className="flex items-center justify-between border-b-2 pb-6 mb-6">
                        <h1 className="text-xl text-black font-bold capitalize">filter</h1>
                        <button className="text-2xl font-bold"><VscSettings/></button>
                     </div>
                     {/* filter button box  */}
                     <div className="space-y-5 pb-6 mb-6 border-b-2">
                        {
                           products?.data?.onlyCategory?.map(filter => {
                              return (
                                 <div key={filter}>
                                    <button onClick={() => {
                                       setCategory(filter)
                                       }} className={`flex items-center justify-between w-full rounded-2xl text-left text-base  font-normal capitalize ${category == filter && 'text-[#F506A4]'}`}>{filter} <IoIosArrowForward/></button>
                                 </div>
                              )
                           })
                        }
                     </div>
                     {/* price box  */}
                     <div>
                        <div className="flex items-center justify-between mb-5">
                           <h1 className="text-xl text-black font-bold capitalize">price</h1>
                           <button onClick={()=> setToggle(!toggle)}>{
                              toggle ? <button className="text-xl font-bold"><IoIosArrowUp /></button> 

                              : <button className="text-xl font-bold"><IoIosArrowDown/></button>
                           }</button>
                        </div>
                        <div className="h-4 block">
                           <input className={toggle ? 'block' : 'hidden'} type="range" value={price} min={0} max={100} onChange={(e)=> setPrice(e.target.value)} />
                        </div>
                     </div>
                  </div>
               </div>
               {/* right side container  */}
               <div>
                  {/* product header  */}
                  <div className="flex items-center justify-between mb-7">
                     <h1 className="text-3xl text-black font-bold capitalize">Casual</h1>
                     <div className="flex items-center gap-2">
                        <p className="text-[rgba(0,0,0,0.60)] text-base font-normal">Showing 1-10 of 100 Products</p>
                        <div>
                           <select  onChange={(e)=> setSortPrice(e.target.value)} className="select focus:outline-none w-full max-w-xs text-[rgba(0,0,0,0.60)] text-base font-normal">
                              <option disabled selected>Sort Price</option>
                              <option value='asc'>lowast price</option>
                              <option value='desc'>highest price</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  {/* product container  */}
                  <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {
                        products?.data?.servicesName?.map(product => 
                        <CategoryProduct key={product._id} product={product} />)
                     }
                  </div>
                  {/* pagination box  */}
                  <div className="flex items-center justify-between gap-2 border-t-2 mt-8 pt-6 mb-8">
                     {/* prev button  */}
                     <button onClick={() => {
                        if(page > 1) {
                           setPage(page - 1);
                        }
                     }} className="flex items-center justify-center gap-3 px-4 py-2 border-2 rounded-lg text-base text-black capitalize font-medium"><FaArrowLeft className="text-xl" /> <span>Previous</span></button>
                     <div className="flex items-center gap-2">
                        { isLoading ? 'loading' :
                           [... Array(totalPage).fill(0)].map((pnPage, index )=> {
                              const pageNumber = index + 1;
                              return (
                                 <div key={pageNumber}>
                                    <button onClick={()=> setPage(pageNumber)}
                                    className={`p-3 text-base text-black font-medium rounded-lg ${page === pageNumber ? 'bg-[#FF3333]' : 'bg-[rgba(0,0,0,0.06)]'}`}>{pageNumber}</button>
                                 </div>
                              )
                           })
                        }
                     </div>
                     {/* next button  */}
                     <button onClick={() => {
                        if(page < totalPage) {
                           setPage(page + 1);
                        }
                     }} className="flex items-center justify-center gap-3 px-4 py-2 border-2 rounded-lg text-base text-black capitalize font-medium"><span>Next</span> <FaArrowRight className="text-xl" /></button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Category;