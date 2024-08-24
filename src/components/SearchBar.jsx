export default function SearchBar({ query, setQuery }) {
  function handleSearch(e) {
    setQuery(e.target.value);
  }

  return (
    <input type="text" placeholder="Search Here" onChange={handleSearch} />
  );
}
