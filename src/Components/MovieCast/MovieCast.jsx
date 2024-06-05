import MovieCastItem from "../MovieCastItem/MovieCastItem";

export default function MovieCast({ data }) {
  return (
    <ul>
      {!data ? (
        <p>Sorry we don`t have data :/</p>
      ) : (
        data.map(({ cast_id, character, profile_path, name }) => {
          return (
            <MovieCastItem
              key={cast_id}
              character={character}
              name={name}
              poster={profile_path}
            />
          );
        })
      )}
    </ul>
  );
}
