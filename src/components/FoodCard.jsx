import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

export default function FoodCard({ food, inCart }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const { cart, dispatch } = useCart();
  const { id, name, description, price, image, delivery_time } = food;

  useEffect(() => {
    cart.find((item) => item.id === food.id) && setAddedToCart(true);
  }, [cart]);

  const buttonData = inCart ? (
    <div className="flex qty-area">
      <p>Qty</p>
      <div className="flex" style={{ gap: "0.5rem" }}>
        <button onClick={() => dispatch({ type: "INC_QTY", payload: food })}>
          ▲
        </button>
        <button onClick={() => dispatch({ type: "DEC_QTY", payload: food })}>
          ▼
        </button>
      </div>
      {food.quantity ?? food.quantity}
    </div>
  ) : addedToCart ? (
    <button className="btn">
      <Link to="/cart">Go to Cart</Link>
    </button>
  ) : (
    <button
      onClick={() => dispatch({ type: "ADD", payload: food })}
      className="btn"
    >
      Add to Cart
    </button>
  );

  return (
    <section className="flex flex-col card">
      <img src={image} alt="" />
      <div className="flex flex-col" style={{ gap: "0.5rem" }}>
        <h3>{name}</h3>
        <small>{description}</small>
        <p>${price}</p>
        <p>Deliver in {delivery_time} min</p>
      </div>
      {buttonData}
      {inCart && (
        <button
          className="btn"
          onClick={() => dispatch({ type: "REMOVE", payload: id })}
        >
          Remove from Cart
        </button>
      )}
    </section>
  );
}

// {
/* <div>
  <p>Qty</p>
  <div>
  <button onClick={() => dispatch({ type: "INC_QTY", payload: food })}>
    ▲ 
  </button>
  <button onClick={() => dispatch({ type: "DEC_QTY", payload: food })}>
    ▼ 
  </button>
  </div>
  {food.quantity ?? food.quantity}
</div>; */
// }

// id: 1,
// name: "Margherita Pizza",
// description: "Fresh mozzarella, tomato sauce, and basil.",
// price: 12.99,
// image:
//   "https://www.cookingchanneltv.com/content/dam/images/cook/fullset/2011/1/6/0/CCEV103_Margherita-Pizza_s4x3.jpg",
// is_vegetarian: true,
// is_spicy: false,
// delivery_time: 30
