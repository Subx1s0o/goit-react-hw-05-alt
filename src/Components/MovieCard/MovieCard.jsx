import { useState } from "react";
import { card_title, card_li, card_info } from "./movieCard.module.css";
import { Link } from "react-router-dom";
export default function MovieCard({ poster_path, title, id }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "placeholder-image-url";

  return (
    <li
      style={{
        opacity: imageLoaded ? 1 : 0,
        transition: "opacity 0.2s ease-in-out",
      }}
      className={card_li}
    >
      <Link to={`movie/${id}`}>
        <img
          src={imageUrl}
          alt={title}
          onLoad={() => setImageLoaded(true)}
          style={{ display: "block", width: "100%", height: "auto" }}
        />
        <div className={card_info}>
          <p className={card_title}>{title}</p>
        </div>
      </Link>
    </li>
  );
}
