import React, { useState, useEffect } from "react";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }

    const darkPref = localStorage.getItem("darkMode") === "true";
    setDarkMode(darkPref);
    document.body.classList.toggle("dark-mode", darkPref);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("auth");
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && (
          <>
            <button className="logout_btn" onClick={handleLogout}>
              Logout
            </button>

             <button  className="btn-modes-floating"
              onClick={toggleDarkMode}
              aria-label="Alternar modo escuro">
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e0a800"
                >
                  <path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#0e0127"
                >
                  <path d="M560-80q-82 0-155-31.5t-127.5-86Q223-252 191.5-325T160-480q0-83 31.5-155.5t86-127Q332-817 405-848.5T560-880q54 0 105 14t95 40q-91 53-145.5 143.5T560-480q0 112 54.5 202.5T760-134q-44 26-95 40T560-80Z" />
                </svg>
              )}
            </button>
          </>
        )}

        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login onLogin={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <>
                  <SocialLinksAdmin />
                  <ThemeColorForm />
                  <MainSectionForm />
                  <MainSectionDisplay />
                  <GalleryForm />
                  <AboutForm />
                  <PostForm />
                  <PostList />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
