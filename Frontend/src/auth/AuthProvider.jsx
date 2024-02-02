import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  saveUser: (userData) => {},
  checkTokenExpiration: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    window.localStorage.getItem("token" ?? false)
  );

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    checkTokenExpiration();
    checkAuth();
  }, []);

  async function checkAuth() {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }

  function getAccessToken() {
    return accessToken;
  }

  function saveUser(userData) {
    setAccessToken(userData.token);
    localStorage.setItem("token", JSON.stringify(userData.token));
    localStorage.setItem("tokenExpiration", new Date(userData.tokenExpiration));
    setIsAuthenticated(true);
  }

  function checkTokenExpiration() {
    const expirationDate = new Date(localStorage.getItem("tokenExpiration"));
    if (expirationDate < new Date()) {
      // Token expirado, limpia el almacenamiento
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      setAccessToken("");
      setIsAuthenticated(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    setAccessToken("");
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        getAccessToken,
        saveUser,
        checkTokenExpiration,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
