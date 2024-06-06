import CardList from "../../Components/CardList/CardList";
import { main_h, input, form } from "./moviesPage.module.css";
import { useState } from "react";

export default function MoviesPage({
  requestData,
  searchFilmData,
  searchPage,
  setSearchPage,
  maxPage,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const search = e.target.elements.search.value.trim();

    if (search !== "") {
      setSearchValue(search);
      searchFilmData(search, 1);  // Start from page 1 for new search
      setSearchPage(1);  // Reset to page 1
      setSearched(true);
    } else {
      console.log("error empty search");
    }
  };

  const handleNext = () => {
    if (searchPage < maxPage) {
      setSearchPage(searchPage + 1);
      searchFilmData(searchValue, searchPage + 1);
    }
  };

  const handlePrev = () => {
    if (searchPage > 1) {
      setSearchPage(searchPage - 1);
      searchFilmData(searchValue, searchPage - 1);
    }
  };

  return (
    <div>
      <h1 className={main_h}>Search Your Film &#128515;</h1>
      <form className={form} onSubmit={handleSubmit}>
        <label htmlFor="search">
          <input
            id="search"
            placeholder="Search..."
            type="text"
            className={input}
          />
        </label>
      </form>

      {requestData && requestData.length !== 0 ? (
        <div>
          <button onClick={handlePrev}>prev</button>
          <button onClick={handleNext}>next</button>
          <CardList data={requestData} />
        </div>
      ) : searched ? (
        <p>Sorry, we couldn't find any films for "{searchValue}"</p>
      ) : null}
    </div>
  );
}
