import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import MoreDetailsList from "../../components/MoreDetailsList/MoreDetailsList";
import useImageLoaded from "../../Hooks/useImageLoaded";
import getApiRequest from "../../tmdb-api";
import formatVoteAverage from "../../utils";
import styles from "./movieDetailsPage.module.css";

export default function MovieDetailsPage({ setRequestData, requestData }) {
  const { movieId } = useParams();
  const location = useLocation();
  const { imageLoaded, handleImageLoad } = useImageLoaded();
  const [chosenData, setChosenData] = useState(null);
  const [dataType, setDataType] = useState("");
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  useEffect(() => {
    if (movieId) {
      setRequestData({ key: "movie", id: movieId });
    }
  }, [movieId, setRequestData]);

  const {
    title,
    release_date,
    overview,
    backdrop_path,
    poster_path,
    status,
    genres,
    production_countries,
    vote_average,
  } = requestData || {};

  const fetchMovieCast = async () => {
    try {
      const requestOptions = getApiRequest("movieCast", movieId);
      const response = await axios(requestOptions);
      setChosenData(response.data.cast);
      setDataType("cast");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMovieReviews = async () => {
    try {
      const requestOptions = getApiRequest("movieReviews", movieId);
      const response = await axios(requestOptions);
      setChosenData(response.data.results);
      setDataType("reviews");
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackClick = () => {
    navigate(from);
  };

  return (
    <>
      <button
        style={{
          color: "white",
          fontSize: "20px",
          marginTop: "20px",
          display: "block",
        }}
        onClick={handleBackClick}
      >
        Go back
      </button>
      {requestData ? (
        <>
          <div
            className={styles.image}
            style={{
              backgroundImage:
                backdrop_path &&
                `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdrop_path})`,
              opacity: imageLoaded ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            <div className={styles.contentDetails}>
              {poster_path && (
                <img
                  className={styles.poster}
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={title}
                  onLoad={handleImageLoad}
                />
              )}
              <h1>{title}</h1>
              <p>Release Date: {release_date}</p>
              {overview ? (
                <p>Overview: {overview} </p>
              ) : (
                <p>Don`t have overview</p>
              )}
              <p>{status}</p>
              {genres ? (
                genres.map(({ id, name }) => <p key={id}>{name}</p>)
              ) : (
                <p>genres not exists</p>
              )}
              {production_countries &&
                production_countries.map(({ name }, index) => (
                  <p key={index}>{name}</p>
                ))}
              {vote_average && <p>{formatVoteAverage(vote_average)}</p>}
            </div>
          </div>
          <button onClick={fetchMovieCast}>Load Cast</button>
          <button onClick={fetchMovieReviews}>Load Reviews</button>
          {chosenData && (
            <MoreDetailsList data={chosenData} dataType={dataType} />
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
