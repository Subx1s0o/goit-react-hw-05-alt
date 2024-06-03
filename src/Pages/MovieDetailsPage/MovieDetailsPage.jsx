import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import styles from "./movieDetailsPage.module.css";

export default function MovieDetailsPage({ setRequestData, requestData }) {
  const { movieId } = useParams();

  useEffect(() => {
    if (movieId) {
      setRequestData({ key: "movie", id: movieId, page: 1 });
    }
  }, [movieId, setRequestData]);

  const { original_title, release_date, overview, backdrop_path, poster_path } =
    requestData || {};

  return (
    <>
      {requestData ? (
        <>
          <a
            style={{
              color: "white",
              fontSize: "20px",
              marginTop: "20px",
              display: "block",
            }}
            href="/"
          >
            Go back
          </a>
          <div
            className={styles.image}
            style={{
              backgroundImage: backdrop_path
                ? `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdrop_path})`
                : "none",
            }}
          >
            <div className={styles.contentDetails}>
              {poster_path && (
                <img
                  className={styles.poster}
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={original_title}
                />
              )}
              <h1>{original_title}</h1>
              <p>Release Date: {release_date}</p>
              {overview ? (
                <p>Overview: {overview} </p>
              ) : (
                <p>Don`t have overview</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
