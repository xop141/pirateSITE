export type Movie ={
    runtime: number
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    genres: { id: number; name: string }[];
    name: string;
    length: number
}
export type CrewMember = {
    id: number;
    name: string;
    job: string;
    known_for_department: string;
    department: string;
    popularity: number
  };