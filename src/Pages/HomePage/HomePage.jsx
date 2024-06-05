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
  dayPage,
  setDayPage,
  weekPage,
  setWeekPage,
  maxPage,
}) {
  useEffect(() => {
    const currentPage = isActive === "trendingWeek" ? weekPage : dayPage;
    setRequestData({
      key: isActive,
      id: null,
      page: currentPage,
    });
  }, [isActive, weekPage, dayPage, setRequestData]);

  const handlePrevPage = () => {
    if (isActive === "trendingWeek" && weekPage > 1) {
      setWeekPage(weekPage - 1);
    } else if (isActive === "trendingDay" && dayPage > 1) {
      setDayPage(dayPage - 1);
    }
  };

  const handleNextPage = () => {
    if (isActive === "trendingWeek" && weekPage < maxPage) {
      setWeekPage(weekPage + 1);
    } else if (isActive === "trendingDay" && dayPage < maxPage) {
      setDayPage(dayPage + 1);
    }
  };

  return (
    <div className="content">
      <h1 className={mainH}>Trending</h1>

      <div className={btns}>
        <button
          className={`${button} ${isActive === "trendingWeek" ? active : ""}`}
          onClick={() => {
            setIsActive("trendingWeek");
          }}
        >
          TrendingWeek
        </button>
        <button
          className={`${button} ${isActive === "trendingDay" ? active : ""}`}
          onClick={() => {
            setIsActive("trendingDay");
          }}
        >
          TrendingDay
        </button>

        <button onClick={handlePrevPage}> prev </button>
        <button onClick={handleNextPage}> next </button>
      </div>
      {loading && <Loader />}
      {!loading && Array.isArray(requestData) && (
        <CardList data={requestData} />
      )}
    </div>
  );
}
