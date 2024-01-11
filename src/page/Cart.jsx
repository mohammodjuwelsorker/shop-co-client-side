import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import CartProduct from "../components/CartProduct";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaArrowRightLong } from "react-icons/fa6";

const Cart = () => {
   const axios = useAxios();
   const {user} = useAuth();
   const [carts, setCarts] = useState([]);
   useEffect(()=> {
      axios.get(`/user-cart?email=${user?.email}`)
         .then(res => {
            setCarts(res?.data);

         })
   }, [axios, user]);


   const {mutate} = useMutation({
      mutationKey:['cart'],
      mutationFn: (id) => {
        axios.delete(`/user/cancel-cart/${id}`)
      },
      onSuccess: () => {
        toast.success('deleted success');
      }
    })


   console.log(carts)
   return (
      <div>
         <div>
            {/* header title  */}
            <div className="mb-6">
               <h4 className="text-4xl text-black font-bold capitalize">Your cart</h4>
            </div>
            {/* content container  */}
            <div className="md:flex justify-between gap-6">
               {/* cart box container  */}
               <div className="md:w-3/5 w-full space-y-5 mb-6 md:mb-0">
                  {
                     carts?.cartData?.map(cart => {
                        return <CartProduct key={cart._id} cart={cart} mutate={mutate} />
                     })
                  }
               </div>
               {/* order summary  container  */}
               <div className="md:w-1/3 md:h-[458px] p-5 border-2 rounded-lg ">
                  <div className="space-y-6">
                     <h1 className="text-2xl text-black font-bold capitalize">Order Summary</h1>
                     <div className="flex items-center justify-between">
                        <p className="text-xl text-[rgba(0, 0, 0, 0.60)] font-normal capitalize">Subtotal</p>
                        <p className="text-xl text-black font-bold">$565</p>
                     </div>
                     <div className="flex items-center justify-between">
                        <p className="text-xl text-[rgba(0, 0, 0, 0.60)] font-normal capitalize">Discount (-20%)</p>
                        <p className="text-xl text-black font-bold">-$113</p>
                     </div>
                     <div className="flex items-center justify-between border-b-2 pb-5">
                        <p className="text-xl text-[rgba(0, 0, 0, 0.60)] font-normal capitalize">Delivery Fee</p>
                        <p className="text-xl text-black font-bold">$15</p>
                     </div>
                     <div className="flex items-center justify-between">
                        <p className="text-xl text-[rgba(0, 0, 0, 0.60)] font-normal capitalize">Total</p>
                        <p className="text-xl text-black font-bold">$467</p>
                     </div>
                     {/* promo code box  */}
                     <div className="flex items-center justify-between gap-3">
                        <div className="w-3/4 py-3 px-6 bg-[#F0F0F0] rounded-[62px]">
                           <input type="text" className="w-full bg-inherit focus:outline-none" placeholder="Add promo code" />
                        </div>
                        <button className="w-1/4 px-4 py-3 bg-black rounded-[62px] text-white text-base font-medium">Apply</button>
                     </div>
                     {/* check out button  */}
                     <div>
                        <button className="w-full flex items-center justify-center gap-2 bg-black py-3 text-white text-base font-medium rounded-[62px]">Go to Checkout <FaArrowRightLong/></button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Cart;