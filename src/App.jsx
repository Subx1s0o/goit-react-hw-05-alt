import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import axios from "axios";
import Header from "./Components/Header/Header";
import Loader from "./Components/Loader/Loader";
import getApiRequest from "./tmdb-api";
import "./css/App.css";

const Home = lazy(() => import("./Pages/HomePage/HomePage"));
const Movies = lazy(() => import("./Pages/MoviesPage"));
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
  const [isActive, setIsActive] = useState("trendingWeek");
  const [maxPage, setMaxPage] = useState(null);
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
            <Route path="/movies" element={<Movies />} />
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
