
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/sonner';
import { Share2 } from 'lucide-react';

const ReferralCard: React.FC = () => {
  const { currentUser } = useAuth();
  const [copied, setCopied] = useState(false);
  
  if (!currentUser) return null;
  
  const referralCode = currentUser.referralCode;
  const referralUrl = `${window.location.origin}?ref=${referralCode}`;
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode)
      .then(() => {
        setCopied(true);
        toast.success('Referral code copied to clipboard!');
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(() => {
        toast.error('Failed to copy code');
      });
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl)
      .then(() => {
        toast.success('Referral link copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy link');
      });
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-brand-softPurple to-brand-softBlue rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Refer Friends & Earn
        </CardTitle>
        <CardDescription>
          Share your referral code and earn 10 points for each friend who signs up!
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Your unique referral code:</p>
          <div className="flex gap-2">
            <Input
              value={referralCode}
              readOnly
              className="font-mono text-center text-lg bg-muted"
            />
            <Button
              onClick={handleCopyCode}
              variant="outline"
              className="shrink-0"
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Friends get 5 points when they sign up with your code, and you'll earn 10 points!
          </p>
          
          <div className="bg-brand-softGreen p-3 rounded-md">
            <p className="text-sm font-medium">How it works:</p>
            <ol className="text-sm list-decimal pl-5 mt-1 space-y-1">
              <li>Share your referral code with friends</li>
              <li>Friend creates an account using your code</li>
              <li>You receive 10 points and they get 5 points</li>
              <li>Redeem points for awesome rewards!</li>
            </ol>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          onClick={handleCopyLink}
          className="w-full bg-brand-purple hover:bg-brand-purpleDark"
        >
          Copy Referral Link
        </Button>
        
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => {
              window.open(`https://twitter.com/intent/tweet?text=Join me on PointPal and get 5 bonus points! Use my referral code ${referralCode} when signing up: ${encodeURIComponent(referralUrl)}`, '_blank');
            }}
          >
            Share on Twitter
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => {
              window.open(`https://wa.me/?text=Join me on PointPal and get 5 bonus points! Use my referral code ${referralCode} when signing up: ${encodeURIComponent(referralUrl)}`, '_blank');
            }}
          >
            Share on WhatsApp
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReferralCard;
