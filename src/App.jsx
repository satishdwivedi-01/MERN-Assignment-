import { useState, useEffect } from "react";

function App() {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [entries, setEntries] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] 
  );

  useEffect(() => {
    const savedEntries = localStorage.getItem("calorieEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  },[]);


  const handleAddEntry = (e) => {
    e.preventDefault();

    if (!food || !calories) {
      alert("Please enter food and calorie information.");
      return;
    }

    const newEntry = { food : food, calories: Number(calories) };

  
    const updatedEntries = { ...entries };
    if (!updatedEntries[selectedDate]) {
      updatedEntries[selectedDate] = [];
    }
    updatedEntries[selectedDate].push(newEntry);
    setEntries(updatedEntries);
    localStorage.setItem("calorieEntries", JSON.stringify(updatedEntries));
   
    setFood("");
    setCalories("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-xl font-bold mb-4">Calorie Tracker</h1>

     
      <div className="bg-white p-4 rounded shadow w-80 mb-6">
        <label className="block mb-2">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />

        <label className="block mb-2">Food:</label>
        <input
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="e.g., Banana"
          className="block w-full mb-4 p-2 border rounded"
        />

        <label className="block mb-2">Calories:</label>
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="e.g., 105"
          className="block w-full mb-4 p-2 border rounded"
        />

        <button
          onClick={handleAddEntry}
          className="bg-blue-500 text-white py-2 w-full rounded hover:bg-blue-400"
        >
          Add Entry
        </button>
      </div>

      
      <div className="bg-white p-4 rounded shadow w-80">
        <h2 className="text-lg font-bold mb-4">Entries for {selectedDate}</h2>
        {entries[selectedDate] && entries[selectedDate].length > 0 ? (
          <ul>
            {entries[selectedDate].map((entry, index) => (
              <li
                key={index}
                className="flex justify-between p-2 border-b last:border-b-0"
              >
                <span>{entry.food}</span>
                <span>{entry.calories} cal</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No entries for this date.</p>
        )}
      </div>
    </div>
  );
}

export default App;

