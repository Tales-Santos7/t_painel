import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get('https://tatyana-vanin.onrender.com/content/about');
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.error('Erro ao carregar conteúdo sobre mim:', error);
      }
    };
    fetchAbout();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('https://tatyana-vanin.onrender.com/content/about', {
        title,
        description,
      });
      alert('Seção "Sobre Mim" atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar seção "Sobre Mim":', error);
      alert('Erro ao atualizar conteúdo');
    }
  };

  return (
    <div className="container">
      <h2>Editar Seção Sobre Mim</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default AboutForm;
