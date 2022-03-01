import React, { useState } from "react";
import MetaData from "../layout/MetaData";
import "./search.css";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };
  return (
    <>
      <MetaData title={"Search"} />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type={"text"}
          placeholder="search"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="search" />
      </form>
    </>
  );
};

export default Search;
