import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Icon } from "@iconify/react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import AboutForm from "./components/AboutForm";
import GalleryForm from "./components/GalleryForm";
import MainSectionDisplay from "./components/MainSectionDisplay";
import MainSectionForm from "./components/MainSectionForm";
import Login from "./Login";
import SocialLinksAdmin from "./components/SocialLinksAdmin";
import ThemeColorForm from "./components/ThemeColorForm";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("social-links");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("auth");
    if (auth === "true") setIsAuthenticated(true);

    const darkPref = localStorage.getItem("darkMode") === "true";
    setDarkMode(darkPref);
    document.body.style.backgroundColor = darkPref ? "#1e1e2f" : "#f9f9fb";
    document.body.style.color = darkPref ? "#5e5a5a" : "#2e2e2e";
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.style.backgroundColor = newMode ? "#1e1e2f" : "#f9f9fb";
    document.body.style.color = newMode ? "#5e5a5a" : "#2e2e2e";
    localStorage.setItem("darkMode", newMode);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("auth");
  };

  const tabs = [
    {
      id: "social-links",
      icon: "mdi:link-variant",
      label: "Redes Sociais",
      component: <SocialLinksAdmin />,
    },
    {
      id: "theme",
      icon: "mdi:palette",
      label: "Cores do Tema",
      component: <ThemeColorForm />,
    },
    {
      id: "main-form",
      icon: "mdi:view-dashboard",
      label: "Seção Principal",
      component: <MainSectionForm />,
    },
    {
      id: "gallery",
      icon: "mdi:image-multiple",
      label: "Galeria",
      component: <GalleryForm />,
    },
    {
      id: "about",
      icon: "mdi:account-box-outline",
      label: "Sobre Mim",
      component: <AboutForm />,
    },
    {
      id: "posts",
      icon: "mdi:note-text",
      label: "Posts",
      component: (
        <>
          <PostForm />
          <PostList />
        </>
      ),
    },
  ];

  return (
    <Router>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          fontFamily: "Segoe UI, sans-serif",
        }}
      >
        {isAuthenticated ? (
          <>
            <aside
              style={{
                width: "240px",
                background: darkMode ? "#2a2a3b" : "#fff",
                padding: "2rem 1.5rem",
                borderRight: "1px solid #e2e2e2",
              }}
            >
              <h1
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "2rem",
                  color: "#4c6ef5",
                }}
              >
                Painel
              </h1>
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`sidebar-tab ${
                    activeTab === tab.id ? "active" : ""
                  } ${darkMode ? "dark" : "light"}`}
                >
                  <Icon icon={tab.icon} width={20} />
                  <span>{tab.label}</span>
                </div>
              ))}
              <div
                onClick={handleLogout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.8rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  cursor: "pointer",
                  color: "#e03131",
                }}
              >
                <Icon icon="mdi:logout" width={20} /> <span>Sair</span>
              </div>
              <button
                onClick={toggleDarkMode}
                style={{
                  marginTop: "2rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Icon
                  icon={darkMode ? "mdi:weather-sunny" : "mdi:weather-night"}
                  width={24}
                  color={darkMode ? "#facc15" : "#0e0127"}
                />
              </button>
            </aside>

            <main
              style={{
                flex: 1,
                padding: "2rem",
                background: darkMode ? "#1e1e2f" : "#f9f9fb",
              }}
            >
              <div
                style={{
                  background: darkMode ? "#2a2a3b" : "#fff",
                  padding: "2rem",
                  borderRadius: "12px",
                  border: "1px solid #e2e2e2",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
                }}
              >
                {tabs.find((t) => t.id === activeTab)?.component || (
                  <SocialLinksAdmin />
                )}
              </div>
            </main>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login onLogin={setIsAuthenticated} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
