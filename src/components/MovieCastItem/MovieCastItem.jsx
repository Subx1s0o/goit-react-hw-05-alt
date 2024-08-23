import useImageLoaded from "../../Hooks/useImageLoaded";

export default function MovieCastItem({ name, poster, character }) {
  const { imageLoaded, handleImageLoad } = useImageLoaded();
  return (
    <li>
      <div
        className=""
        style={{
          opacity: imageLoaded ? 1 : 0,
          transition: "opacity 0.2s ease-in-out",
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w200/${poster}`}
          alt={name}
          onLoad={handleImageLoad}
        />
        <h2>{name}</h2>
        <p>{character}</p>
      </div>
    </li>
  );
}
