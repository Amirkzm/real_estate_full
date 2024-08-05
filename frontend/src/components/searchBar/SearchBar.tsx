import { useNavigate } from "react-router-dom";
import { useQueryParams } from "../../hooks";
import { Button } from "../button";
import TabSelector from "../tabSelector/TabSelector";
import "./searchBar.scss";

const SearchBar = () => {
  const { updateQueryParams, searchParams } = useQueryParams();
  const navigate = useNavigate();

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const inputs = Object.fromEntries(formData) as Record<string, string>;
    console.log(searchParams);
    const inputWithValues = Object.entries(inputs).filter(
      ([_, value]) => value
    );
    const newUrl = `/list?${new URLSearchParams(inputWithValues).toString()}`;
    navigate(newUrl);
  };

  return (
    <div className="searchWrapper">
      <TabSelector tabTitles={["Buy", "Rent"]} />
      <form onSubmit={formSubmitHandler}>
        <input type="text" name="city" placeholder="City Location" />
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
        <Button type="submit">
          <img src="/search.png" alt="" />
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
