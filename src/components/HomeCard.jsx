import { IoStar } from "react-icons/io5";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";


const HomeCard = ({ service }) => {

  const navigate = useNavigate()

  // dynamic array create and show dynamic rating
  const rating = Math.ceil(service.rating);
  const ratingStar = Array(rating).fill(0);
  console.log(ratingStar);
  return (
    <div onClick={()=> navigate(`/product/${service._id}`)}>
      <div className="space-y-3 mb-3">
        <div className="w-full h-[300px] rounded-2xl">
          <img
            className="w-full block h-full rounded-2xl "
            src={service.image}
            alt=""
          />
        </div>
        <div className="space-y-2 overflow-hidden">
          <h1 className="text-xl text-black font-semibold capitalize">
            {service.title}
          </h1>
          <div className="flex items-center gap-2">
            {ratingStar.map((rating, index) => {
              /* const counter = index + 1;
                console.log('counter: ',counter) */
              return (
                <p key={index} className="text-xl font-semibold text-[#FFC633]">
                  <IoStar />
                </p>
              );
            })}
            <span className="text-xl text-black">{`${service?.rating} / ${rating}`}</span>
          </div>
          <p className="text-2xl text-black font-bold capitalize">
            price: ${service.price}
          </p>
        </div>
      </div>
    </div>
  );
};

HomeCard.propTypes = {
  service: PropTypes.object,
};

export default HomeCard;
