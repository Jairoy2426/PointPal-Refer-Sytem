
import { Reward, RewardRedemption } from '@/types';

// Mock rewards data
export const AVAILABLE_REWARDS: Reward[] = [
  {
    id: '1',
    name: 'Free eBook',
    description: 'Download our exclusive eBook on digital marketing strategies',
    pointsCost: 30,
    imageUrl: '/placeholder.svg',
    available: true
  },
  {
    id: '2',
    name: 'Amazon Coupon',
    description: '$10 Amazon gift card to spend on anything you want',
    pointsCost: 100,
    imageUrl: '/placeholder.svg',
    available: true
  },
  {
    id: '3',
    name: 'Premium Account',
    description: '1 month of premium account access',
    pointsCost: 50,
    imageUrl: '/placeholder.svg',
    available: true
  },
  {
    id: '4',
    name: 'Exclusive Webinar',
    description: 'Access to our exclusive webinar on growth hacking',
    pointsCost: 75,
    imageUrl: '/placeholder.svg',
    available: true
  }
];

const REDEMPTIONS_STORAGE_KEY = 'point_pal_redemptions';
const USERS_STORAGE_KEY = 'point_pal_users';

// Get all redemptions
export function getRedemptions(): RewardRedemption[] {
  const redemptionsJson = localStorage.getItem(REDEMPTIONS_STORAGE_KEY);
  if (!redemptionsJson) return [];
  
  try {
    return JSON.parse(redemptionsJson);
  } catch (error) {
    console.error('Failed to parse redemptions', error);
    return [];
  }
}

// Get user's redemptions
export function getUserRedemptions(userId: string): RewardRedemption[] {
  const redemptions = getRedemptions();
  return redemptions.filter(r => r.userId === userId);
}

// Redeem a reward
export function redeemReward(userId: string, rewardId: string): boolean {
  // Find the reward
  const reward = AVAILABLE_REWARDS.find(r => r.id === rewardId);
  if (!reward || !reward.available) return false;
  
  // Get user
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  if (!usersJson) return false;
  
  try {
    const users = JSON.parse(usersJson);
    const userIndex = users.findIndex((u: any) => u.id === userId);
    
    if (userIndex === -1) return false;
    
    const user = users[userIndex];
    
    // Check if user has enough points
    if (user.points < reward.pointsCost) return false;
    
    // Deduct points
    user.points -= reward.pointsCost;
    users[userIndex] = user;
    
    // Save updated user
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    
    // Update current user if it's the active user
    const currentUserJson = localStorage.getItem('current_user');
    if (currentUserJson) {
      const currentUser = JSON.parse(currentUserJson);
      if (currentUser.id === userId) {
        currentUser.points = user.points;
        localStorage.setItem('current_user', JSON.stringify(currentUser));
      }
    }
    
    // Record redemption
    const redemptions = getRedemptions();
    const newRedemption: RewardRedemption = {
      id: Date.now().toString(),
      userId,
      rewardId,
      pointsSpent: reward.pointsCost,
      createdAt: new Date(),
      status: 'completed'
    };
    
    redemptions.push(newRedemption);
    localStorage.setItem(REDEMPTIONS_STORAGE_KEY, JSON.stringify(redemptions));
    
    return true;
  } catch (error) {
    console.error('Failed to redeem reward', error);
    return false;
  }
}

// Get total rewards redeemed by a user
export function getTotalRewardsRedeemed(userId: string): number {
  const userRedemptions = getUserRedemptions(userId);
  return userRedemptions.length;
}
