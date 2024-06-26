import React, { useState } from 'react';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);

    // Simulate fetching suggestions based on the query (e.g., from an API)
    const fetchedSuggestions = fetchSuggestions(value);
    setSuggestions(fetchedSuggestions);
  };

  const fetchSuggestions = (query) => {
    // Simulate fetching suggestions from an API
    // Replace this with your actual API call to fetch suggestions
    const suggestions = [
      'Apple',
      'Banana',
      'Orange',
      'Pineapple',
      'Strawberry',
      'Watermelon',
    ];
    return suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:border-blue-500"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />
      {query && (
        <ul className="absolute z-1001 bg-white border border-gray-300 mt-1 w-64 rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
