// https://api.themoviedb.org/3/movie/{movie_id}/credits

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { movie_id } = params;

  try {
    const response = await fetch(
      `${process.env.TMDB_API_BASE_URL}/${movie_id}/credits`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch ${type} movies.` },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}
