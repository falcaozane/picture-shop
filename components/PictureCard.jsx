import { MdOutlineShoppingBag } from "react-icons/md";
import { BsBagX } from "react-icons/bs";
import { toast } from 'react-toastify';

const PictureCard = ({ picture, onAddToCart, onRemoveFromCart, isInCart }) => {
  return (
    <div className="p-4 bg-violet-50 border border-gray-300 rounded-lg shadow-lg hover:shadow-2xl hover:border-blue-300 transition-shadow duration-200 ease-in-out">
      <div className="overflow-hidden block rounded-lg">
        <img
          className="w-full h-56 object-cover rounded-lg hover:scale-125 ease-in duration-150"
          src={picture.url}
          alt={picture.name}
        />
      </div>
      <div className="flex justify-between">
        <div className="flex-start">
          <h3 className="mt-2 text-lg font-semibold">{picture.name}</h3>
          <p className="text-gray-600">{`Price: ${picture.price} wei`}</p>
        </div>
        <div className="justify-items-end">
          {isInCart ? (
            <button
              className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 ease-in-out"
              onClick={() => {
                onRemoveFromCart(picture.id)
                toast.error("Item(s) removed successfully",{position: "bottom-center",autoClose: 3000,})
              }}
            >
              <div className="flex items-center">
                <span className="hidden md:inline-block">Remove from Cart</span>
                <BsBagX className="md:ml-1 font-black h-7 w-7 p-1" />
              </div>
            </button>
          ) : (
            <button
              className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 ease-in-out"
              onClick={() => {
                onAddToCart(picture)
                toast.success("Item(s) added successfully",{position: "bottom-center",autoClose: 3000,})
              }}
            >
              <div className="flex items-center">
                  <span className="hidden md:inline-block">Add to Cart</span>
                  <MdOutlineShoppingBag className="md:ml-1 font-black h-7 w-7"/>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PictureCard;
