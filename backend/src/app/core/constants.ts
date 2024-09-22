export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const JWT_EXPIRES_IN = process.env.JWT_SECRET || "1h";
export const PORT = process.env.PORT || 3000;
export const API_KEY =
  process.env.API_KEY ||
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTc5NTc3NzY2NGJiNGZlYTMyYzllYjNmMDkzNzgxZiIsIm5iZiI6MTcyNjk2MDQ2MC4xMjc4NzUsInN1YiI6IjY2ZWY1MjIxYTgyYjAwNTcwMzI2MWRmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Oa7JXznSCSwYebylRNs8LwKgPtIb6g9Fq-zBKPoDEEc";
export const API_URL = process.env.API_URL || "https://api.themoviedb.org/3";
export const USE_LOCAL_DATA = true;
