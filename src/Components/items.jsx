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

export default Item;
