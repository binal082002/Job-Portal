import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

//1. context
export const AuthContext = createContext();

//2. Provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const authToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const clearTokenFromLS = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const isLoggedIn = !!token; 

  const logoutUser = () => {
    toast.success("Logged out")
    clearTokenFromLS();
  };


  const userAuthentication = async () => {
    if (!token) {
      console.log("No token available, skipping authentication");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setIsAdmin(false);
      // console.log("Fetching user data with token: ", authToken);
      const response = await fetch("http://localhost:5000/user", {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });

      if (response.ok) {
        const data = await response.json();

        const usr_data = data.user;
        setUser(usr_data);
        setIsLoading(false);
        
        if (usr_data.isAdmin) setIsAdmin(true);
        else setIsAdmin(false);
      } else {
        console.log("Failed to fetch user data");
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Error fetching user data", err);
    }
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
    } else {
      setIsLoading(false); // Ensure loading state is false if no token
    }

  }, [token]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isAdmin, storeTokenInLS, logoutUser, authToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

//3. Delivery
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
