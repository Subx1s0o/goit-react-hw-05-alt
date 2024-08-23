import axios from "axios";
import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./cc/Header/Header";
import Loader from "./cc/Loader/Loader";
import "./css/App.css";
import getApiRequest from "./tmdb-api";

const Home = lazy(() => import("./Pages/HomePage/HomePage"));
const Movies = lazy(() => import("./Pages/MoviesPage/MoviesPage"));
const MovieDetails = lazy(() =>
  import("./Pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFound = lazy(() => import("./Pages/NotFoundPage"));

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [chosenData, setChosenData] = useState({
    key: "trendingWeek",
    id: null,
    page: currentPage,
  });
  const [requestData, setRequestData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [maxPage, setMaxPage] = useState(null);
  const [searchPage, setSearchPage] = useState(1);
  const [searchData, setSearchData] = useState(null);
  const [isActive, setIsActive] = useState("trendingWeek");
  const [weekPage, setWeekPage] = useState(1);
  const [dayPage, setDayPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const requestOptions = getApiRequest(
          chosenData.key,
          chosenData.id,
          chosenData.page
        );
        const response = await axios(requestOptions);

        let data;

        if (
          chosenData.key === "trendingWeek" ||
          chosenData.key === "trendingDay"
        ) {
          data = response.data.results;
          const maxResponsePage = response.data.total_pages;
          setMaxPage(maxResponsePage);
          setRequestData(data);
        } else {
          data = response.data;
          setRequestData(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [chosenData]);

  const searchFilmData = async (query) => {
    try {
      setLoading(true);
      const requestOptions = getApiRequest("search", query, searchPage);
      const response = await axios(requestOptions);
      setSearchData(response.data.results);
      const maxResponsePage = response.data.total_pages;
      setMaxPage(maxResponsePage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  weekPage={weekPage}
                  setWeekPage={setWeekPage}
                  dayPage={dayPage}
                  setDayPage={setDayPage}
                  maxPage={maxPage}
                  page={currentPage}
                  setPage={setCurrentPage}
                  loading={loading}
                  requestData={requestData}
                  setRequestData={setChosenData}
                  isActive={isActive}
                  setIsActive={setIsActive}
                />
              }
            />
            <Route
              path="/movies"
              element={
                <Movies
                  requestData={searchData}
                  searchFilmData={searchFilmData}
                  maxPage={maxPage}
                  searchPage={searchPage}
                  setSearchPage={setSearchPage}
                  setLoading={setLoading}
                />
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <MovieDetails
                  setRequestData={setChosenData}
                  requestData={requestData}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
