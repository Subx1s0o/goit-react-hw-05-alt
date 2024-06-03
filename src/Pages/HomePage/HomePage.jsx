import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardList from "../../Components/CardList/CardList";
import { mainH, active, button, btns } from "./homePage.module.css"; // Додайте стилі для кнопок тут
import Loader from "../../Components/Loader/Loader";

export default function HomePage({
  loading,
  requestData,
  setRequestData,
  isActive,
  setIsActive,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    // Оновлення стану `chosenData` при переході на головну сторінку
    setRequestData({
      key: "trendingWeek",
      id: null,
      page: 1,
    });
  }, [navigate, setRequestData]);

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

      {loading ? <Loader /> : <CardList data={requestData} />}
    </div>
  );
}
