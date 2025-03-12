import React, { useEffect, useState } from "react";
import axios from "axios";

function SocialLinksAdmin() {
  const [socialLinks, setSocialLinks] = useState([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [statusMessage, setStatusMessage] = useState(""); // Para mensagens de status

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = () => {
    axios
      .get("https://tatyana-vanin.onrender.com/social-links")
      .then((response) => setSocialLinks(response.data))
      .catch((error) => {
        setStatusMessage("Erro ao buscar redes sociais.");
        console.error("Erro ao buscar redes sociais:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const confirmUpdate = window.confirm("Tem certeza de que deseja atualizar este link?");
        if (confirmUpdate) {
          await axios.put(`https://tatyana-vanin.onrender.com/social-links/${editingId}`, { url });
          setStatusMessage("Link atualizado com sucesso!");
        }
      } else {
        await axios.post("https://tatyana-vanin.onrender.com/social-links", { name, url });
        setStatusMessage("Link criado com sucesso!");
      }

      setName("");
      setUrl("");
      setEditingId(null);
      fetchLinks();
    } catch (error) {
      setStatusMessage("Erro ao salvar link.");
      console.error("Erro ao salvar link:", error);
    }
  };

  const handleEdit = (link) => {
    setEditingId(link._id);
    setName(link.name);
    setUrl(link.url);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir este link?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://tatyana-vanin.onrender.com/social-links/${id}`);
        setStatusMessage("Link excluído com sucesso!");
        fetchLinks();
      } catch (error) {
        setStatusMessage("Erro ao excluir link.");
        console.error("Erro ao excluir link:", error);
      }
    }
  };

  return (
    <div>
      <h3>Gerenciar Redes Sociais</h3>

      {statusMessage && <div className="status-message">{statusMessage}</div>} {/* Exibe a mensagem de status */}

      <form className="form-redes" onSubmit={handleSubmit}>
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
        {editingId && <button className="margin" onClick={() => setEditingId(null)}>Cancelar</button>}
      </form>

      <ul>
        {socialLinks.map((link) => (
          <li className="form-redes" key={link._id}>
            {link.name} - <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
            <button className="margin margin-color" onClick={() => handleEdit(link)}>Editar</button>
            <button className="margin" onClick={() => handleDelete(link._id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SocialLinksAdmin;
