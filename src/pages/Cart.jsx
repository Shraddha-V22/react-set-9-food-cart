import { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";
import { useCart } from "../contexts/CartContext";

export default function Cart() {
  const { cart, dispatch } = useCart();
  const [disableCoupon, setDisableCoupon] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  console.log(cart);

  const deliveryTime = cart.reduce(
    (acc, { delivery_time }) => acc + delivery_time,
    0
  );

  useEffect(() => {
    setTotalPrice(
      cart.reduce((acc, { price, quantity }) => acc + price * quantity, 0)
    );
  }, [cart]);

  const applyCoupon = () => {
    setTotalPrice((prev) => (prev - 5).toFixed(2));
    setDisableCoupon(true);
  };

  return (
    <section
      className="container flex flex-col"
      style={{ alignItems: "center" }}
    >
      <h1>Cart</h1>
      <h3>Total Delivery Time: {deliveryTime}min</h3>
      <h3>Total Price: ${totalPrice}</h3>
      {cart.length > 0 && (
        <button className="btn" onClick={applyCoupon} disabled={disableCoupon}>
          Apply Coupon
        </button>
      )}
      <section className="flex flex-wrap">
        {cart.map((food) => (
          <FoodCard key={food.id} food={food} inCart />
        ))}
      </section>
    </section>
  );
}
