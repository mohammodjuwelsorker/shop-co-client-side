import { PropTypes } from "prop-types";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useState } from "react";


const CartProduct = ({ cart, mutate,}) => {
  // quantity state 
  const [quantity, setQuantity] = useState(1);
  // const [countQuantity, setCountQuantity] = useState([])
  // console.log(quantity);
  

  // increase quantity function 
  const handleIncrease = (cartData) => {
    const id = cartData;
    if(cart._id === id) {
      setQuantity(quantity + 1);
      // storeFun function call 
      storeFun(quantity, id, quantity)
    }
  };
  // console.log(arr)

  const storeFun = (number, id, quantity) => {
    const array = Array(number)
    // console.log(array, id, quantity)
    const quantityValues = [];
    for(let i = 0; i < array.length; i++) {
      // console.log(array[i]._id)
      // if(id === array[i]._id) {
      //   const quantities = {
      //     quantity: quantity,
      //     quantityId : id,
      //   };
      //   console.log(quantities)
      //   quantityValues.push(quantities);
      //   // console.log(quantityValues)
      // }
      const quantityObj = {
        quantityId: id,
        quantities: quantity
      }
      if(!quantityValues.includes(quantityValues[id])) {
        quantityValues.push(quantityObj)
      }
    }
    console.log(quantityValues)
  }


  

  // decrease quantity function 
  const handleDecrease = (id) => {
    if(cart._id == id) {
      if(quantity > 1)  {
        setQuantity(quantity - 1);
      }
    }
  };



  return (
    <div className="w-full flex justify-between p-5 border-2 rounded-lg ">
      {/* right site box  */}
      <div className="w-full flex items-center gap-4">
        {/* image box  */}
        <div className="w-[125px] h-[125px]">
          <img className="w-full h-full rounded-2xl" src={cart.productImage} alt="" />
        </div>
        {/* text box  */}
        <div>
          <h1 className="text-xl text-black font-bold">{cart.productName}</h1>
          <p className="text-xl text-black font-normal capitalize">size: <span className="text-[rgba(0,0,0,0.60)]">{cart.productSize}</span></p>

          <p className="text-xl text-black font-normal capitalize">color: <span className="text-[rgba(0,0,0,0.60)]">{cart.productColor}</span></p>

          <p className="text-xl text-black font-normal capitalize">{cart.productPrice}</p>
        </div>
      </div>
      {/* right side box  */}
      <div className="flex flex-col items-end justify-between">
         <div className="flex justify-end">
            <button className="text-2xl text-[#FF3333] font-bold" onClick={() => mutate(cart)}><RiDeleteBinLine/></button>
         </div>
         {/* quantity box  */}
         <div className="flex items-center justify-between px-5 py-3 bg-[#F0F0F0] rounded-[62px]">
            {/* decrease button  */}
            <button className="w-10 flex justify-start items-center text-xl font-bold" onClick={() => handleDecrease(cart._id)}><FaMinus/></button>
            {/* input field  */}
            <input type="text" className="w-10 text-center bg-inherit" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            {/* increase button  */}
            <button className="w-10 flex items-center justify-end text-xl font-bold" onClick={() => handleIncrease(cart._id)}><FaPlus/></button>
         </div>
      </div>
    </div>
  );
};
CartProduct.propTypes = {
  cart: PropTypes.object,
  mutate: PropTypes.function,
  totalLength: PropTypes.array,
};
export default CartProduct;
