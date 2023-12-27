// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const storedLanguage = localStorage.getItem("language");

i18n.use(initReactI18next).init({
  resources: {
    us: {
      translation: {
        title_dashboard: "Dashboard",
        title_graphics: "Graphics",
        menu_dashboard: "Dashboard",
        menu_graphics: "Graphics",
        menu_users: "Users",
      },
    },
    es: {
      translation: {
        title_dashboard: "Panel Administrativo",
        title_graphics: "Graficas",
        menu_dashboard: "Panel",
        menu_graphics: "Graficas",
        menu_users: "Usuarios",
      },
    },
    pt: {
      translation: {
        title_dashboard: "Painel Administrativo",
        title_graphics: "Gráficos",
        menu_dashboard: "Painel",
        menu_graphics: "Gráficos",
        menu_users: "Usuários",
      },
    },
  },
  lng: storedLanguage || "us",
  fallbackLng: "us",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
