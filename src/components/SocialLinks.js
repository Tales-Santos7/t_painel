import React, { useEffect, useState } from "react";
import axios from "axios";

function SocialLinks() {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    axios
      .get("https://tatyana-vanin.onrender.com/social-links")
      .then((response) => setSocialLinks(response.data))
      .catch((error) => console.error("Erro ao buscar redes sociais:", error));
  }, []);

  return (
    <div className="card-form">
      <h2>Redes Sociais</h2>
      <ul>
        {socialLinks.map((link) => (
          <li key={link._id}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SocialLinks;
