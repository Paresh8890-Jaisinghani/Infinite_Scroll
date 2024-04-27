import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../stylesheet/infiniteScroll.css'

function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/items?page=${page}`);
      const responseData = response.data;

      if (Array.isArray(responseData) && responseData.length > 0) {
        setItems(prevItems => [...prevItems, ...responseData]);
        setHasMore(true); // Ensure hasMore is set to true when new items are fetched
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
    setPage(prevPage => prevPage + 1);
  }, [page]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!loading && hasMore) {
        fetchItems();
      }
    }
  }, [loading, hasMore, fetchItems]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className='heading'>
     <div className="nav">
      <h1>Infinite Scroll</h1>
     </div>
     
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {!loading && !hasMore && <p>No more items to load</p>}
    </div>
  );
}

export default InfiniteScroll;
