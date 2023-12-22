import { useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";

const Graphics = () => {
  const auth = useAuth();
  useEffect(() => {
    auth.checkTokenExpiration();
  }, []);

  return <div className="text-4xl text-center">Graphics </div>;
};

export default Graphics;
