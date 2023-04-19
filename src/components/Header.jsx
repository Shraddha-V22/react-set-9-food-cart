import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const { cart } = useCart();
  return (
    <header className="header">
      <nav className="flex">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/cart">Cart({cart.length})</Link>
      </nav>
    </header>
  );
}
