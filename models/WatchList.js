import mongoose from "mongoose";

const WatchlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Reference to the User model
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  posterPath: {
    type: String,
  },
  releaseDate: {
    type: Date,
    default: Date.now,
  },
});

const WatchlistModel =
  mongoose.models.watchlists || mongoose.model("watchlists", WatchlistSchema);

export default WatchlistModel;
