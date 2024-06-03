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
const MovieDetails = lazy(() => import("./Pages/MovieDetailsPage"));
const NotFound = lazy(() => import("./Pages/NotFoundPage"));

function App() {
  const [chosenData, setChosenData] = useState({
    key: "trendingWeek",
    id: null,
    page: 1,
  });
  const [requestData, setRequestData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState("trendingWeek");

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
        const data = response.data.results;
        setRequestData(data);
        console.log(data);
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
              path="/movie/:movieId"
              element={<MovieDetails setRequestData={setChosenData} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
