const requestsURL = {
  trendingWeek: "https://api.themoviedb.org/3/trending/movie/week",
  trendingDay: "https://api.themoviedb.org/3/trending/movie/day",
  search: (query) => `https://api.themoviedb.org/3/search/movie?query=${query}`,
  movieDetail: (movie_id) => `https://api.themoviedb.org/3/movie/${movie_id}`,
  movieCast: (movie_id) =>
    `https://api.themoviedb.org/3/movie/${movie_id}/credits`,
  movieReviews: (movie_id) =>
    `https://api.themoviedb.org/3/movie/${movie_id}/reviews`,
};

const createRequestOptions = (url, page = 1) => ({
  method: "GET",
  url: url,
  params: { language: "en-US", page: page },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGIyNjE5NDA3NDY5OTMwNWIwYTcyMWVjNDgzZjk5OSIsInN1YiI6IjY2NDc5MGU3YjA5OGQ5MTYxNmI1MzkwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QRNQAwg2heopawZTBLStQ1mzjPrJ0LTGCfHKGd3Q7pU",
  },
});

const getApiRequest = (key, value = null, page = 1) => {
  let url;

  if (key === "movie" && value) {
    url = requestsURL.movieDetail(value);
  } else if (key === "search" && value) {
    url = requestsURL.search(value);
  } else if (key === "movieCast" && value) {
    url = requestsURL.movieCast(value);
  } else if (key === "movieReviews" && value) {
    url = requestsURL.movieReviews(value);
  } else if (requestsURL[key]) {
    url = requestsURL[key];
  } else {
    throw new Error("Invalid key or missing value for request");
  }

  return createRequestOptions(url, page);
};

export default getApiRequest;
