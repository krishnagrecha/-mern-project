import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";


const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSideBarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); 

  
  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = 
        [
   {
        _id:1,
        name:"Product 1",
        price: 100,
        images: [{url: "https://picsum.photos/500/500?random=3"}]
    },
     {
        _id:2,
        name:"Product 2",
        price: 100,
        images: [{url: "https://picsum.photos/500/500?random=4"}]
    },
     {
        _id:3,
        name:"Product 3",
        price: 100,
        images: [{url: "https://picsum.photos/500/500?random=5"}]
    },
     {
        _id:4,
        name:"Product 4",
        price: 100,
        images: [{url: "https://picsum.photos/500/500?random=6"}]
    },
      {
        _id:5,
        name:"Product 1",
        price: 100,
        images: [{url: "https://picsum.photos/500/500?random=7"}]
    },
     {
        _id:6,
        name:"Product 2",
        price: 100,
        images: [{url: "https://picsum.photos/500/500?random=8"}]
    },
     {
        _id:7,
        name:"Product 3",
        price: 100,
        images: [{url: "https://picsum.photos/500/500?random=9"}]
    },
     {
        _id:8,
        name:"Product 4",
        price: 100,
        images: [{url: "https://picsum.photos/500/500?random=10"}]
    },

      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter button */}
      <button
        onClick={toggleSideBar}
        className="lg:hidden border p-2 m-4 flex justify-center items-center cursor-pointer rounded-md"
      >
        <FaFilter className="mr-2" />
        <span>Filter</span>
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          isSideBarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0 lg:shadow-none lg:w-1/4 xl:w-1/5 `}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>

       
        <SortOptions />
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
