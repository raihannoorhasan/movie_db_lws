import TypedMovieSection from "./TypedMovieSection";

export default function MoviesSection() {
  const types = ["trending", "popular", "top_rated"];
  return (
    <div className="container mx-auto px-4 py-8">
      {types.map((type) => (
        <TypedMovieSection key={type} type={type} />
      ))}
    </div>
  );
}
