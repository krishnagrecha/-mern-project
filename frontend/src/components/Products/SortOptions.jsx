

import React from 'react';

const SortOptions = () => {
  return (
    <div className="mb-4 flex items-center justify-end">
      <select id="sort" className="border p-2 rounded-md focus:outline-none">
        <option value="default">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOptions;