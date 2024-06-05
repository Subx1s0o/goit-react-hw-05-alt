export default function formatVoteAverage(vote_average) {
  const formatted = vote_average.toFixed(1);
  if (formatted.endsWith(".0")) {
    return vote_average.toFixed(0);
  } else {
    return formatted;
  }
}
