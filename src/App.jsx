import React, { useState, useEffect } from "react";

function TodoApp() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  function addItem() {
    if (inputValue.trim()) {
      setItems([...items, inputValue]);
      setInputValue("");
    }
  }

  function editItem(index) {
    const value = items[index];
    const newValue = prompt("Enter a new value:", value);
    if (newValue) {
      const newItems = [...items];
      newItems[index] = newValue;
      setItems(newItems);
    }
  }

  function deleteItem(index) {
    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
  }

  return (
    <div className="container">
      <h1>
        <span>Ali's</span> ToDo App
      </h1>
      <div className="input-container">
        <input
          type="text"
          id="input"
          placeholder="Enter your Items"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <ul id="list">
        {items.map((item, index) => (
          <li key={index}>
            {item} <button onClick={() => editItem(index)}>Edit</button>{" "}
            <button onClick={() => deleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
