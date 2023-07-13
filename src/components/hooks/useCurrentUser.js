// useUser.js
import { useContext, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";

export const useCurrentUser = (redirect=false) => {

  const { user, setUser, userLoading, setUserLoading} = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user && redirect && location.pathname !== "/login" && location.pathname !== "/register") {
      navigate("/login");
    }
  }, [user]);
  return {user, setUser, userLoading, setUserLoading};
};