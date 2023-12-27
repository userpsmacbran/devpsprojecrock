import { useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { useTranslation } from "react-i18next";

const Graphics = () => {
  const { t } = useTranslation();

  const auth = useAuth();
  useEffect(() => {
    auth.checkTokenExpiration();
  }, []);

  return (
    <div className="text-4xl text-center">
      <h2>{t("title_graphics")}</h2>
    </div>
  );
};

export default Graphics;
