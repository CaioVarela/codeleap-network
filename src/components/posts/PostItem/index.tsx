import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Post } from '../../../types/posts/Post';
import { motion } from 'framer-motion';

interface PostItemProps {
  post: Post;
  currentUsername: string;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  animationDelay?: number;
}

export const PostItem: React.FC<PostItemProps> = ({
  post,
  currentUsername,
  onEdit,
  onDelete,
  animationDelay = 0,
}) => {
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const isCurrentUserPost = post.username === currentUsername;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: animationDelay * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
    hover: {
      scale: 1.01,
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 },
    },
  };

  const headerVariants = {
    hover: {
      backgroundColor: '#6384D9',
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="mx-auto mb-6 w-full max-w-[752px] overflow-hidden rounded-[16px] border-[1px] border-[#999999] bg-[#FFFFFF]"
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      layout
    >
      <motion.div
        className="flex min-h-[70px] items-center justify-between rounded-t-[16px] bg-[#7695EC] p-6"
        variants={headerVariants}
      >
        <motion.h3
          className="text-[22px] leading-[100%] font-bold text-white"
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 1 }}
        >
          {post.title}
        </motion.h3>
        {isCurrentUserPost && (
          <div className="ml-2 flex gap-4">
            <motion.button
              className="text-white"
              title="Edit"
              onClick={() => onEdit && onEdit(post.id)}
              whileHover={{ scale: 1.1, color: '#FFFFFF' }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit size={20} />
            </motion.button>
            <motion.button
              className="text-white"
              title="Delete"
              onClick={() => onDelete && onDelete(post.id)}
              whileHover={{ scale: 1.1, color: '#FFFFFF' }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 size={20} />
            </motion.button>
          </div>
        )}
      </motion.div>
      <motion.div
        className="p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: animationDelay * 0.1 + 0.1 }}
      >
        <div className="mb-4 flex flex-wrap justify-between gap-2">
          <motion.span
            className="text-[18px] leading-[100%] font-bold text-[#777777]"
            whileHover={{ color: '#6384D9' }}
          >
            @{post.username}
          </motion.span>
          <span className="text-[18px] leading-[100%] text-[#777777]">
            {timeAgo(post.created_datetime)}
          </span>
        </div>
        <motion.p
          className="w-full max-w-[704px] text-[18px] leading-[100%] font-normal"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ delay: animationDelay * 0.1 + 0.2 }}
        >
          {post.content}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default PostItem;
