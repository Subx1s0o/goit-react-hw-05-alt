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
}) {
  useEffect(() => {
    setRequestData({
      key: "trendingWeek",
      id: null,
      page: 1,
    });
  }, [setRequestData]);

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
              page: 1,
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
              page: 1,
            });
          }}
        >
          TrendingDay
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : Array.isArray(requestData) ? (
        <CardList data={requestData} />
      ) : null}
    </div>
  );
}
