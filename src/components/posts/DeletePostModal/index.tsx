import React, { useState, useRef, useEffect } from 'react';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import LoadingSpinner from '../../common/LoadingSpinner';
import { motion } from 'framer-motion';

interface DeletePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number | null;
  onConfirm: (id: number) => void;
}

export const DeletePostModal: React.FC<DeletePostModalProps> = ({
  isOpen,
  onClose,
  postId,
  onConfirm,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && deleteButtonRef.current) {
      const timer = setTimeout(() => {
        const deleteRewardElement = document.getElementById('deletePostReward');
        if (deleteRewardElement && deleteButtonRef.current) {
          const rect = deleteButtonRef.current.getBoundingClientRect();
          deleteRewardElement.style.position = 'fixed';
          deleteRewardElement.style.left = `${rect.left + rect.width / 2}px`;
          deleteRewardElement.style.top = `${rect.top + rect.height / 2}px`;
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [isOpen, deleteButtonRef]);

  const handleConfirm = async () => {
    if (postId !== null) {
      setIsDeleting(true);

      try {
        const deleteRewardElement = document.getElementById('deletePostReward');
        if (deleteRewardElement) {
          deleteRewardElement.style.opacity = '1';
        }

        await onConfirm(postId);
      } finally {
        setIsDeleting(false);
        onClose();

        setTimeout(() => {
          const deleteRewardElement =
            document.getElementById('deletePostReward');
          if (deleteRewardElement) {
            deleteRewardElement.style.opacity = '0';
          }
        }, 1000);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Are you sure you want to delete this item?"
    >
      <div className="mt-6 flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          disabled={isDeleting}
          className="w-[120px] max-w-none border border-[#999999] bg-[#FFFFFF] hover:bg-gray-100 disabled:opacity-70"
        >
          <span className="text-[16px] leading-[100%] font-bold text-black">
            Cancel
          </span>
        </Button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          ref={deleteButtonRef}
        >
          <Button
            type="button"
            variant="danger"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="w-[120px] max-w-none bg-[#FF5151] hover:bg-red-600 disabled:opacity-70"
            noAnimation
          >
            {isDeleting ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner size="small" color="#FFFFFF" />
                <span className="ml-2 text-[16px] leading-[100%] font-bold text-white">
                  Deleting...
                </span>
              </div>
            ) : (
              <span className="text-[16px] leading-[100%] font-bold text-white">
                Delete
              </span>
            )}
          </Button>
        </motion.div>
      </div>
    </Modal>
  );
};

export default DeletePostModal;
