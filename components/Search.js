import { useState } from "react";

const Search = ({ setPage, getArtists }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    let word = e.target.value;
    setSearch(word);

    if (word.length <= 2) {
      getArtists(`limit=12&page=1`);
    }

    if (word.length > 2) {
      setPage(1);
      getArtists(`search=${word}`);
    }
  };

  console.log(search);

  return (
    <div>
      <input
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Rechercher un artiste"
        required
        value={search}
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
};

export default Search;
