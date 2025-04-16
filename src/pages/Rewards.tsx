
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import RewardCard from '@/components/RewardCard';
import { AVAILABLE_REWARDS } from '@/utils/rewards';
import { Reward } from '@/types';

const Rewards: React.FC = () => {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const [rewards, setRewards] = useState<Reward[]>(AVAILABLE_REWARDS);
  
  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoading && !currentUser) {
      navigate('/');
    }
  }, [currentUser, isLoading, navigate]);
  
  // Force refresh when user redeems a reward to update points
  const handleRedeemed = () => {
    // Force a re-render to show updated points
    setRewards([...AVAILABLE_REWARDS]);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }
  
  if (!currentUser) return null;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Rewards Marketplace</h1>
            <p className="text-muted-foreground">Redeem your points for exciting rewards</p>
          </div>
          <div className="bg-brand-softPurple px-4 py-2 rounded-full">
            <span className="text-brand-purple font-bold">{currentUser.points} Points Available</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rewards.map((reward) => (
            <RewardCard 
              key={reward.id} 
              reward={reward} 
              onRedeem={handleRedeemed}
            />
          ))}
        </div>
        
        {rewards.length === 0 && (
          <div className="text-center py-10">
            <p className="text-lg">No rewards available at the moment.</p>
            <p className="text-muted-foreground">Please check back later!</p>
          </div>
        )}
        
        <div className="bg-brand-softBlue p-6 rounded-lg mt-12">
          <h2 className="text-xl font-bold mb-2">How to Earn More Points</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Refer friends - get <strong>10 points</strong> for each referral</li>
            <li>Complete your profile - get <strong>5 points</strong></li>
            <li>Follow us on social media - get <strong>3 points</strong> per platform</li>
            <li>Write a review - get <strong>15 points</strong></li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Rewards;
