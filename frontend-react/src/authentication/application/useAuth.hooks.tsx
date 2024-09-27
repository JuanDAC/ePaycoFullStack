import { useState, useContext, createContext } from 'react';
import { login as loginService, register as registerService } from '../infrastructure/auth.service';
import { User } from '../domain/authentication.domain';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, document: string) => Promise<void>;
  register: (name: string, email: string, document: string, phone: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provides an authentication context for the application.
 *
 * This component wraps the application with the authentication context, and
 * provides the necessary functions to manage the authentication state.
 *
 * @prop {React.ReactNode} children The children components to be wrapped with the authentication context.
 *
 * @example
 * import React from 'react';
 * import ReactDOM from 'react-dom';
 * import { AuthProvider } from './authentication/application/useAuth.hooks';
 *
 * ReactDOM.render(
 *   <React.StrictMode>
 *     <AuthProvider>
 *       <App />
 *     </AuthProvider>
 *   </React.StrictMode>,
 *   document.getElementById('root')
 * );
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const response = await loginService(email, password);
    setUser(response.user);
    setToken(response.token);
    localStorage.setItem('token', response.token);
  };

  const register = async (name: string, email: string, phone: string, document: string) => {
    const response = await registerService(name, email, document, phone);
    setUser(response.user);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Retrieves the authentication context for the application.
 *
 * This hook returns the authentication context, which provides the user, token, login, register, and logout functions.
 *
 * @throws {Error} If the hook is used outside of an AuthProvider component.
 *
 * @example
 * import React from 'react';
 * import { useAuth } from './authentication/application/useAuth.hooks';
 *
 * const MyComponent = () => {
 *   const { user, login, logout } = useAuth();
 *
 *   return (
 *     <div>
 *       {user ? (
 *         <>
 *           Welcome, {user.name}!
 *           <button onClick={logout}>Logout</button>
 *         </>
 *       ) : (
 *         <button onClick={() => login('email@example.com', '1243298763')}>Login</button>
 *       )}
 *     </div>
 *   );
 * };
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
