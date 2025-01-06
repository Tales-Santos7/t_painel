import React from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import AboutForm from "./components/AboutForm";
import GalleryForm from "./components/GalleryForm"; 
import MainSectionDisplay from "./components/MainSectionDisplay";
import MainSectionForm from "./components/MainSectionForm";

function App() {
  return (
    <div className="App">
      <MainSectionForm />
      <MainSectionDisplay />
      <GalleryForm />
      <AboutForm />
      <PostForm />
      <PostList />
    </div>
  );
  
  
}

export default App;
