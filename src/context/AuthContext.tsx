
import React, { createContext, useState, useEffect, useContext } from 'react';
import { User } from '@/types';
import { generateReferralCode } from '@/utils/referral';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string, referralCode?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock database for local testing (in a real app, this would be in a database)
const USERS_STORAGE_KEY = 'point_pal_users';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from localStorage on initial render
  useEffect(() => {
    const loadUserData = () => {
      setIsLoading(true);
      
      // Check if user is logged in
      const savedUserJson = localStorage.getItem('current_user');
      if (savedUserJson) {
        try {
          const savedUser = JSON.parse(savedUserJson);
          setCurrentUser(savedUser);
        } catch (error) {
          console.error('Failed to parse user data', error);
          localStorage.removeItem('current_user');
        }
      }
      
      setIsLoading(false);
    };
    
    loadUserData();
  }, []);

  // Get all users from storage
  const getUsers = (): User[] => {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    if (!usersJson) return [];
    try {
      return JSON.parse(usersJson);
    } catch (error) {
      console.error('Failed to parse users', error);
      return [];
    }
  };

  // Save users to storage
  const saveUsers = (users: User[]): void => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would verify password with a backend API
      // For this demo, we're just checking if the user exists
      const users = getUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        throw new Error('User not found');
      }
      
      // In a real app, we would check password hash
      
      // Save current user in localStorage
      localStorage.setItem('current_user', JSON.stringify(user));
      setCurrentUser(user);
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string, 
    name: string, 
    password: string, 
    referralCode?: string
  ): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = getUsers();
      
      // Check if user already exists
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('User already exists');
      }
      
      // Generate a unique referral code
      const uniqueCode = generateReferralCode(name);
      
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        referralCode: uniqueCode,
        points: 0, // Will add points later if they used a valid referral
        createdAt: new Date(),
      };
      
      // Handle referral logic
      if (referralCode) {
        const referrer = users.find(u => 
          u.referralCode.toLowerCase() === referralCode.toLowerCase()
        );
        
        if (referrer) {
          // Make sure user isn't referring themselves
          if (newUser.email.toLowerCase() !== referrer.email.toLowerCase()) {
            newUser.referredBy = referrer.referralCode;
            
            // Give points to new user for using referral
            newUser.points += 5;
            
            // Update referrer's points
            const updatedUsers = users.map(u => {
              if (u.id === referrer.id) {
                return {
                  ...u,
                  points: u.points + 10
                };
              }
              return u;
            });
            
            // Save updated users
            saveUsers([...updatedUsers, newUser]);
          } else {
            // Can't refer yourself
            saveUsers([...users, newUser]);
          }
        } else {
          // Invalid referral code, just save the new user
          saveUsers([...users, newUser]);
        }
      } else {
        // No referral code used
        saveUsers([...users, newUser]);
      }
      
      // Log in the new user
      localStorage.setItem('current_user', JSON.stringify(newUser));
      setCurrentUser(newUser);
    } catch (error) {
      console.error('Signup failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('current_user');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
