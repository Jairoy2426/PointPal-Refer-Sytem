
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import StatsCard from '@/components/StatsCard';
import ReferralCard from '@/components/ReferralCard';
import { Button } from '@/components/ui/button';
import { getUserRedemptions, AVAILABLE_REWARDS } from '@/utils/rewards';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoading && !currentUser) {
      navigate('/');
    }
  }, [currentUser, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }
  
  if (!currentUser) return null;
  
  // Get recent redemptions
  const redemptions = getUserRedemptions(currentUser.id).slice(0, 3);
  
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <StatsCard />
            
            {redemptions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Rewards</CardTitle>
                  <CardDescription>Your recently redeemed rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {redemptions.map((redemption) => {
                      const reward = AVAILABLE_REWARDS.find(r => r.id === redemption.rewardId);
                      return (
                        <div 
                          key={redemption.id} 
                          className="flex items-center justify-between p-3 rounded-lg border"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-brand-softPurple flex items-center justify-center">
                              <Calendar className="h-5 w-5 text-brand-purple" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {reward ? reward.name : redemption.rewardId}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(redemption.createdAt)}
                              </p>
                            </div>
                          </div>
                          <div className="font-medium text-brand-purple">
                            -{redemption.pointsSpent} pts
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="mt-4 w-full"
                    onClick={() => navigate('/rewards')}
                  >
                    View All Rewards
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            )}
            
            <Button
              onClick={() => navigate('/rewards')}
              className="w-full md:w-auto bg-brand-purple hover:bg-brand-purpleDark"
            >
              Browse Available Rewards
            </Button>
          </div>
          
          <div className="md:col-span-1">
            <ReferralCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
