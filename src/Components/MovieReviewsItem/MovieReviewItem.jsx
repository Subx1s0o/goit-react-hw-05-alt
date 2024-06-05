export default function MovieReviewItem({
  name,
  username,
  text,
  avatar,
  rating,
  time,
}) {
  return (
    <li>
      <div className="">
        <div className="">
          <img
            src={
              avatar
                ? `https://media.themoviedb.org/t/p/w45_and_h45_face${avatar}`
                : "https://placehold.co/45x45"
            }
            alt={username}
          />
          <p>{text}</p>
        </div>
      </div>
    </li>
  );
}
