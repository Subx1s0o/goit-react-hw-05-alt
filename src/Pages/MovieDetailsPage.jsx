import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function MovieDetailsPage({ setRequestData }) {
  const { movieId } = useParams();

  useEffect(() => {
    if (movieId) {
      setRequestData({ key: "movie", id: movieId, page: 1 });
    }
  }, [movieId, setRequestData]);

  return <div>Movie ID: {movieId}</div>;
}
