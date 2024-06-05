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
    <li
      style={{
        opacity: imageLoaded ? 1 : 0,
        transition: "opacity 0.2s ease-in-out",
      }}
      className={card_li}
    >
      <Link to={`movies/${id}`} state={location}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          onLoad={handleImageLoad}
          style={{ display: "block", width: "100%", height: "auto" }}
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
