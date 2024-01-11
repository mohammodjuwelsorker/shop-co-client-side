const Banner = () => {
  return (
    <div>
      <div className="w-full h-full max-h-[663px] relative">
        {/* text content  */}
        <div className="px-3 md:px-10 py-10 md:py-28 w-full bg-[#F2F0F1]">
            <div className="md:w-[577px] space-y-8">
               <h1 className="text-3xl md:text-5xl text-black font-bold">
               FIND CLOTHES THAT MATCHES YOUR STYLE
               </h1>
               <p className="text-[rgba(0, 0, 0, 0.60)] text-base">
               Browse through our diverse range of meticulously crafted garments,
               designed to bring out your individuality and cater to your sense
               of style.
               </p>
               <button className="w-52 py-4 rounded-[64px] bg-black text-white text-base font-medium">
               Shop Now
               </button>
               {/* total product collection  */}
               <div className="w-full md:w-60 p-3 rounded-lg text-center space-y-3 border-2 border-[#F33] ">
                  <span className="text-4xl text-black font-bold">200+</span>
                  <p className="text-[rgba(0, 0, 0, 0.60)] text-base font-medium">
                     Product Collection
                  </p>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
