import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  showAuthDialog: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  triggerAuth: () => void;
  closeAuthDialog: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('webscraper-ai-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('webscraper-ai-user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (email && password.length >= 8) {
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        fullName: 'John Doe' // In real app, this would come from the API
      };
      setUser(newUser);
      localStorage.setItem('webscraper-ai-user', JSON.stringify(newUser));
      setShowAuthDialog(false);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (fullName: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (fullName && email && password.length >= 8) {
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        fullName
      };
      setUser(newUser);
      localStorage.setItem('webscraper-ai-user', JSON.stringify(newUser));
      setShowAuthDialog(false);
    } else {
      throw new Error('Invalid data');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('webscraper-ai-user');
  };

  const triggerAuth = () => {
    if (!user) {
      setShowAuthDialog(true);
    }
  };

  const closeAuthDialog = () => {
    // Can't close dialog until authenticated
    if (user) {
      setShowAuthDialog(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      showAuthDialog,
      login,
      signup,
      logout,
      triggerAuth,
      closeAuthDialog
    }}>
      {children}
    </AuthContext.Provider>
  );
};