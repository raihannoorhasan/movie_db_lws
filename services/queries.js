import UserModel from "@/models/Users";
import WatchlistModel from "@/models/WatchList";
import { replaceMongoIdInObject } from "@/utils/mongoData-utils";
import connectMongo from "./connectMongo";

export const createUser = async (user) => {
  await connectMongo();
  return await UserModel.create(user);
};

export const findUserByCredentials = async (credentials) => {
  await connectMongo();
  const user = await UserModel.findOne(credentials).lean();
  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
};

// Add a movie to the watchlist
export const addMovieToWatchlist = async (userId, movie) => {
  await connectMongo();
  try {
    // Check if the movie already exists in the user's watchlist
    // const existingMovie = await WatchlistModel.findOne({
    //   userId,
    //   movieId: movie.id,
    // });

    const existingMovie = await isMovieInWatchList(userId, movie.id);

    if (existingMovie) {
      throw new Error("MOVIE_ALREADY_EXISTS");
    }

    // Add the movie to the watchlist
    const newWatchlistItem = await WatchlistModel.create({
      userId,
      movieId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.releaseDate,
    });

    return newWatchlistItem;
  } catch (error) {
    if (error.message === "MOVIE_ALREADY_EXISTS") {
      throw error; // Custom error for duplicates
    }
    console.error("Database Error:", error);
    throw new Error("INTERNAL_SERVER_ERROR");
  }
};

// check the movie is already in db
export const isMovieInWatchList = async (userId, movieId) => {
  await connectMongo();
  // Check if the movie already exists in the user's watchlist
  return await WatchlistModel.findOne({
    userId,
    movieId,
  });
};

// Fetch all movies in a user's watchlist
export const getUserWatchlist = async (userId) => {
  await connectMongo();
  try {
    const watchlist = await WatchlistModel.find({ userId }).lean();
    return watchlist;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Remove a movie from the user's watchlist
export const removeMovieFromWatchlist = async (userId, movieId) => {
  await connectMongo();
  try {
    const result = await WatchlistModel.findOneAndDelete({
      userId,
      movieId,
    });

    if (!result) {
      throw new Error("Movie not found in watchlist");
    }

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
