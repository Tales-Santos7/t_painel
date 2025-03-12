import React, { useEffect, useState } from "react";
import axios from "axios";

function SocialLinksAdmin() {
  const [socialLinks, setSocialLinks] = useState([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = () => {
    axios
      .get("https://tatyana-vanin.onrender.com/social-links")
      .then((response) => setSocialLinks(response.data))
      .catch((error) => console.error("Erro ao buscar redes sociais:", error));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`https://tatyana-vanin.onrender.com/social-links/${editingId}`, { url });
    } else {
      await axios.post("https://tatyana-vanin.onrender.com/social-links", { name, url });
    }
    setName("");
    setUrl("");
    setEditingId(null);
    fetchLinks();
  };

  const handleEdit = (link) => {
    setEditingId(link._id);
    setName(link.name);
    setUrl(link.url);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://tatyana-vanin.onrender.com/social-links/${id}`);
    fetchLinks();
  };

  return (
    <div>
      <h3>Gerenciar Redes Sociais</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={editingId} // Bloqueia o campo ao editar
        />
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">{editingId ? "Atualizar" : "Adicionar"}</button>
        {editingId && <button onClick={() => setEditingId(null)}>Cancelar</button>}
      </form>
      <ul>
        {socialLinks.map((link) => (
          <li key={link._id}>
            {link.name} - <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
            <button onClick={() => handleEdit(link)}>Editar</button>
            <button onClick={() => handleDelete(link._id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SocialLinksAdmin;
