export interface Post {
  id: number;
  title: string;
  content: string;
  username: string;
  created_datetime: string;
}

export interface PostDTO {
  username: string;
  title: string;
  content: string;
}

export interface PostResponse {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}

export interface PaginatedResponse<T> {
  count: number;
  results: T[];
}

export interface PostQueryParams {
  username?: string;
}
