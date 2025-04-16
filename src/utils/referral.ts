
// Generate a unique referral code based on user's name
export function generateReferralCode(name: string): string {
  // Take first 3 letters of name (or fewer if name is shorter)
  const prefix = name.substring(0, 3).toUpperCase();
  
  // Generate 3 random numbers
  const randomNumbers = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  // Combine them
  return `${prefix}${randomNumbers}`;
}

// Validate a referral code
export function isValidReferralCode(code: string): boolean {
  // Simple validation: should be 6 characters, first 3 letters, last 3 numbers
  const pattern = /^[A-Z]{3}\d{3}$/;
  return pattern.test(code);
}

// Get user stats from referrals
export function getUserStats(userId: string): { totalReferrals: number } {
  // In a real app, this would query the database
  const referralsJson = localStorage.getItem('point_pal_referrals');
  if (!referralsJson) return { totalReferrals: 0 };
  
  try {
    const referrals = JSON.parse(referralsJson);
    const userReferrals = referrals.filter((ref: any) => ref.referrerId === userId);
    return { totalReferrals: userReferrals.length };
  } catch (error) {
    console.error('Failed to parse referrals', error);
    return { totalReferrals: 0 };
  }
}

// Track a new referral
export function trackReferral(referrerId: string, refereeId: string): void {
  const referralsJson = localStorage.getItem('point_pal_referrals');
  const referrals = referralsJson ? JSON.parse(referralsJson) : [];
  
  const newReferral = {
    id: Date.now().toString(),
    referrerId,
    refereeId,
    pointsAwarded: 10, // Points awarded to referrer
    createdAt: new Date()
  };
  
  referrals.push(newReferral);
  localStorage.setItem('point_pal_referrals', JSON.stringify(referrals));
}
