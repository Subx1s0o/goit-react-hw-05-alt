import { card_title, card_li, card_info } from "./movieCard.module.css";
import { Link, useLocation } from "react-router-dom";
import useImageLoaded from "../../Hooks/useImageLoaded";
import formatVoteAverage from "../../utils";


export default function MovieCard({
  poster_path,
  title,
  id,
  release_date,
  vote_average,
}) {
  const { imageLoaded, handleImageLoad } = useImageLoaded();
  const location = useLocation();

  return (
    <li className={card_li}>
      <Link to={`/movies/${id}`} state={{ from: location }}>
        <img
          src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : "https://placehold.co/600x850"}
          alt={title}
          onLoad={handleImageLoad}
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            opacity: imageLoaded ? 1 : 0, // Set opacity based on image loaded state
            transition: "opacity 0.5s ease-in-out", // Opacity transition
          }}
        />
        <div className={card_info}>
          <p className={card_title}>{title}</p>
          {release_date ? <p> {release_date.slice(0, 4)}</p> : null}
          {vote_average ? <p>{formatVoteAverage(vote_average)}</p> : null}
        </div>
      </Link>
    </li>
  );
}
