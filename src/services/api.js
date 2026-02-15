import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p';

export const IMAGE_SIZES = {
    poster: `${IMG_BASE}/w500`,
    backdrop: `${IMG_BASE}/original`,
    posterSmall: `${IMG_BASE}/w342`,
    profile: `${IMG_BASE}/w185`,
};

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: 'en-US',
    },
});

export const getTrending = async (page = 1) => {
    const { data } = await api.get('/trending/movie/week', { params: { page } });
    return data;
};

export const getPopular = async (page = 1) => {
    const { data } = await api.get('/movie/popular', { params: { page } });
    return data;
};

export const getNowPlaying = async (page = 1) => {
    const { data } = await api.get('/movie/now_playing', { params: { page } });
    return data;
};

export const getTopRated = async (page = 1) => {
    const { data } = await api.get('/movie/top_rated', { params: { page } });
    return data;
};

export const getMovieDetail = async (id) => {
    const { data } = await api.get(`/movie/${id}`);
    return data;
};

export const getMovieCredits = async (id) => {
    const { data } = await api.get(`/movie/${id}/credits`);
    return data;
};

export const getMovieTrailers = async (id) => {
    const { data } = await api.get(`/movie/${id}/videos`);
    return data.results.filter(
        (v) => v.site === 'YouTube' && v.type === 'Trailer'
    );
};

export const getSimilarMovies = async (id) => {
    const { data } = await api.get(`/movie/${id}/similar`);
    return data;
};

export const searchMovies = async (query, page = 1) => {
    const { data } = await api.get('/search/movie', {
        params: { query, page },
    });
    return data;
};

export const getGenres = async () => {
    const { data } = await api.get('/genre/movie/list');
    return data.genres;
};

export const getMoviesByGenre = async (genreId, page = 1) => {
    const { data } = await api.get('/discover/movie', {
        params: {
            with_genres: genreId,
            sort_by: 'popularity.desc',
            page,
        },
    });
    return data;
};

export default api;
