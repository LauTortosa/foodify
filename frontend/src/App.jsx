import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/items`)
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
