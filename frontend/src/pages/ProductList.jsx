import { getAllProducts, getProductsByCategory, sortProducts, filterProductsByDate } from '../features/products/productSlice';
import ProductItem from '../components/ProductItem.jsx';
import ProductModal from '../components/ProductModal.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'inactive'

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleCategoryFilter = (category) => {
    if (category === 'All') {
      dispatch(getAllProducts());
    } else {
      dispatch(getProductsByCategory(category));
    }
  };

  const handleSort = () => {
    dispatch(sortProducts({ field: sortField, order: sortOrder }));
  };

  const handleDateFilter = () => {
    dispatch(filterProductsByDate({ from: fromDate, to: toDate }));
  };

  const finalFilteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'active' ? product.isActive : !product.isActive;
    return matchesSearch && matchesTab;
  });

  if (isLoading) {
    return <h2>Loading products...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div className='product-list-container'>
      <h1>Product List</h1>

      <div className='filter-sort-section'>
        <input
          type='text'
          placeholder='Search products...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select onChange={(e) => setSortField(e.target.value)} value={sortField}>
          <option value='name'>Sort by Name</option>
          <option value='category'>Sort by Category</option>
          <option value='quantity'>Sort by Quantity</option>
        </select>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value='asc'>Ascending</option>
          <option value='desc'>Descending</option>
        </select>
        <button onClick={handleSort}>Sort</button>

        <input type='date' value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <input type='date' value={toDate} onChange={(e) => setToDate(e.target.value)} />
        <button onClick={handleDateFilter}>Filter by Date</button>
      </div>

      <div className='category-filter-buttons'>
        <button onClick={() => handleCategoryFilter('All') }>All</button>
        <button onClick={() => handleCategoryFilter('Beauty')}>Beauty</button>
        <button onClick={() => handleCategoryFilter('Electronics')}>Electronics</button>
        <button onClick={() => handleCategoryFilter('Furniture')}>Furniture</button>
        <button onClick={() => handleCategoryFilter('Fashion')}>Fashion</button>
        <button onClick={() => handleCategoryFilter('Food')}>Food</button>
      </div>

      <div className='product-tabs'>
        <button onClick={() => setActiveTab('active')} className={activeTab === 'active' ? 'active' : ''}>Active Products</button>
        <button onClick={() => setActiveTab('inactive')} className={activeTab === 'inactive' ? 'active' : ''}>Inactive Products</button>
      </div>

      <div className='product-grid'>
        {finalFilteredProducts.map((product) => (
          <div key={product._id} onClick={() => setSelectedProduct(product)}>
            <ProductItem product={product} />
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default ProductList;