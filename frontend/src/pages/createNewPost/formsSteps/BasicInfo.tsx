import ReactQuill from "react-quill";
import "./BasicInfo.scss";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
type BasicInfoProps = {
  value: string;
  setValue: (value: string) => void;
};

const BasicInfo: React.FC<BasicInfoProps> = ({ value, setValue }) => {
  return (
    <>
      <div className="item">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" />
      </div>
      <div className="item">
        <label htmlFor="price">Price</label>
        <input id="price" name="price" type="number" />
      </div>
      <div className="item">
        <label htmlFor="property">Property</label>
        <select id="property" name="property">
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
        </select>
      </div>
      <div className="item">
        <label htmlFor="type">Type</label>
        <select id="type" name="type">
          <option value="rent">RENT</option>
          <option value="sale">SALE</option>
        </select>
      </div>

      <div className="item description">
        <label htmlFor="desc">Description</label>
        <ReactQuill theme="snow" onChange={setValue} value={value} />
      </div>
    </>
  );
};

export default BasicInfo;
