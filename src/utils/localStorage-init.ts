
/**
 * Initialize localStorage values for demo purposes
 * In a real app, these would be stored in a database
 */
export function initializeLocalStorage(): void {
  // Check if users array exists, if not create it
  if (!localStorage.getItem('point_pal_users')) {
    localStorage.setItem('point_pal_users', JSON.stringify([]));
  }
  
  // Check if referrals array exists, if not create it
  if (!localStorage.getItem('point_pal_referrals')) {
    localStorage.setItem('point_pal_referrals', JSON.stringify([]));
  }
  
  // Check if redemptions array exists, if not create it
  if (!localStorage.getItem('point_pal_redemptions')) {
    localStorage.setItem('point_pal_redemptions', JSON.stringify([]));
  }
}
