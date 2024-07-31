import "./detailsInfo.scss";

const DetailsInfo = () => {
  return (
    <>
      <div className="rowItem">
        <div className="item">
          <label htmlFor="bedrooms">Bedrooms</label>
          <input min={0} id="bedrooms" name="bedroom" type="number" />
        </div>
        <div className="item">
          <label htmlFor="bathrooms">Bathrooms</label>
          <input min={0} id="bathrooms" name="bathroom" type="number" />
        </div>
        <div className="item">
          <label htmlFor="size">Total Size (sqft)</label>
          <input min={0} id="size" name="size" type="number" />
        </div>
        <div className="item">
          <label htmlFor="utilities">Utilities Policy</label>
          <select name="utilities">
            <option value="owner">Owner is responsible</option>
            <option value="tenant">Tenant is responsible</option>
            <option value="shared">Shared</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="pet">Pet Policy</label>
          <select name="pet">
            <option value="allowed">Allowed</option>
            <option value="not-allowed">Not Allowed</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="income">Income Policy</label>
          <input
            id="income"
            name="income"
            type="text"
            placeholder="Income Policy"
          />
        </div>

        <div className="item">
          <label htmlFor="school">School</label>
          <input min={0} id="school" name="school" type="number" />
        </div>
        <div className="item">
          <label htmlFor="bus">bus</label>
          <input min={0} id="bus" name="bus" type="number" />
        </div>
        <div className="item">
          <label htmlFor="restaurant">Restaurant</label>
          <input min={0} id="restaurant" name="restaurant" type="number" />
        </div>
      </div>
    </>
  );
};

export default DetailsInfo;
