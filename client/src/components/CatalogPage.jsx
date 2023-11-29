import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CatalogCard from "./CatalogCard/CatalogCard";
import BASE_URL from "../config";
import '@fortawesome/fontawesome-free/css/all.css';


const Catalog = () => {
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts${searchTerm ? `?q=${searchTerm}` : ''}`);
        if (response.ok) {
          const data = await response.json();
          setEntries(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
       
      }
    };

    fetchPosts();
  }, [searchTerm]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="logo">
    <div className="search-bar">
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
    </div>
    {entries.length > 0 ? (
      entries.map((entry) => (
        <CatalogCard key={entry._id} {...entry} />
      ))
    ) : (
      <p>No matching posts found.</p>
    )}
  </div>
  );
};

export default Catalog;
