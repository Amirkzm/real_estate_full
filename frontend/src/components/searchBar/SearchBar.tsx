import { Button } from "../button";
import TabSelector from "../tabSelector/TabSelector";
import "./searchBar.scss";

const SearchBar = () => {
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="searchWrapper">
      <TabSelector numberOfTabs={2} tabTitles={["Buy", "Rent"]} />
      <form>
        <input type="text" name="location" placeholder="City Location" />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
        />
        <Button onClick={formSubmitHandler}>
          <img src="/search.png" alt="" />
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
