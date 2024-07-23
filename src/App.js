import { useState } from "react";

// Main App Component
function App() {
  // State to keep track of the list of items
  const [items, setItems] = useState([]);

  // Function to handle adding a new item to the list
  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  // Function to handle deleting an item from the list by its ID
  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  // Function to handle toggling the packed status of an item by its ID
  function handleToggleCheckbox(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      {/* Render the Logo component */}
      <Logo />
      {/* Render the Form component and pass handleAddItems as a prop */}
      <Form onAddItems={handleAddItems} />
      {/* Render the PackingList component and pass necessary props */}
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItem}
        onToggleCheckbox={handleToggleCheckbox}
      />
      {/* Render the Stats component and pass items as a prop */}
      <Stats items={items} />
    </div>
  );
}

// Logo Component
function Logo() {
  return <h1>Far Away</h1>;
}

// Form Component to add new items
function Form({ onAddItems }) {
  // State to keep track of the description of the new item
  const [description, setDescription] = useState("");
  // State to keep track of the quantity of the new item
  const [quantity, setQuantity] = useState(1);

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Prevent adding an item with an empty description
    if (!description) return;

    // Create a new item object
    const newItem = { description, quantity, packed: false, id: Date.now() };

    // Add the new item to the list
    onAddItems(newItem);

    // Reset the form fields
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      {/* Quantity selection dropdown */}
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* Generate options from 1 to 20 */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      {/* Input field for item description */}
      <input
        type="text"
        placeholder="Items..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {/* Submit button */}
      <button>Add</button>
    </form>
  );
}

// PackingList Component to display the list of items
function PackingList({ items, onDeleteItems, onToggleCheckbox }) {
  return (
    <div className="list">
      <ul>
        {/* Map over the items and render an Item component for each */}
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onToggleCheckbox={onToggleCheckbox}
          />
        ))}
      </ul>
    </div>
  );
}

// Item Component to display individual item details
function Item({ item, onDeleteItems, onToggleCheckbox }) {
  return (
    <li>
      {/* Checkbox to mark the item as packed/unpacked */}
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleCheckbox(item.id)}
      />
      {/* Display item quantity and description with conditional styling */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      {/* Delete button to remove the item */}
      <button onClick={() => onDeleteItems(item.id)}>X</button>
    </li>
  );
}

// Stats Component to display statistics about the packing list
function Stats({ items }) {
  // Calculate the number of packed items
  const packedItems = items.filter(item => item.packed).length;
  // Calculate the total number of items
  const totalItems = items.length;
  // Calculate the percentage of packed items
  const percentagePacked = totalItems === 0 ? 0 : (packedItems / totalItems) * 100;

  return (
    <footer className="stats">
      <em>
        You have {totalItems} items on your list and you have already packed {packedItems} ({percentagePacked.toFixed(1)}%).
      </em>
    </footer>
  );
}

export default App;
