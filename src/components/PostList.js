import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null, // Para imagem no caso de edição
  });

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://portifolio-taty.onrender.com/blog');
        setPosts(response.data);
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
      }
    };
    fetchPosts();
  }, []);

  // Handle editing
  const handleEditClick = (post) => {
    setEditingPost(post._id);
    setFormData({
      title: post.title,
      content: post.content,
      image: null, // Quando edita, mantém a imagem atual
    });
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setFormData({ title: '', content: '', image: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  const handleSaveChanges = async () => {
    try {
      const updatedData = new FormData();
      updatedData.append('title', formData.title);
      updatedData.append('content', formData.content);
      if (formData.image) {
        updatedData.append('image', formData.image);
      }

      const response = await axios.put(`https://portifolio-taty.onrender.com/blog/${editingPost}`, updatedData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Post atualizado com sucesso!');
      setEditingPost(null);
      setFormData({ title: '', content: '', image: null });

      const updatedPost = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      alert('Erro ao atualizar post');
    }
  };

  // Handle delete
  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este post?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://portifolio-taty.onrender.com/blog/${postId}`);
      alert('Post excluído com sucesso!');
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Erro ao excluir post:', error);
      alert('Erro ao excluir post');
    }
  };

  return (
    <div className="container">
      <h2>Lista de Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            {editingPost === post._id ? (
              <div>
                <label>
                  Título:
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Conteúdo:
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                  ></textarea>
                </label>
                <label>
                  Imagem:
                  <input type="file" onChange={handleImageChange} />
                </label>
                <button onClick={handleSaveChanges}>Salvar Alterações</button>
                <button onClick={handleCancelEdit}>Cancelar</button>
              </div>
            ) : (
              <div>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
                <button class="editar" onClick={() => handleEditClick(post)}>Editar</button>
                <button onClick={() => handleDelete(post._id)}>Excluir</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
