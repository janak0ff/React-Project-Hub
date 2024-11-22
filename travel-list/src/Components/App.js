import { useState } from "react";
import Logo from './logo'
import Form from './form'
import PackingList from './PackingList'
import Stats from './stats'


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
  function handleClarList() {
    const conformed = window.confirm(
      "Are you sure to clear the items in your packing lists."
    );
    if (conformed) setItems([]);
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
        onClearList={handleClarList}
      />
      {/* Render the Stats component and pass items as a prop */}
      <Stats items={items} />
    </div>
  );
}

export default App;
