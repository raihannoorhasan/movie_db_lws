export const getMoviesByType = async (type) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/movies/${type}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch movies for category: ${type}`);
      return;
    }
    if (response.status === 200) {
      const data = await response.json();
      return data?.results;
    }
  } catch (error) {
    console.log(error.message);
    return;
  }
};

export const getMovieById = async (movieId) => {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/movie/${movieId}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch movie with id - ${movieId}`);
      return;
    }
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error.message);
    return;
  }
};

export const getSimilarMovies = async (movieId) => {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/movie/${movieId}/similar`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch movie with id - ${movieId}`);
      return;
    }
    if (response.status === 200) {
      const data = await response.json();
      return data?.results;
    }
  } catch (error) {
    console.log(error.message);
    return;
  }
};
