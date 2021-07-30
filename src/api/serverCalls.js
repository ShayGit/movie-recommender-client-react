import api from "./server";

export const validateTokenApi = async (token) =>
  await api.get("/api/auth/account/", {
    headers: { Authorization: `Bearer ${token}` },
  });

  export const refreshTokenApi = async (token) =>
  await api.post("/api/auth/token/refresh/", {
    refresh:token
  });

export const signinApi = async ({ username, password }) => {
  const res1 = await api.post("/api/auth/token/", {
    username,
    password,
  });
  const tokens = res1.data;
  const res2 = await api.get("/api/auth/account/", {
    headers: { Authorization: `Bearer ${tokens.access}` },
  });
  const data = {
    tokens,
    ...res2.data,
  };
  return data;
};

export const signupApi = async ({
  username,
  password,
  firstName,
  lastName,
  password2,
}) =>
  await api.post("/api/auth/signup/", {
    first_name: firstName,
    last_name: lastName,
    username,
    password,
    password2,
  });

export const fetchMoviesDataApi = async () => {
  const response = await api.get("/api/ratings/");
  const moviesRated = response.data;

  const response2 = await api.get("/api/movies/recommend/");
  const moviesRecommendation = response2.data.map((item) => ({
    movie: { ...item },
  }));
  return { moviesRated, moviesRecommendation };
};

export const searchMoviesApi = async (searchPhrase, page) =>
  await api.get(`/api/movies?title=${searchPhrase}&page=${page}`);

export const setOrUpdateRatingApi = async ({
  ratingId,
  movieId,
  rating,
  isRated,
}) => {
  if (isRated) {
    await api.put(`/api/ratings/${ratingId}/`, {
      movie: movieId,
      rating: rating,
    });
  } else {
    await api.post(`/api/ratings/`, { movie: movieId, rating: rating });
  }
};

export const deleteRatingApi = async (ratingId) =>
  await api.delete(`/api/ratings/${ratingId}/`);
