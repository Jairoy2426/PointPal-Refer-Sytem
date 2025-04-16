
export interface User {
  id: string;
  email: string;
  name: string;
  referralCode: string; // Unique code like ASH123
  points: number;
  referredBy?: string; // Referral code used during signup
  createdAt: Date;
}

export interface Referral {
  id: string;
  referrerId: string; // User who shared the code
  refereeId: string; // User who used the code
  pointsAwarded: number;
  createdAt: Date;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  imageUrl: string;
  available: boolean;
}

export interface RewardRedemption {
  id: string;
  userId: string;
  rewardId: string;
  pointsSpent: number;
  createdAt: Date;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface UserStats {
  totalPoints: number;
  totalReferrals: number;
  totalRewards: number;
}
