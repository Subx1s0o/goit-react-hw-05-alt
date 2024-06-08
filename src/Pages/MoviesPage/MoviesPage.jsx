import CardList from "../../Components/CardList/CardList";
import { main_h, input, form } from "./moviesPage.module.css";
// import { useState } from "react";
import Loader from "../../Components/Loader/Loader";
// import { Toaster, toast } from "react-hot-toast";

export default function MoviesPage({
  requestData,
  searchFilmData,
  // searchPage,
  setSearchPage,
  // maxPage,
  loading,
  setLoading,
}) {
  // const [searchValue, setSearchValue] = useState("");
  // const [searched, setSearched] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const search = e.target.elements.search.value.trim();

    if (search !== "") {
      // setSearchValue(search);
      setLoading(true);
      searchFilmData(search, 1);
      setSearchPage(1);
    } else {
      console.log("error empty search");
    }
  };

  // const handleNext = () => {
  //   if (searchPage < maxPage) {
  //     const nextPage = searchPage + 1;
  //     setSearchPage(nextPage);
  //     searchFilmData(searchValue);
  //   } else {
  //     toast.error("The maximum page");
  //   }
  // };

  // const handlePrev = () => {
  //   if (searchPage > 1) {
  //     const prevPage = searchPage - 1;
  //     setSearchPage(prevPage);
  //     searchFilmData(searchValue);
  //   } else {
  //     toast.error("The minimum page");
  //   }
  // };

  return (
    <div>
      {/* <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          error: {
            style: {
              border: "1px solid #f44336",
              padding: "16px",
              color: "#f44336",
            },
          },
        }}
      /> */}
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

      {loading ? (
        <Loader />
      ) : (
        requestData &&
        requestData.length !== 0 && (
          <div>
            {/* <button onClick={handlePrev}>prev</button>
        <button onClick={handleNext}>next</button> */}
            <CardList data={requestData} />
          </div>
        )
      )}
    </div>
  );
}
