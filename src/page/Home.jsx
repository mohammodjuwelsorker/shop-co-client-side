import { useQuery } from "@tanstack/react-query";
import Banner from "../components/Banner";
import useAxios from "../hooks/useAxios";
import HomeCard from "../components/HomeCard";
import { useState } from "react";

const Home = () => {
   const axios = useAxios();
   const [arrivals, setArrivals] = useState(4);

   const { data: services, isLoading, isError } = useQuery({
      queryKey: ["services", arrivals],
      queryFn: async () => {
         const res = await axios.get("/services");
         return res;
      },
   });
   console.log("home services: ", services?.data);

   if(isError) {
      return <p>{`give me same error: ${isError}`}</p>
   }

  return (
    <div>
      {/* banner  */}
      <Banner></Banner>
      {/* arrivals section  */}
      <div>
         {/* header title  */}
         <div className="pt-16 pb-16 text-center">
            <h1 className="text-4xl text-black font-bold uppercase">NEW ARRIVALS</h1>
         </div>
         {/* card container  */}
         {
            isLoading ? 
               <div className="w-full flex justify-center items-center">
                  <span className="loading loading-spinner loading-lg"></span>
               </div>
            :
               <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {services?.data?.slice(0,arrivals).map((service) => (
                  <HomeCard key={service._id} service={service} />
                  ))}
               </div>
         }
         {/* view all  */}
         <div className="my-16 text-center">
            { 
               arrivals === 4 ?
                  <button onClick={() => setArrivals(services?.data.length)} className="text-xl text-black font-semibold capitalize px-14 py-3 border-2 rounded-[40px]">view all</button>
               :
                  <button onClick={() => setArrivals(4)} className="text-xl text-black font-semibold capitalize px-14 py-3 border-2 rounded-[40px]">view 4 item</button>

            }
         </div>
      </div>
    </div>
  );
};

export default Home;
