import { useParams, Link } from "react-router-dom";
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
          <Link to="/">Go back</Link>
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
              <p>Overview: {overview}</p>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
