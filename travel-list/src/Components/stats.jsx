// Stats Component to display statistics about the packing list
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some itmes in your packing list 🧨.</em>
      </p>
    );

  // Calculate the number of packed items
  const packedItems = items.filter((item) => item.packed).length;
  // Calculate the total number of items
  const totalItems = items.length;
  // Calculate the percentage of packed items
  const percentagePacked =
    totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentagePacked === 100
          ? "You got everythings to go 💯"
          : ` You have ${totalItems} items on your list and you have already packed
        ${packedItems} (${percentagePacked}%).`}
      </em>
    </footer>
  );
}

export default Stats;
