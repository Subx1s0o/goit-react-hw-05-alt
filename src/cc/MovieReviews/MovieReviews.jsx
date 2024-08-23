import MovieReviewItem from "../MovieReviewsItem/MovieReviewItem";

export default function MovieReviews({ data }) {
  console.log(data);
  return (
    <ul>
      {data.length !== 0 ? (
        data.map(
          ({
            id,
            content,
            created_at,
            author_details: { name, username, avatar_path, rating },
          }) => {
            return (
              <MovieReviewItem
                key={id}
                name={name}
                username={username}
                text={content}
                avatar={avatar_path}
                rating={rating}
                time={created_at}
              />
            );
          }
        )
      ) : (
        <p style={{ color: "white" }}>We don`t have any reviews on this film</p>
      )}
    </ul>
  );
}
