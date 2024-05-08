const PictureCard = ({ picture, onAddToCart, onRemoveFromCart, isInCart }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl hover:border-blue-300 transition-shadow duration-200 ease-in-out">
      <img
        className="w-full h-40 object-cover rounded-lg"
        src={picture.url}
        alt={picture.name}
      />
      <h3 className="mt-2 text-lg font-semibold">{picture.name}</h3>
      <p className="text-gray-600">{`Price: $${picture.price}`}</p>
      {isInCart ? (
        <button
          className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 ease-in-out"
          onClick={() => onRemoveFromCart(picture.id)}
        >
          Remove from Cart
        </button>
      ) : (
        <button
          className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 ease-in-out"
          onClick={() => onAddToCart(picture)}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default PictureCard;
