import api from './api';
import {
  PostDTO,
  PostResponse,
  PaginatedResponse,
  PostQueryParams,
} from '../types/posts';

const postService = {
  getPosts: async (
    params: PostQueryParams = {},
  ): Promise<PaginatedResponse<PostResponse>> => {
    const { username } = params;
    const queryParams: Record<string, any> = {};

    if (username) {
      queryParams.username = username;
    }

    const response = await api.get('', { params: queryParams });
    return response.data;
  },

  createPost: async (postData: PostDTO): Promise<PostResponse> => {
    const response = await api.post('', postData);
    return response.data;
  },

  updatePost: async (
    id: number,
    postData: Omit<PostDTO, 'username'>,
  ): Promise<PostResponse> => {
    const response = await api.patch(`${id}/`, {
      title: postData.title,
      content: postData.content,
    });
    return response.data;
  },

  deletePost: async (id: number): Promise<void> => {
    await api.delete(`${id}/`);
  },
};

export default postService;
