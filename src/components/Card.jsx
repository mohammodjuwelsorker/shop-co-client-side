import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import { MdOutlineStarBorder } from "react-icons/md";
import { useState } from "react";
import toast from "react-hot-toast";

const Card = () => {
   const axios = useAxios();
   const [service, setService] = useState(4);
   const {data:services,isError}  = useQuery({
      queryKey:['services',service ],
      queryFn: async () => {
         const res = await axios.get('/services');
         return res;
      }
   });

   if(isError) {
      return toast.error(`something this error please provide that is give error name: ${isError}`)
   }

   console.log(service?.data)
   return (
      <div>
         <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
               services?.data?.slice(0, service).map(card => {
                  return (
                     <div key={card._id}>
                        <div>
                           {/* image container  */}
                           <div className="w-full h-[300px] rounded-2xl">
                              <img
                                 className="w-full block h-full rounded-2xl "
                                 src={card.image}
                                 alt=""
                              />
                           </div>
                           {/* text container  */}
                           <div className="space-y-2 mt-3">
                              <h3 className="text-xl text-black font-bold caption-top">{card.title}</h3>
                              {/* ratting box  */}
                              <div className="flex items-center gap-1">
                                 {
                                    // [... Array(card.rating)].map(rating)
                                    [... Array(Math.ceil(card.rating)).fill(1)].map((rating, inx) => {
                                       return (
                                          <p key={inx} className="text-[#FFC633] text-lg"><MdOutlineStarBorder/></p>
                                       )
                                    })
                                 }
                                 <span> {`${card.rating} / ${Math.ceil(card.rating)}`}</span>
                              </div>
                              <p className="text-2xl text-black font-bold">${card.price}</p>
                           </div>
                        </div>
                     </div>
                  )
               })
            }
         </div>
         {/* view all  */}
         <div className="my-16 text-center">
            { 
               service === 4 ?
                  <button onClick={() => setService(services?.data.length)} className="text-xl text-black font-semibold capitalize px-14 py-3 border-2 rounded-[40px]">view all</button>
               :
                  <button onClick={() => setService(4)} className="text-xl text-black font-semibold capitalize px-14 py-3 border-2 rounded-[40px]">view 4 item</button>

            }
         </div>
      </div>
   );
};

export default Card;