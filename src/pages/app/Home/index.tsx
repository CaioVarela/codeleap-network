import { useState, useEffect, useCallback, useRef } from 'react';
import { PostForm, PostItem, DeletePostModal } from '../../../components/posts';
import { SearchBar, LoadingSpinner } from '../../../components/common';
import { Post, PostQueryParams } from '../../../types/posts';
import postService from '../../../services/postService';
import { X, RefreshCw } from 'lucide-react';
import useReward from '../../../hooks/useReward';
import { motion } from 'framer-motion';

export function Home() {
  const username = localStorage.getItem('username') || 'Anonymous';
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userPostCount, setUserPostCount] = useState(0);

  const [authorFilter, setAuthorFilter] = useState('');
  const [filterByUser, setFilterByUser] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);

  const { reward: createReward } = useReward('createPostReward', 'confetti');
  const { reward: deleteReward } = useReward('deletePostReward', 'emoji');

  const isFirstMount = useRef(true);
  const prevUserPostCountRef = useRef(userPostCount);

  const createRewardRef = useRef(createReward);
  const deleteRewardRef = useRef(deleteReward);

  useEffect(() => {
    createRewardRef.current = createReward;
    deleteRewardRef.current = deleteReward;
  }, [createReward, deleteReward]);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const queryParams: PostQueryParams = {};

      if (filterByUser) {
        queryParams.username = username;
      } else if (authorFilter) {
        queryParams.username = authorFilter;
      }

      const response = await postService.getPosts(queryParams);
      setPosts(response.results);

      const userPosts = response.results.filter(
        (post) => post.username === username,
      );
      const newUserPostCount = userPosts.length;

      prevUserPostCountRef.current = newUserPostCount;
      setUserPostCount(newUserPostCount);
      setError(null);
    } catch (err) {
      setError('Could not load posts. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [filterByUser, authorFilter, username]);

  useEffect(() => {
    if (isFirstMount.current) {
      fetchPosts();
      isFirstMount.current = false;
    }
  }, []);

  useEffect(() => {
    if (!isFirstMount.current) {
      fetchPosts();
    }
  }, [filterByUser, authorFilter, fetchPosts]);

  const handleAuthorFilter = (author: string) => {
    setAuthorFilter(author);
    if (author && author !== username) {
      setFilterByUser(false);
    }
  };

  const toggleFilterByUser = () => {
    setFilterByUser(!filterByUser);
    if (!filterByUser) {
      setAuthorFilter('');
    }
  };

  const handleCreatePost = async (
    title: string,
    content: string,
  ): Promise<void> => {
    try {
      await postService.createPost({
        username,
        title,
        content,
      });

      await fetchPosts();
      if (createRewardRef.current) {
        createRewardRef.current();
      }
    } catch (err) {
      setError('Could not create post. Please try again later.');
      throw err;
    }
  };

  const handleEditPost = (id: number) => {
    const postToEdit = posts.find((post) => post.id === id);
    if (postToEdit) {
      setCurrentPost(postToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEdit = async (
    title: string,
    content: string,
    id?: number,
  ): Promise<void> => {
    if (id) {
      try {
        await postService.updatePost(id, { title, content });
        await fetchPosts();
        setIsEditModalOpen(false);
      } catch (err) {
        setError('Could not update post. Please try again later.');
        throw err;
      }
    }
  };

  const handleDeletePost = (id: number) => {
    setPostToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (id: number): Promise<void> => {
    try {
      await postService.deletePost(id);
      if (deleteRewardRef.current) {
        deleteRewardRef.current();
      }
      await fetchPosts();
    } catch (err) {
      setError('Could not delete post. Please try again later.');
      throw err;
    }
  };

  const handleRefresh = () => {
    fetchPosts();
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#DDDDDD]">
      <div
        id="createPostReward"
        className="fixed top-0 right-0 left-0 z-[1000] flex justify-center"
      />

      <div className="flex w-full max-w-[800px] flex-col">
        <header className="flex h-[80px] w-full items-center justify-between bg-[#7695EC] px-6">
          <h1 className="text-[22px] leading-[100%] font-bold text-white">
            CodeLeap Network
          </h1>
          <motion.button
            onClick={handleRefresh}
            className="rounded-full p-2 text-white"
            title="Refresh posts"
            whileHover={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw size={20} />
          </motion.button>
        </header>

        <main className="min-h-[1080px] w-full bg-[#FFFFFF] p-6">
          <PostForm mode="create" onSubmit={handleCreatePost} />

          <div className="mb-6 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <SearchBar
                onSearch={handleAuthorFilter}
                placeholder="Author name..."
                label="Search posts by author"
                value={authorFilter}
                className="w-full"
              />

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={filterByUser}
                  onChange={toggleFilterByUser}
                  className="rounded text-[#7695EC] focus:ring-[#7695EC]"
                  disabled={!!authorFilter && authorFilter !== username}
                />
                <span className="text-[14px] leading-[100%]">
                  Show only my posts
                </span>
              </label>
            </div>
          </div>

          {(authorFilter || filterByUser) && (
            <div className="mb-4 rounded-lg bg-gray-100 p-4">
              <h3 className="mb-2 font-medium">Active filters:</h3>
              <div className="flex flex-wrap gap-2">
                {authorFilter && (
                  <div className="flex items-center rounded-full bg-[#7695EC]/10 px-3 py-1 text-sm">
                    <span>Author: {authorFilter}</span>
                    <button
                      onClick={() => handleAuthorFilter('')}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                      aria-label="Remove author filter"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                {filterByUser && (
                  <div className="flex items-center rounded-full bg-[#7695EC]/10 px-3 py-1 text-sm">
                    <span>Only my posts</span>
                    <button
                      onClick={() => setFilterByUser(false)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                      aria-label="Remove own posts filter"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          <div
            id="deletePostReward"
            className="pointer-events-none fixed top-0 left-0 z-[1000] opacity-0"
          />

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <LoadingSpinner size="large" />
              <p className="mt-4 text-[#777777]">Loading posts...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center p-8 text-red-500">
              <p>{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex justify-center p-8">
              <p>No posts found.</p>
            </div>
          ) : (
            <>
              {posts.map((post, index) => (
                <PostItem
                  key={post.id}
                  post={post}
                  currentUsername={username}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                  animationDelay={index}
                />
              ))}
            </>
          )}
        </main>
      </div>

      <PostForm
        mode="edit"
        isModal={true}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        post={currentPost}
        onSubmit={handleSaveEdit}
      />

      <DeletePostModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        postId={postToDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
