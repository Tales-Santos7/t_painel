import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import AboutForm from "./components/AboutForm";
import GalleryForm from "./components/GalleryForm";
import MainSectionDisplay from "./components/MainSectionDisplay";
import MainSectionForm from "./components/MainSectionForm";
import Login from "./Login";
import SocialLinks from "./components/SocialLinks"; // Exibição no site
import SocialLinksAdmin from "./components/SocialLinksAdmin"; // Gerenciamento no painel

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("auth");
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <button className="logout_btn" onClick={handleLogout}>Logout</button>}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={setIsAuthenticated} />} />
          <Route path="/dashboard" element={
            isAuthenticated ? (
              <>
              <SocialLinksAdmin /> 
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
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
