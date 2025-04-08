// import { createContext, useState } from 'react';

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({});

//   return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
// };

// export default AuthContext;

// убрать потом
import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext(); // Экспортируем как именованный экспорт

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    user: null,
    roles: [],
  });

  const loginAsUser = () => setAuth({ user: 'testUser', roles: [2001] });
  const loginAsAdmin = () => setAuth({ user: 'testAdmin', roles: [5150] });
  const logout = () => setAuth({ user: null, roles: [] });

  return (
    <AuthContext.Provider value={{ auth, loginAsUser, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
