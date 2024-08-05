import { useQueryParams } from "../../hooks";
import "./filter.scss";

type FilterProps = {
  targetCity?: string;
  onSearch?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Filter: React.FC<FilterProps> = ({ targetCity = "ROME", onSearch }) => {
  const { updateQueryParams } = useQueryParams();
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    console.log(data);
    updateQueryParams(data as Record<string, string>);
  };

  return (
    <div className="filter">
      <h1>
        Search results for <b>{targetCity}</b>
      </h1>
      <form onSubmit={handleFormSubmit}>
        <div className="top">
          <div className="filterItem">
            <label htmlFor="city">Location</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City Location"
            />
          </div>
        </div>
        <div className="bottom">
          <div className="filterItem">
            <label htmlFor="type">Type</label>
            <select name="type" id="type">
              <option value="">any</option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <div className="filterItem">
            <label htmlFor="property">Property</label>
            <select name="property" id="property">
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
            </select>
          </div>
          <div className="filterItem">
            <label htmlFor="minPrice">Min Price</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              placeholder="any"
            />
          </div>
          <div className="filterItem">
            <label htmlFor="maxPrice">Max Price</label>
            <input
              type="text"
              id="maxPrice"
              name="maxPrice"
              placeholder="any"
            />
          </div>
          <div className="filterItem">
            <label htmlFor="bedroom">Bedroom</label>
            <input type="text" id="bedroom" name="bedroom" placeholder="any" />
          </div>
          <button type="submit">
            <img src="/search.png" alt="" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
