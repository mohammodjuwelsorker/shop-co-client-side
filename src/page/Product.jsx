import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { IoStar } from "react-icons/io5";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { FaMinus, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import ProductReview from "../components/ProductReview";
import Card from "../components/Card";
import useAuth from "../hooks/useAuth";

const Product = () => {
   const {id} = useParams();
   const axios = useAxios();
   const {user} = useAuth();

   const [colorSelector, setColorSelector] = useState('');
   const [productSize, setProductSize] = useState('');
   const [quantity, setQuantity] = useState(1);
   console.log(productSize)

   const {data:product, isError, isLoading} = useQuery({
      queryKey: ['single-product'],
      queryFn: async () => {
         const res = await axios.get(`/services/${id}`);
         return res;
      }
   });

   // cart data 
   const cartDataObj = {
      email: user.email,
      productImage: product?.data?.image,
      productName: product?.data?.title,
      productPrice: product?.data?.price,
      productSize: productSize,
      productQuantity: quantity,
      productId: id,
      productColor: colorSelector,
   }
   const {mutate} = useMutation({
      mutationKey:['cart'],
      mutationFn: (cartData) => {
         axios.post('/user-cart', cartData)
      },
      onSuccess: () => {
         toast.success('cart data successfully added')
      }
   })


   if(isError) {
      return <p>{`give me same wrang ${isError}`}</p>
   }

   // dynamic rating  start create 
   const rating = Math.ceil(product?.data.rating);
   // size array 
   const sizes = ['small','Medium','Large','X-Large'];
   // decrease handle
   const handleDecrease = () => {
      if(quantity > 1) {
         setQuantity(quantity - 1);
      }
   }

   // increase handle 
   const handleIncrease = () => {
      if(quantity > 0) {
         setQuantity(quantity + 1)
      }
   }


   return (
      <div>
         {isLoading ? 'loading' :
            <div>
               <div className="md:flex justify-between">
                  {/* image container  */}
                  <div className={`relative w-auto h-[ 290px] md:w-[444px] p-5 rounded-2xl md:h-[530px] bg-[${colorSelector && colorSelector}]`}>
                     <img className={`w-full h-full rounded-2xl`}
                     src={product?.data?.image} alt="" />
                     <div className="absolute bottom-10 left-10">
                        <p className="capitalize text-base text-black font-bold">Product size: <span className="text-[rgba(0, 0, 0, 0.60)]">{productSize ? productSize : 'small'}</span></p>
                     </div>
                  </div>
                  {/* text container  */}
                  <div className="p-5">
                     <div className="space-y-3">
                        <h1 className="text-4xl text-black uppercase font-bold">{product?.data?.title}</h1>
                        {/* rating box  */}
                        <div className="flex items-center gap-2">
                           {
                              [...Array(rating).fill(0)].map((rating, index) => <p key={index}
                              className="text-xl font-semibold text-[#FFC633]"><IoStar/></p>)
                           }
                           <span className="text-xl text-black">{`${product?.data?.rating} / ${rating}`}</span>
                        </div>
                        <p className="text-3xl text-black font-bold">price: ${product?.data?.price}</p>
                        <p className="text-base text-[rgba(0, 0, 0, 0.60)] font-normal capitalize">{product?.data?.description ? product?.data?.description : 'no description'}</p>
                     </div>
                     {/* border box  */}
                     <div className="divider"></div>
                     {/* color selector box */}
                     <div className="space-y-4">
                        <p className="text-base text-[rgba(0, 0, 0, 0.60)] font-normal">select colors</p>
                        <div className="flex items-center space-x-4">
                           {/* color selector 1 */}
                           <button onClick={()=> setColorSelector('#4F4631')} className="flex items-center justify-center w-[37px] h-[37px] rounded-full bg-[#4F4631]">{colorSelector === '#4F4631' ? <FaCheck className="text-white text-base font-semibold"/> : ''}</button>
                           {/* color selector 2 */}
                           <button onClick={()=> setColorSelector('#314F4A')} className="flex items-center justify-center w-[37px] h-[37px] rounded-full bg-[#314F4A]">{colorSelector === '#314F4A' ? <FaCheck className="text-white text-base font-semibold"/> : ''}</button>
                           {/* color selector 3 */}
                           <button onClick={()=> setColorSelector('#31344F')} className="flex items-center justify-center w-[37px] h-[37px] rounded-full bg-[#31344F]">{colorSelector === '#31344F' ? <FaCheck className="text-white text-base font-semibold"/> : ''}</button>
                        </div>
                     </div>
                     {/* divider box  */}
                     <div className="divider"></div>

                     {/* choose your size box  */}
                     <div className="space-y-4">
                        <p className="text-base text-[rgba(0, 0, 0, 0.60)] font-normal">choose size</p>
                        {/* size box  */}
                        <div className="flex items-center gap-3 flex-wrap-reverse md:flex-wrap-reverse">
                           {
                              sizes.map(size => {
                                 // console.log(size)
                                 return (
                                    <button key={size} onClick={()=> setProductSize(size)} className="text-base px-6 py-3 rounded-[62px] bg-[#F0F0F0] capitalize">{size}</button>
                                 )
                              })
                           }
                        </div>
                     </div>
                     {/* divider box  */}
                     <div className="divider"></div>

                     {/* quantity and add cart box  */}
                     <div className="sm:flex items-center gap-6 ">
                        {/* quantity box  */}
                        <div className="w-full mb-6 sm:mb-0 sm:w-1/2 flex items-center rounded-[62px] border-2 px-6 py-4">
                           {/* decrease button  */}
                           <button onClick={handleDecrease} className="w-1/3 text-2xl font-bold text-black"><FaMinus/></button>
                           <input className="w-1/3 text-center text-base font-bold text-black focus:outline-none h-full" type="text" onChange={(e) => setQuantity(e.target.value)} value={quantity} />
                           {/* increase button  */}
                           <button onClick={handleIncrease} className="w-1/3 flex items-center justify-end text-2xl font-bold text-black"><FaPlus/></button>
                        </div>
                        {/* add cart box  */}
                        <div className="w-full sm:w-1/2">
                           <button onClick={() => mutate(cartDataObj)} className="w-full py-4 rounded-[62px] bg-black text-white">Add to Cart</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         }

         {/* review container  */}
         <ProductReview product={product}></ProductReview>

         {/* You might also like container  */}
         <div>
            {/* header title  */}
            <div className="text-center mb-10">
               <h1 className="text-4xl font-bold text-black capitalize">You might also like</h1>
            </div>
            {/* card container  */}
            <Card></Card>
         </div>
      </div>
   );
};

export default Product;