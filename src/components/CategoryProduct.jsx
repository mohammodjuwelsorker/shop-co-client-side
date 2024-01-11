import { PropTypes } from "prop-types";
import { MdOutlineStarBorder } from "react-icons/md";
const CategoryProduct = ({ product }) => {
  return (
    <div key={product._id}>
      <div>
        {/* image container  */}
        <div className="w-full h-[300px] rounded-2xl">
          <img
            className="w-full block h-full rounded-2xl "
            src={product.image}
            alt=""
          />
        </div>
        {/* text container  */}
        <div className="space-y-2 mt-3">
          <h3 className="text-xl text-black font-bold caption-top">
            {product.title}
          </h3>
          {/* ratting box  */}
          <div className="flex items-center gap-1">
            {
              // [... Array(product.rating)].map(rating)
              [...Array(Math.ceil(product.rating)).fill(1)].map(
                (rating, inx) => {
                  return (
                    <p key={inx} className="text-[#FFC633] text-lg">
                      <MdOutlineStarBorder />
                    </p>
                  );
                }
              )
            }
            <span> {`${product.rating} / ${Math.ceil(product.rating)}`}</span>
          </div>
          <p className="text-2xl text-black font-bold">${product.price}</p>
        </div>
      </div>
    </div>
  );
};

CategoryProduct.propTypes = {
  product: PropTypes.object,
};

export default CategoryProduct;
