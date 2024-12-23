"use server";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
const {
  createUser,
  findUserByCredentials,
  removeMovieFromWatchlist,
  getUserWatchlist,
  addMovieToWatchlist,
  isMovieInWatchList,
} = require("@/services/queries");

import { loginSchema } from "@/validation_schema/loginSchema";
import { registerSchema } from "@/validation_schema/registrationSchema";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

// authentication

export const registerUser = async (prevState, formData) => {
  const submission = parseWithZod(formData, {
    schema: registerSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }
  try {
    await createUser(submission.value);
  } catch (error) {
    console.log(error);
  }
  return redirect("/login");
};

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

export const setAuthCookie = (user, cookieStore) => {
  // const jwtToken = generateJwtToken(user); // Assuming this is your method to generate the token
  const jwtToken = jwt.sign(
    { id: user.id, email: user.email, name: user.firstName },
    SECRET_KEY,
    {
      expiresIn: "1h", // Set token expiry time (e.g., 1 hour)
    }
  );
  const cookie = serialize("auth_token", jwtToken, {
    path: "/",
    httpOnly: true, // Makes the cookie inaccessible via JavaScript (for security)
    secure: process.env.NODE_ENV === "production", // Secure cookie on production (HTTPS)
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  // Now set the cookie in the server response (cookieStore is passed in the server action)
  cookieStore.set("auth_token", cookie);
};

export const performLogin = async (prevState, credentials) => {
  const submission = parseWithZod(credentials, {
    schema: loginSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  console.log("submission value");
  console.log(submission.value);

  try {
    const user = await findUserByCredentials(submission.value);
    if (!user) {
      return { status: "error", message: "Invalid credentials" };
    }

    // Set the JWT token in the cookie after successful login
    const cookieStore = cookies(); // Access cookies object on the server side
    setAuthCookie(user, cookieStore); // Use a helper function to set the cookie

    // return user; // Return user data or other necessary info
  } catch (error) {
    return { status: "error", message: error.message };
  }
  redirect(submission.value.path);
};

export const authenticateUser = () => {
  // Get cookies from the request
  // const cookies = cookies();

  // Extract the cookie string value for auth_token
  const cookieValue = cookies().get("auth_token")?.value;
  // console.log(cookieValue);

  // Check if the token exists and is a valid string
  if (!cookieValue || typeof cookieValue !== "string") {
    // redirect("/login");
    return false;
    // throw new Error("Authentication token is missing or invalid");
  }

  // Now parse the cookie value to get the actual token (remove 'auth_token=' prefix)
  const token = cookieValue.split(";")[0].replace("auth_token=", "").trim(); // This will give you the token after the '='

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded; // Returns decoded user information
  } catch (error) {
    console.error(error);
    // throw new Error("Invalid or expired token");
  }
};

export const performLogout = () => {
  const cookieStore = cookies(); // Access cookies object on the server side

  // Clear the auth_token cookie
  cookieStore.set("auth_token", "", {
    path: "/",
    expires: new Date(0), // Set expiration to a past date to clear the cookie
    httpOnly: true, // Secure the cookie
  });

  // Redirect the user to the login page or another appropriate location
  // redirect("/login");
};

// watchlist

export const addToWatchlist = async (userId, movie) => {
  try {
    const addedMovie = await addMovieToWatchlist(userId, movie);
    console.log("Added to watchlist:", addedMovie);
    revalidatePath(`/movie/${movie?.id}`);
    return addedMovie.toObject();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const fetchWatchlist = async (userId) => {
  try {
    const watchlist = await getUserWatchlist(userId);
    // console.log("User Watchlist:", watchlist);
    return watchlist;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const removeFromWatchlist = async (userId, movieId) => {
  try {
    const removedMovie = await removeMovieFromWatchlist(userId, movieId);
    console.log("Removed from watchlist:", removedMovie);
    revalidatePath("/watch_list");
    return removedMovie.toObject();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const checkWatchList = async (userId, movieId) => {
  if (userId) {
    const isAvailable = await isMovieInWatchList(userId, movieId);
    // console.log(isAvailable);
    return isAvailable ? true : false;
  }

  return false;
};
