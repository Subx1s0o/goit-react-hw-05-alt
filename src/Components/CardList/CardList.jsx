import MovieCard from "../MovieCard/MovieCard";
import { cards_ul } from "./CardList.module.css";

export default function CardList({ data }) {
  return (
    <ul className={cards_ul}>
      {data.map((item) => (
        <MovieCard key={item.id} {...item} />
      ))}
    </ul>
  );
}
