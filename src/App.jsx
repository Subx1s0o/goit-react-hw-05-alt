import "./css/App.css";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import MovieCast from "./Components/MovieCast/MovieCast";
import MovieReviews from "./Components/MovieReviews/MovieReviews";
import Loader from "./Components/Loader/Loader";

function App() {
  const Home = lazy(() => import("./Pages/HomePage/HomePage"));
  const Movies = lazy(() => import("./Pages/MoviesPage"));
  const MovieDetails = lazy(() => import("./Pages/MovieDetailsPage"));
  const NotFound = lazy(() => import("./Pages/NotFoundPage"));
  return (
    <>
      <Header />
      <div className="container">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies:movieId" element={<MovieDetails />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
