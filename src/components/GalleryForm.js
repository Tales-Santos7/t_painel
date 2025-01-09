import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GalleryForm = () => {
  const [images, setImages] = useState([]);  // Imagens carregadas do backend
  const [newImages, setNewImages] = useState([]);  // Novas imagens selecionadas

  // Fetch da galeria ao carregar o componente
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get('https://tatyana-vanin.onrender.com/content/gallery');
        const baseUrl = 'https://tatyana-vanin.onrender.com'; // Adiciona o domínio base
        const fullImageUrls = response.data.images.map((path) => `${baseUrl}${path}`);
        // Constrói as URLs completas
        setImages(fullImageUrls);  // Atualiza o estado com as imagens
      } catch (error) {
        console.error('Erro ao carregar galeria:', error);
      }
    };

    fetchGallery();
  }, []);

  // Lidar com seleção de novas imagens
  const handleImageChange = (e) => {
    setNewImages([...e.target.files]);
  };

  // Upload de novas imagens
  const handleUpload = async (e) => {
    e.preventDefault();
  
    if (newImages.length === 0) {
      alert('Selecione pelo menos uma imagem.');
      return;
    }
  
    const formData = new FormData();
    newImages.forEach((image) => formData.append('images', image)); // Adiciona cada imagem ao FormData
  
    try {
      const response = await axios.put('https://tatyana-vanin.onrender.com/content/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImages(response.data.images); // Atualiza o estado com as URLs recebidas do backend
      setNewImages([]); // Limpa as imagens selecionadas
      alert('Imagens adicionadas à galeria com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar imagens:', error);
      alert('Erro ao adicionar imagens à galeria.');
    }
  };

  // Remover uma imagem
  const handleRemove = async (imageUrl) => {
    const confirmDelete = window.confirm('Tem certeza que deseja remover esta imagem?');
    if (!confirmDelete) return;
  
    try {
      // Codifica a URL da imagem para evitar problemas de compatibilidade
      const response = await axios.delete(
        `https://tatyana-vanin.onrender.com/content/gallery?imageUrl=${encodeURIComponent(imageUrl)}`
      );
  
      setImages(response.data.images); // Atualiza a galeria com as imagens restantes
      alert('Imagem removida com sucesso!');
    } catch (error) {
      console.error('Erro ao remover imagem:', error);
      alert('Erro ao remover imagem.');
    }
  };  

  return (
    <div className="container">
      <h2>Gerenciar Galeria</h2>
      <form onSubmit={handleUpload}>
        <input type="file" multiple onChange={handleImageChange} />
        <button type="submit">Adicionar Imagens</button>
      </form>
      <div className="gallery" id="galeria-container">
        {images.map((url, index) => (
          <div key={index} className="gallery-item">
            <img src={url} alt={`Galeria ${index}`} />
            <button onClick={() => handleRemove(url)}>Remover</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryForm;
