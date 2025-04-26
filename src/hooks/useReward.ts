import { useReward as useRewardLibrary } from 'react-rewards';

type RewardType = 'confetti' | 'emoji' | 'balloons';

const getPostEmoji = () => {
  const emojis = ['📝', '✨', '👍', '🎉', '💯', '🚀'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

const getDeleteEmoji = () => '🗑️';

export const useReward = (id: string, rewardType: RewardType = 'confetti') => {
  const angle =
    rewardType === 'confetti' && id.includes('post')
      ? 270
      : rewardType === 'emoji' && id.includes('delete')
        ? 90
        : rewardType === 'balloons'
          ? 90
          : 90;

  const { reward, isAnimating } = useRewardLibrary(id, rewardType, {
    lifetime: 200,
    decay: 0.91,
    spread: 1000,
    startVelocity: 20,
    elementCount: rewardType === 'emoji' ? 10 : 40,
    elementSize: rewardType === 'emoji' ? 30 : 15,
    zIndex: 999,
    angle: angle,
    emoji:
      rewardType === 'emoji'
        ? id.includes('delete')
          ? [getDeleteEmoji()]
          : id.includes('post')
            ? [getPostEmoji()]
            : ['🎉', '🎊', '🎈']
        : undefined,
  });

  return { reward, isAnimating };
};

export default useReward;
