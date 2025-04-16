
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Gift, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getUserStats } from '@/utils/referral';
import { getTotalRewardsRedeemed } from '@/utils/rewards';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description, className }) => (
  <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </CardContent>
  </Card>
);

const StatsCard: React.FC = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) return null;
  
  const { totalReferrals } = getUserStats(currentUser.id);
  const totalRewards = getTotalRewardsRedeemed(currentUser.id);
  
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Points"
        value={currentUser.points}
        icon={<Award className="h-4 w-4 text-brand-purple" />}
        description="Your current point balance"
        className="bg-gradient-to-br from-white to-brand-softPurple"
      />
      
      <StatCard
        title="Successful Referrals"
        value={totalReferrals}
        icon={<Users className="h-4 w-4 text-brand-purple" />}
        description="Friends who used your code"
        className="bg-gradient-to-br from-white to-brand-softBlue"
      />
      
      <StatCard
        title="Rewards Redeemed"
        value={totalRewards}
        icon={<Gift className="h-4 w-4 text-brand-purple" />}
        description="Rewards you've claimed"
        className="bg-gradient-to-br from-white to-brand-softGreen"
      />
    </div>
  );
};

export default StatsCard;
