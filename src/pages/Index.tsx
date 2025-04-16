
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AuthForm from '@/components/AuthForm';
import Header from '@/components/Header';

const Index: React.FC = () => {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const [referralCode, setReferralCode] = useState<string | null>(null);

  // Check URL for referral code
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    if (ref) {
      setReferralCode(ref);
      // Remove ref from URL to avoid confusion
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Redirect to dashboard if logged in
  useEffect(() => {
    if (currentUser && !isLoading) {
      navigate('/dashboard');
    }
  }, [currentUser, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-lg w-full">
            <h1 className="text-4xl font-bold mb-2 text-center">
              Refer Friends, <span className="bg-gradient-to-r from-brand-purple to-brand-purpleDark text-transparent bg-clip-text">Earn Rewards</span>
            </h1>
            <p className="text-center text-muted-foreground mb-8">
              Join our referral program and earn points for every friend you invite
            </p>
            
            <AuthForm />
            
            {referralCode && (
              <div className="mt-4 p-3 bg-brand-softGreen rounded-md">
                <p className="text-sm">
                  You've been referred! Sign up with code <strong>{referralCode}</strong> to get 5 welcome points.
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="hidden md:flex flex-1 bg-gradient-to-br from-brand-purple to-brand-purpleDark items-center justify-center p-8">
          <div className="text-white max-w-md">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">1</div>
                <div>
                  <h3 className="text-xl font-medium">Create an Account</h3>
                  <p className="text-white/80">Sign up for PointPal and get your unique referral code</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">2</div>
                <div>
                  <h3 className="text-xl font-medium">Share Your Code</h3>
                  <p className="text-white/80">Invite friends to join using your referral code</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">3</div>
                <div>
                  <h3 className="text-xl font-medium">Earn Points</h3>
                  <p className="text-white/80">Get 10 points for each friend who signs up</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">4</div>
                <div>
                  <h3 className="text-xl font-medium">Redeem Rewards</h3>
                  <p className="text-white/80">Use your points to claim exciting rewards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
