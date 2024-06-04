import { useEffect } from "react";
import CardList from "../../Components/CardList/CardList";
import { mainH, active, button, btns } from "./homePage.module.css";
import Loader from "../../Components/Loader/Loader";

export default function HomePage({
  loading,
  requestData,
  setRequestData,
  isActive,
  setIsActive,
  page,
  setPage,
  maxPage,
}) {
  useEffect(() => {
    setRequestData({
      key: "trendingWeek",
      id: null,
      page: page,
    });
  }, [setRequestData, page]);

  return (
    <div className="content">
      <h1 className={mainH}>Trending</h1>

      <div className={btns}>
        <button
          className={`${button} ${isActive === "trendingWeek" ? active : ""}`}
          onClick={() => {
            setIsActive("trendingWeek");
            setRequestData({
              key: "trendingWeek",
              id: null,
              page: page,
            });
          }}
        >
          TrendingWeek
        </button>
        <button
          className={`${button} ${isActive === "trendingDay" ? active : ""}`}
          onClick={() => {
            setIsActive("trendingDay");
            setRequestData({
              key: "trendingDay",
              id: null,
              page: page,
            });
          }}
        >
          TrendingDay
        </button>

        <button onClick={() => page > 1 && setPage(page - 1)}> prev </button>
        <button onClick={() => page <= maxPage && setPage(page + 1)}>
          next
        </button>
      </div>
      {loading && <Loader />}
      {!loading && Array.isArray(requestData) && (
        <CardList data={requestData} />
      )}
    </div>
  );
}
