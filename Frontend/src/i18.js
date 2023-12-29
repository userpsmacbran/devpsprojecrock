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
        menu_transactions: "Transactions",
        menu_help: "Help",
        dashboard_welcome: "Welcome,",
        dashboard_sales: "Sales",
        dashboard_clients: "Clients",
        dashboard_companies: "Companies",
        dashboard_videos: "Videos playing",
        dashboard_last_orders: "Last orders",
        dashboard_table_order: "Order",
        dashboard_table_client: "Client",
        dashboard_table_amount: "Amount",
        dashboard_table_state: "State",
        dashboard_table_date: "Date",
      },
    },
    es: {
      translation: {
        title_dashboard: "Panel Administrativo",
        title_graphics: "Graficas",
        menu_dashboard: "Panel",
        menu_graphics: "Graficas",
        menu_users: "Usuarios",
        menu_transactions: "Transacciones",
        menu_help: "Ayuda",
        dashboard_welcome: "Bienvenido,",
        dashboard_sales: "Ventas",
        dashboard_clients: "Usuarios Clientes",
        dashboard_companies: "Usuarios Empresas",
        dashboard_videos: "Videos en reproducción",
        dashboard_last_orders: "Últimos pedidos",
        dashboard_table_order: "ORDEN",
        dashboard_table_client: "CLIENTE",
        dashboard_table_amount: "CANTIDAD",
        dashboard_table_state: "ESTADO",
        dashboard_table_date: "FECHA",
      },
    },
    pt: {
      translation: {
        title_dashboard: "Painel Administrativo",
        title_graphics: "Gráficos",
        menu_dashboard: "Painel",
        menu_graphics: "Gráficos",
        menu_users: "Usuários",
        menu_transactions: "Transações",
        menu_help: "Ajuda",
        dashboard_welcome: "Bem-vindo,",
        dashboard_sales: "Vendas",
        dashboard_clients: "Clientes",
        dashboard_companies: "Empresas",
        dashboard_videos: "Vídeos em reprodução",
        dashboard_last_orders: "Últimos pedidos",
        dashboard_table_order: "ORDEM",
        dashboard_table_client: "CLIENTE",
        dashboard_table_amount: "QUANTIDADE",
        dashboard_table_state: "ESTADO",
        dashboard_table_date: "DATA",
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
