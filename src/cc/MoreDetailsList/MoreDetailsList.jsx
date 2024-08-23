import MovieCast from "../MovieCast/MovieCast";
import MovieReviews from "../MovieReviews/MovieReviews";

const MoreDetailsList = ({ data, dataType }) => {
  return (
    <div>
      {dataType === "cast" && <MovieCast data={data} />}
      {dataType === "reviews" && <MovieReviews data={data} />}
    </div>
  );
};

export default MoreDetailsList;
