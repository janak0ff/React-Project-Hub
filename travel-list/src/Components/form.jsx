import { useState } from "react";

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

export default Form;
