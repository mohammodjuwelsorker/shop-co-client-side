import { useMutation, useQuery } from "@tanstack/react-query";
import { GiSettingsKnobs } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import useAxios from './../hooks/useAxios';
import { PropTypes } from 'prop-types';
import useAuth from './../hooks/useAuth';
import { useState } from "react";
import toast from "react-hot-toast";
import { IoStar } from 'react-icons/io5';
import { BsThreeDots } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";

const ProductReview = ({product}) => {
   const {user} = useAuth();
   const axios = useAxios();
   const [reviewWrite, setReviewWrite] = useState(false);
   const [review, setReview] = useState('');
   const [productReviews, setProductReviews] = useState(4)
   // console.log(user.displayName);

   // date method 
   const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]
   const date = new Date().getDate();
   const monthNames = new Date().getMonth();
   const month = months.find((month) => month[monthNames]);
   const year = new Date().getFullYear();
   // console.log(month)

   const {data:reviews, isLoading, isError} = useQuery({
      queryKey:['review'],
      queryFn: async () => {
         const res = axios.get('/service/review')
         return res;
      }
   });

   console.log('review: ',reviews?.data?.reviews)

   // review data 
   const reviewData = {
      name: user?.displayName || 'Ami Name Dibona',
      rating: product?.data?.rating,
      review: review,
      postTime: `post on ${month} ${date}, ${year}`
   }
   // post review data 
   const {mutate} = useMutation({
      mutationKey:['review'],
      mutationFn: (reviews) => {
         return axios.post('/service/create-review', reviews)
      },
      onSuccess: () => {
         toast.success('review create success?');
      }
   });

   // review submit function 
   const handleReviewSubmit = () => {
      if(reviewData.review) {
         mutate(reviewData);
         // if mutate success then setReviewWrite false 
         if(mutate) {
            setReviewWrite(false);
         }
      }else {
         return toast.error('please the provide in any here?..')
      }
      
   };

   // review delete function 
   const handleReviewDelete = async(id) => {
      console.log(id)
      const res = await axios.delete(`/service/cancel-review/${id}`);
      console.log(res)
      if(res.data.reviews.deletedCount > 0) {
         toast.success('review delete successfully hoga..')
      }
   } 

   if(isError) {
      return <p>{isError}</p>
   }

   // rating array 
   const rating = reviews?.data?.reviews?.map(rating => rating.rating);
   // console.log(rating);


   return (
      <div >
         <div className="text-center mt-10">
            <div role="tablist" className="grid grid-cols-2 w-full tabs-bordered">
               <input type="radio" name="my_tabs_1" role="tab" className=" text-xl  text-[rgba(0, 0, 0, 0.60)] tab" aria-label="Product Details" />
               {/* product detail box  */}
               <div role="tabpanel" className="tab-content p-10">
                  <div className="md:flex gap-6 justify-between">
                     <div className="flex-1 md:h-[400px] mb-6">
                        <img className="w-full h-full rounded-2xl" src={product?.data?.image} alt="" />
                     </div>
                     <div className="flex-1 text-left">
                        <h1 className="text-2xl font-semibold mb-5">Product  Description </h1>
                        <p className="text-base text-[rgba(0,0,0,0.60)] capitalize ">{`
                           Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                           
                           The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`}
                        </p>
                     </div>
                  </div>
               </div>

               {/* review details */}
               <input type="radio" name="my_tabs_1" role="tab" className="w-52 text-xl text-[rgba(0, 0, 0, 0.60)] tab" aria-label="Rating & Reviews" checked />
               {/* rating and review content box  */}
               <div role="tabpanel" className="w-full tab-content p-10">
                  <div>
                     {/* header content  */}
                     <div className="flex items-center justify-between my-6">
                        <h1>All review <span className="text-base text-[rgba(0,0,0,0.60)]">({reviews?.data?.reviewTotal})</span></h1>
                        <div className="flex items-center justify-evenly gap-4">
                           <button className="flex items-center justify-center w-[58px] h-[55px] rounded-full bg-[#F0F0F0]"><GiSettingsKnobs className="text-xl font-bold" /></button>
                           {/* dropdown box  */}
                           <div>
                              <div className="dropdown">
                                 <div tabIndex={0} role="button" className="flex items-center gap-4 px-5 py-4 rounded-[62px] bg-[#F0F0F0]">Latest <IoIosArrowDown/></div>
                                 <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a>Item 1</a></li>
                                    <li><a>Item 2</a></li>
                                 </ul>
                              </div>
                           </div>
                           <button onClick={()=> setReviewWrite(true)} className="text-white text-base font-medium px-5 py-4 bg-black rounded-[62px]">Write a Review</button>
                        </div>
                     </div>
                     {/* content Container  */}
                     <div>
                        { reviewWrite ? <div className=" mt-8 flex justify-end">
                              <div className="md:w-1/2">
                                 <textarea onChange={(e)=> setReview(e.target.value)} className=" w-full h-full md:h-44 p-5 focus:outline-none border-2 rounded-xl textarea-success" placeholder="write review"></textarea>
                                 <button onClick={handleReviewSubmit} className="mt-4 block  bg-[#F506A4] text-lg text-white font-semibold capitalize px-10 py-3 rounded-[62px]">submit</button>
                              </div>
                              
                           </div>
                           :
                           // review show box 
                           <div className="md:grid md:grid-cols-2 gap-6 items-center">
                              {  isLoading ? 'loading' :
                                 reviews?.data?.reviews?.slice(0,productReviews).map(review => {
                                    return (
                                       <div key={review._id} className="mb-6 md:mb-0 p-8 border-2 rounded-[15px] flex justify-between gap-2">
                                          <div>
                                             <div className="text-left">
                                                <div className="flex items-center gap-1 mb-5">
                                                   {
                                                      rating?.map((rating, inx) => {
                                                         return (
                                                            <p key={inx} className="text-[#FFC633] text-xl font-semibold">
                                                            <IoStar/>
                                                            </p>
                                                         )
                                                      })
                                                   }
                                                </div>
                                                <h1 className="flex items-center gap-2 text-xl text-black font-bold capitalize nb-4">{review.name} <span className="flex items-center justify-center text-white text-base w-[30px] h-[30px] rounded-full bg-[#01AB31]"><FaCheck/></span></h1>
                                                <p className="text-base text-[rgba(0,0,0,0.60)] capitalize mb-6">{review.review}</p>
                                                <p className="text-bse text-[rgba(0,0,0,0.60)] font-medium capitalize">{review.postTime}</p>
                                             </div>
                                          </div>
                                          {/* delete button  */}
                                          <div>
                                             <button onClick={() => handleReviewDelete(review._id)} className="text-2xl text-black font-bold"><BsThreeDots /></button>
                                          </div>
                                       </div>
                                    )
                                 })
                              }

                              {/* read more review box  */}
                              <div className="col-span-2 my-10 text-center">
                                 <button onClick={() => {
                                    productReviews === 4 ?
                                       setProductReviews(reviews?.data?.reviews.length)
                                    :
                                       setProductReviews(4)
                                 }} className="text-base text-black font-medium px-14 py-3 border-2 rounded-[62px] capitalize">
                                    read more review
                                 </button>
                              </div>
                           </div>
                        }
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

ProductReview.propTypes = {
   product: PropTypes.object,
}

export default ProductReview;