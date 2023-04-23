import { useEffect, useState } from "react";
import { useMenu } from "../contexts/MenuContext";

export default function FilterComp({ setFilteredMenu }) {
  const { menu } = useMenu();
  const [searchText, setSearchText] = useState("");
  const [filterInput, setFilterInput] = useState({
    veg: false,
    spicy: false,
    sortByPrice: "",
  });

  const filterMenu = () => {
    let temp = filterInput;
    //working fine but if veg or spicy is checked then sort doesn't work
    if (filterInput.veg && filterInput.spicy) {
      temp = menu.filter(
        ({ is_vegetarian, is_spicy }) => is_vegetarian || is_spicy
      );
    } else if (filterInput.veg) {
      temp = menu.filter(({ is_vegetarian }) => is_vegetarian);
    } else if (filterInput.spicy) {
      temp = menu.filter(({ is_spicy }) => is_spicy);
    } else if (!filterInput.veg && !filterInput.spicy) {
      temp = menu;
    }

    if (filterInput.sortByPrice === "low-to-high") {
      temp = [...temp].sort((a, b) => a.price - b.price);
    } else if (filterInput.sortByPrice === "high-to-low") {
      temp = [...temp].sort((a, b) => b.price - a.price);
    }

    temp = temp.filter(
      ({ name, description }) =>
        name.toLowerCase().includes(searchText) ||
        description.toLowerCase().includes(searchText)
    );

    setFilteredMenu(temp);
  };

  useEffect(() => {
    filterMenu();
    return () => filterMenu();
  }, [menu, searchText, filterInput]);

  const filterByVegOrSpicy = (e) => {
    const { name, checked } = e.target;
    setFilterInput((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <section className="filter">
      <h3>Filters: </h3>
      <div className="flex flex-wrap" style={{ gap: "1.5rem" }}>
        <input
          className="search-input"
          type="text"
          placeholder="Search food here"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div>
          <input
            type="checkbox"
            name="veg"
            id="veg"
            onChange={filterByVegOrSpicy}
          />
          <label htmlFor="veg">Veg</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="spicy"
            id="spicy"
            onChange={filterByVegOrSpicy}
          />
          <label htmlFor="spicy">Spicy</label>
        </div>
        <div>
          <input
            type="radio"
            name="sortByPrice"
            id="low-to-high"
            value="low-to-high"
            onChange={(e) =>
              setFilterInput((prev) => ({
                ...prev,
                sortByPrice: e.target.value,
              }))
            }
          />
          <label htmlFor="low-to-high">Sort(price) low to high</label>
        </div>
        <div>
          <input
            type="radio"
            name="sortByPrice"
            id="high-to-low"
            value="high-to-low"
            onChange={(e) =>
              setFilterInput((prev) => ({
                ...prev,
                sortByPrice: e.target.value,
              }))
            }
          />
          <label htmlFor="high-to-low">Sort(price) high to low</label>
        </div>
      </div>
    </section>
  );
}
