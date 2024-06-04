import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import styles from "./movieDetailsPage.module.css";
import useImageLoaded from "../../Hooks/useImageLoaded";

export default function MovieDetailsPage({ setRequestData, requestData }) {
  const { movieId } = useParams();
  const location = useLocation();
  const { imageLoaded, handleImageLoad } = useImageLoaded();

  useEffect(() => {
    if (movieId) {
      setRequestData({ key: "movie", id: movieId, page: 1 });
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

  return (
    <>
      {requestData ? (
        <>
          <Link
            style={{
              color: "white",
              fontSize: "20px",
              marginTop: "20px",
              display: "block",
            }}
            to={location.state}
          >
            Go back
          </Link>
          <div
            className={styles.image}
            style={{
              backgroundImage:
                backdrop_path && imageLoaded ? (
                  `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdrop_path})`
                ) : (
                  <Loader />
                ),
              opacity: imageLoaded ? 1 : 0,
              transition: "opacity 0.2s ease-in-out",
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

              {vote_average && <p>{vote_average}</p>}
            </div>
          </div>
          {/* <button
            onClick={() =>
              setRequestData({ key: "movieCast", id: movieId, page: 1 })
            }
          >
            cast
          </button> */}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
