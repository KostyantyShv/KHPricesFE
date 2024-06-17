import React, { createContext, useState } from "react";

const AuthContext = createContext({});
interface IProps {
  children: React.JSX.Element;
}
export const AuthProvider = ({ children }: IProps) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
