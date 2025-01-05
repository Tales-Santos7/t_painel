import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MainSectionDisplay = () => {
  const [mainSection, setMainSection] = useState(null);

  useEffect(() => {
    // Carregar a seção principal
    const fetchMainSection = async () => {
      try {
        const response = await axios.get('http://localhost:3000/content/mainSection');
        setMainSection(response.data);
      } catch (error) {
        console.error('Erro ao carregar a seção principal:', error);
      }
    };

    fetchMainSection();
  }, []);

  if (!mainSection) {
    return <p>Carregando seção principal...</p>;
  }
};
export default MainSectionDisplay;
