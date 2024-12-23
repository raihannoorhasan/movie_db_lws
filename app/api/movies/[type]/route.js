import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { type } = params;

  let URL = `${process.env.TMDB_API_BASE_URL}/${type}`;

  if (type === "trending") {
    URL = "https://api.themoviedb.org/3/trending/movie/week";
  }

  const options = {
    headers: {
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(URL, options);

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
