import { useState } from "react";
import Item  from '../Components/items';

 function PackingList({ items, onDeleteItems, onToggleCheckbox, onClearList }) {
  // State to keep track of the current sort criteria
  const [sortBy, setSortBy] = useState("");

  // Variable to hold the sorted items
  let sortedItems;

  // Sort items based on the selected sort criteria
  if (sortBy === "input") {
    sortedItems = items;
  } else if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  } else if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  } else {
    // Default case if no sorting is selected
    sortedItems = items;
  }

  return (
    <div className="list">
      <ul>
        {/* Map over the items and render an Item component for each */}
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id} // Unique key for each item
            onDeleteItems={onDeleteItems}
            onToggleCheckbox={onToggleCheckbox}
          />
        ))}
      </ul>

      <div className="actions">
        {/* Dropdown to select sorting criteria */}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Input</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sort by Packed</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}

export default PackingList;
