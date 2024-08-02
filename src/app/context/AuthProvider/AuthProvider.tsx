import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const fixedPhoneNumber = '+7 (917) 404 12 34';
const fixedCode = '19875';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (phoneNumber: string, verificationCode: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('zaim_user');
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (phoneNumber: string, verificationCode: string) => {
    if (phoneNumber === fixedPhoneNumber && verificationCode === fixedCode) {
      localStorage.setItem('zaim_user', JSON.stringify({ phoneNumber: fixedPhoneNumber }));
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    localStorage.removeItem('zaim_user');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
