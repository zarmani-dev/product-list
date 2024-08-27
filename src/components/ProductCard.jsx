import { motion } from "framer-motion";
const ProductCard = ({
  imgSrc,
  name,
  category,
  price,
  addedProduct,
  onClick,
  onIncrease,
  onDecrease,
}) => {
  // Find Current Product To Check If It Exists
  const currentProduct = addedProduct.find((product) => product.name === name);

  return (
    <div className="w-[300px] mx-auto sm:w-[180px] lg:w-[200px] mb-5">
      <div className="relative flex flex-col items-center">
        <img
          src={imgSrc}
          className={`rounded-lg w-full h-[200px] sm:h-full duration-300 shadow-lg border-2 ${
            currentProduct ? "border-red" : ""
          }`}
          alt="image"
        />

        {/* If Added Product Doesn't Exist */}
        <motion.button
          onClick={onClick}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className={`btn bg-slate-200 border-rose-900/40 gap-2 text-sm ${
            currentProduct ? "hidden" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            fill="none"
            viewBox="0 0 21 20"
          >
            <g fill="#C73B0F" clipPath="url(#a)">
              <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" />
              <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M.333 0h20v20h-20z" />
              </clipPath>
            </defs>
          </svg>
          Add to Cart
        </motion.button>

        {/* If Added Product Exists */}
        {currentProduct && (
          <motion.div
            animate={{ scale: [0.6, 1] }}
            transition={{ duration: 0.1 }}
            className="btn bg-red border-red items-center justify-between text-rose-50 gap-5 "
          >
            <motion.button
              whileTap={{ scale: 0.8 }}
              className="border border-rose-50 p-1 py-2 rounded-full active:bg-rose-50 active:text-red duration-200 "
              onClick={onDecrease}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="2"
                fill="currentColor"
                viewBox="0 0 10 2"
              >
                <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z" />
              </svg>
            </motion.button>
            <span>{currentProduct.quantity}</span>
            <motion.button
              whileTap={{ scale: 0.8 }}
              className="border border-rose-50 p-1 rounded-full active:bg-rose-50 active:text-red duration-200"
              onClick={onIncrease}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="currentColor"
                viewBox="0 0 10 10"
              >
                <path
                  fill="currentColor"
                  d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </div>
      <p className="mt-8 text-rose-500">{category}</p>
      <p className="text-productName text-rose-900 font-semibold">{name}</p>
      <p className="text-red font-semibold">${parseFloat(price).toFixed(2)}</p>
    </div>
  );
};
export default ProductCard;
