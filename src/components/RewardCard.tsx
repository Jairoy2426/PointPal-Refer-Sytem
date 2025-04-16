
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { redeemReward } from '@/utils/rewards';
import { toast } from '@/components/ui/sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Reward } from '@/types';

interface RewardCardProps {
  reward: Reward;
  onRedeem: () => void;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward, onRedeem }) => {
  const { currentUser } = useAuth();
  const [isRedeeming, setIsRedeeming] = useState(false);
  
  if (!currentUser) return null;
  
  const hasEnoughPoints = currentUser.points >= reward.pointsCost;
  
  const handleRedeem = () => {
    if (!hasEnoughPoints) {
      toast.error(`Not enough points. You need ${reward.pointsCost - currentUser.points} more points`);
      return;
    }
    
    setIsRedeeming(true);
    
    try {
      const success = redeemReward(currentUser.id, reward.id);
      
      if (success) {
        toast.success(`Successfully redeemed: ${reward.name}`);
        onRedeem();
      } else {
        toast.error('Failed to redeem reward. Please try again.');
      }
    } catch (error) {
      console.error('Redemption error:', error);
      toast.error('An error occurred during redemption');
    } finally {
      setIsRedeeming(false);
    }
  };
  
  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <div className="relative">
        <img 
          src={reward.imageUrl} 
          alt={reward.name}
          className="object-cover w-full h-48 bg-muted"
        />
        <Badge 
          className="absolute top-2 right-2 bg-brand-purple"
        >
          {reward.pointsCost} points
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle>{reward.name}</CardTitle>
        <CardDescription>{reward.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        {!hasEnoughPoints && (
          <div className="mt-2 py-1 px-2 bg-muted rounded text-xs">
            You need {reward.pointsCost - currentUser.points} more points to redeem
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        {hasEnoughPoints ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                className="w-full bg-brand-purple hover:bg-brand-purpleDark"
                disabled={isRedeeming}
              >
                {isRedeeming ? "Processing..." : "Redeem Reward"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Redeem {reward.name}?</AlertDialogTitle>
                <AlertDialogDescription>
                  You are about to redeem this reward for {reward.pointsCost} points. 
                  This action cannot be undone and the points will be deducted from your balance.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleRedeem}>
                  Redeem Now
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button 
            className="w-full" 
            variant="outline" 
            disabled
          >
            Not Enough Points
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RewardCard;
