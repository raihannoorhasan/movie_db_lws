import { Suspense } from "react";
import Loader from "../common/Loader";
import TypedMovieSection from "./TypedMovieSection";

export default function MoviesSection() {
  const types = ["trending", "popular", "top_rated"];
  return (
    <div className="container mx-auto px-4 py-8">
      {types.map((type) => (
        <Suspense
          key={type}
          fallback={<Loader text={`Loading the ${type} movies...`} />}
        >
          <TypedMovieSection key={type} type={type} />
        </Suspense>
      ))}
    </div>
  );
}
