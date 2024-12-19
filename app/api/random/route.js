// https://api.themoviedb.org/3/movie/{movie_id}/credits

//api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=vote_average.desc&vote_count.gte=1000&page=1`
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&sort_by=vote_average.desc&vote_count.gte=1000&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch random movie.` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      // 2. Randomly select a movie
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomMovie = data.results[randomIndex];

      // 3. Fetch recommendations for the selected movie
      const recResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${randomMovie.id}/video`
      );
      const recData = await recResponse.json();

      // 4. Return the random movie or one of its recommendations
      const result =
        recData.results?.length > 0
          ? recData.results[0] // First recommended movie
          : randomMovie; // Original random movie
      return NextResponse.json({ ...result });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}
