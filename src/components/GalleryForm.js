import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GalleryForm = () => {
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  fetch('http://localhost:3000/content/gallery')
  .then((response) => response.json())
  .then((data) => {
    console.log('Dados da galeria:', data); // Loga os dados recebidos
    const container = document.getElementById('galeria-container');
    data.images.forEach((url) => {
      const img = document.createElement('img');
      img.src = url;
      img.alt = 'Imagem da galeria';
      container.appendChild(img);
    });
  })
  .catch((error) => console.error('Erro ao carregar galeria:', error));

  // Fetch da galeria ao carregar o componente
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get('http://localhost:3000/content/gallery');
        setImages(response.data.images || []);
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
      const response = await axios.put('http://localhost:3000/content/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImages(response.data.images); // Atualiza o estado com as URLs recebidas do backend
      setNewImages([]);
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
      const response = await axios.delete('http://localhost:3000/content/gallery', {
        data: { imageUrl },
      });
      setImages(response.data.images);
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
      <div className="gallery">
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
