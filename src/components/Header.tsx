
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { GiftIcon, LogOut } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <GiftIcon className="h-5 w-5 text-brand-purple" />
          <span className="font-bold text-xl bg-gradient-to-r from-brand-purple to-brand-purpleDark text-transparent bg-clip-text">
            PointPal
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
              <span className="hidden md:inline-block text-sm font-medium">
                {currentUser.points} Points
              </span>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-brand-purple text-white">
                        {getInitials(currentUser.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{currentUser.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {currentUser.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/rewards" className="cursor-pointer">Rewards</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600 cursor-pointer"
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => navigate('/')}>
                Login
              </Button>
              <Button 
                className="bg-brand-purple hover:bg-brand-purpleDark"
                onClick={() => navigate('/')}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
