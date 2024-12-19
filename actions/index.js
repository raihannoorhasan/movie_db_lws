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

export const registerUser = async (formData) => {
  const user = {};
  user.firstName = formData.get("firstName");
  user.lastName = formData.get("lastName");
  user.email = formData.get("email");
  user.password = formData.get("password");

  const created = await createUser(user);

  console.log(created);

  // redirect("/login");
};

// export const performLogin = async (credential) => {
//   try {
//     // const credential = {};
//     // credential.email = formData.get("email");
//     // credential.password = formData.get("password");
//     const found = await findUserByCredentials(credential);
//     if (found) {
//       return found;
//     } else {
//       throw new Error("User with this credential is not found!");
//     }
//   } catch (error) {
//     throw error;
//   }
// };

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
    console.log(isAvailable);
    return isAvailable ? true : false;
  }

  return false;
};

// // new feature is implementing...

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

// Helper function to set the JWT token in the cookies
// const setAuthCookie = (user, res) => {
//   const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
//     expiresIn: "1h", // Set token expiry time (e.g., 1 hour)
//   });

//   // Set the token in the response header as HttpOnly cookie
//   res.setHeader(
//     "Set-Cookie",
//     cookie.serialize("auth_token", token, {
//       httpOnly: true, // Prevent JavaScript access
//       secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//       sameSite: "Strict", // Prevent CSRF
//       maxAge: 3600, // 1 hour expiration
//       path: "/",
//     })
//   );
// };

export const setAuthCookie = (user, cookieStore) => {
  // const jwtToken = generateJwtToken(user); // Assuming this is your method to generate the token
  const jwtToken = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h", // Set token expiry time (e.g., 1 hour)
  });
  const cookie = serialize("auth_token", jwtToken, {
    path: "/",
    httpOnly: true, // Makes the cookie inaccessible via JavaScript (for security)
    secure: process.env.NODE_ENV === "production", // Secure cookie on production (HTTPS)
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  // Now set the cookie in the server response (cookieStore is passed in the server action)
  cookieStore.set("auth_token", cookie);
};

// export const performLogin = async (credentials, res) => {
//   try {
//     const user = await findUserByCredentials(credentials);
//     if (!user) {
//       throw new Error("Invalid credentials");
//     }

//     // Set the JWT token in the cookie after successful login
//     setAuthCookie(user, res);

//     return user; // Return user details or other necessary data
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

export const performLogin = async (credentials) => {
  try {
    const user = await findUserByCredentials(credentials);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Set the JWT token in the cookie after successful login
    const cookieStore = cookies(); // Access cookies object on the server side
    setAuthCookie(user, cookieStore); // Use a helper function to set the cookie

    return user; // Return user data or other necessary info
  } catch (error) {
    // throw new Error(error.message);
    console.log(error);
  }
};

// export const authenticateUser = (req) => {
//   // const cookies = cookies();
//   const token = cookies().get("auth_token");

//   console.log(token);

//   if (!token) {
//     throw new Error("Authentication token is missing");
//   }

//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     return decoded; // Returns decoded user information
//   } catch (error) {
//     // throw new Error("Invalid or expired token");
//     console.log(error);
//   }
// };

// Example usage in a server action

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

// export const getUserData = async (req) => {
//   try {
//     const user = authenticateUser(req);
//     return user; // Return user data
//   } catch (error) {
//     throw new Error("User authentication failed");
//   }
// };
