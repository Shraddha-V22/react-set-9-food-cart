import { useState } from "react";
import FoodCard from "../components/FoodCard";
import FilterComp from "../components/FilterComp";
import { useMenu } from "../contexts/MenuContext";

export default function Menu() {
  const { menu } = useMenu();
  const [filteredMenu, setFilteredMenu] = useState([...menu]);

  return (
    <section className="container">
      <FilterComp
        setFilteredMenu={setFilteredMenu}
        filteredMenu={filteredMenu}
      />
      <section className="text-center" style={{ marginTop: "2rem" }}>
        <h2 style={{ marginBottom: "2rem" }}>Menu</h2>
        {filteredMenu.length > 0 ? (
          <section className="flex flex-wrap">
            {filteredMenu.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </section>
        ) : (
          <h2>Loading menu...</h2>
        )}
      </section>
    </section>
  );
}
