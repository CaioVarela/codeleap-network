import React, { useState, useEffect } from 'react';
import Button from '../../common/Button';
import Modal from '../../common/Modal';
import LoadingSpinner from '../../common/LoadingSpinner';
import { Post } from '../../../types/posts/Post';

interface PostFormProps {
  mode: 'create' | 'edit';
  onSubmit: (title: string, content: string, id?: number) => Promise<void>;
  post?: Post | null;
  isModal?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export const PostForm: React.FC<PostFormProps> = ({
  mode = 'create',
  onSubmit,
  post = null,
  isModal = false,
  isOpen = false,
  onClose = () => {},
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && post) {
      setTitle(post.title);
      setContent(post.content);
    } else if (mode === 'create') {
      setTitle('');
      setContent('');
    }
  }, [mode, post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      setIsSubmitting(true);
      try {
        if (mode === 'edit' && post) {
          await onSubmit(title, content, post.id);
        } else {
          await onSubmit(title, content);
        }

        if (mode === 'create') {
          setTitle('');
          setContent('');
        }

        if (isModal && onClose) {
          onClose();
        }
      } catch (err) {
        console.error(
          `Error ${mode === 'create' ? 'creating' : 'editing'} post:`,
          err,
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getButtonClass = () => {
    const baseClasses = isModal ? 'w-[120px] max-w-none ' : '';

    if (mode === 'edit') {
      return `${baseClasses}!bg-[#47B960] hover:!bg-[#3da352] disabled:!bg-[#47B960]/70`;
    } else {
      return `${baseClasses}!bg-[#7695EC] hover:!bg-[#6482d9] disabled:!bg-[#7695EC]/70`;
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="mb-2 block text-[16px] leading-[100%] font-normal">
          Title
        </label>
        <input
          type="text"
          placeholder="Hello world"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-[32px] w-full rounded-[8px] border-[1px] border-[#999999] px-3 text-[14px] leading-[100%] font-normal"
          disabled={isSubmitting}
        />
      </div>

      <div className={`${isModal ? 'mb-6' : 'mb-4'}`}>
        <label className="mb-2 block text-[16px] leading-[100%] font-normal">
          Content
        </label>
        <textarea
          placeholder="Content here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[74px] w-full rounded-[8px] border-[1px] border-[#999999] p-3 text-[14px] leading-[100%] font-normal"
          disabled={isSubmitting}
        />
      </div>

      <div
        className={`flex ${isModal ? 'justify-end space-x-4' : 'justify-end'}`}
      >
        {isModal && (
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-[120px] max-w-none border border-[#999999] !bg-[#FFFFFF] hover:!bg-gray-100 disabled:opacity-70"
          >
            <span className="text-[16px] leading-[100%] font-bold text-black">
              Cancel
            </span>
          </Button>
        )}
        <Button
          type="submit"
          disabled={!title.trim() || !content.trim() || isSubmitting}
          className={getButtonClass()}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="small" color="#FFFFFF" />
              <span className="ml-2 text-[16px] leading-[100%] font-bold text-white">
                {mode === 'create' ? 'Creating...' : 'Saving...'}
              </span>
            </div>
          ) : (
            <span className="text-[16px] leading-[100%] font-bold text-white">
              {mode === 'create' ? 'Create' : 'Save'}
            </span>
          )}
        </Button>
      </div>
    </form>
  );

  if (isModal) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={isSubmitting ? () => {} : onClose}
        title={mode === 'create' ? "What's on your mind?" : 'Edit item'}
      >
        {formContent}
      </Modal>
    );
  }

  return (
    <div className="mx-auto mb-6 w-full max-w-[752px] rounded-[16px] border-[1px] border-[#999999] bg-[#FFFFFF] p-6">
      <h2 className="mb-6 text-[22px] leading-[100%] font-bold">
        What's on your mind?
      </h2>
      {formContent}
    </div>
  );
};

export default PostForm;
