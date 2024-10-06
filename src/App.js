import { useState } from "react"; // Importing the useState hook from React to manage component state

// Initial list of friends with their details
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

// Button component to create reusable button elements
function Button({ children, onClick, type = "button" }) {
  return (
    <button className="button" onClick={onClick} type={type}>
      {children}
    </button>
  );
}

// Main App component
export default function App() {
  const [friends, setFriends] = useState(initialFriends); // State for storing friends list
  const [showAddFriend, setShowAddFriend] = useState(false); // State to toggle the form for adding friends
  const [selectedFriend, setSelectedFriend] = useState(null); // State for storing the currently selected friend

  // Toggle the form for adding a new friend
  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  // Set the selected friend or deselect if the same friend is clicked
  function handleSelection(friend) {
    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
    setShowAddFriend(false); // Hide the add friend form when selecting a friend
  }

  // Add a new friend to the friends list
  function handleAddFriend(friend) {
    setFriends((prevFriends) => [...prevFriends, friend]);
    setShowAddFriend(false); // Hide the add friend form after adding
  }

  // Update the balance of the selected friend when a bill is split
  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null); // Deselect the friend after splitting the bill
  }

  return (
    <div className="app">
      <div className="sidebar">
        {/* List of friends */}
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />

        {/* Form for adding a new friend */}
        {showAddFriend && <FormAddFriends onAddFriend={handleAddFriend} />}

        {/* Button to toggle the add friend form */}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>

      {/* Form for splitting a bill with the selected friend */}
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

// Component to display the list of friends
function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

// Component to display a single friend's information
function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend && selectedFriend.id === friend.id; // Check if the friend is selected

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {/* Display the balance status */}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${friend.balance}
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      {/* Button to select or deselect the friend */}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

// Component for the form to add a new friend
function FormAddFriends({ onAddFriend }) {
  const [name, setName] = useState(""); // State for the name input
  const [imgUrl, setImgUrl] = useState("https://i.pravatar.cc/48"); // State for the image URL input

  // Handle form submission to add a new friend
  function handleAddFriendForm(e) {
    e.preventDefault();

    if (!name || !imgUrl) return; // Do nothing if name or image URL is empty

    const id = crypto.randomUUID(); // Generate a unique ID for the new friend
    const newFriend = { id, name, image: `${imgUrl}?u=${id}`, balance: 0 }; // Create a new friend object

    onAddFriend(newFriend); // Add the new friend to the list

    setName(""); // Reset the name input
    setImgUrl("https://i.pravatar.cc/48"); // Reset the image URL input
  }

  return (
    <form className="form-add-friend" onSubmit={handleAddFriendForm}>
      <label>🙍 Friend Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🖼️ Image URL</label>
      <input
        type="text"
        value={imgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
      />

      <Button type="submit">Add</Button>
    </form>
  );
}

// Component for the form to split a bill with a friend
function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState(""); // State for the total bill amount
  const [paidByUser, setPaidByUser] = useState(""); // State for the amount paid by the user
  const paidByFriend = bill ? bill - paidByUser : ""; // Calculate the amount paid by the friend
  const [whoIsPaying, setWhoIsPaying] = useState("user"); // State for who is paying the bill

  // Handle form submission to split the bill
  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return; // Do nothing if bill or paidByUser is empty

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser); // Update the friend's balance
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>🤑 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🙍 Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>👭 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>💰 Who is paying the bill.</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button type="submit">Split Bill</Button>
    </form>
  );
}
