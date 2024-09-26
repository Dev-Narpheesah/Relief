import React, { useState } from 'react';
import styles from './ResourceManagement.module.css';

const ResourceManagement = () => {
  const [resources, setResources] = useState([
    { id: 1, name: 'Water Bottles', quantity: 100 },
    { id: 2, name: 'Blankets', quantity: 200 },
  ]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const addResource = () => {
    const newResource = {
      id: resources.length + 1,
      name,
      quantity: parseInt(quantity, 10),
    };
    setResources([...resources, newResource]);
    setName('');
    setQuantity('');
  };

  const deleteResource = (id) => {
    setResources(resources.filter(resource => resource.id !== id));
  };

  return (
    <div className={styles.resourceManagement}>
      <h4>Add New Resource</h4>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Resource Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={addResource}>Add Resource</button>
      </div>
      <h4>Resource List</h4>
      <ul className={styles.resourceList}>
        {resources.map(resource => (
          <li key={resource.id}>
            {resource.name} (Quantity: {resource.quantity})
            <button onClick={() => deleteResource(resource.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceManagement;
