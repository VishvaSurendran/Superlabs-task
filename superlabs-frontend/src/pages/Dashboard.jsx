import React, { useState, useEffect } from 'react';
import { productApi } from '../services/api';
import StatCard from '../components/StatCard';
import styles from './Dashboard.module.css';
import ReviewCard from '../components/ReviewCard';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ name: '', sku: '', price: '', description: '' });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async (q = '') => {
        try {
            const res = await productApi.getProducts(q);
            setProducts(res.data.data);
        } catch (err) {
            console.error("Failed to load products", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await productApi.updateProduct(editId, formData);
            } else {
                await productApi.createProduct(formData);
            }
            resetForm();
            loadProducts();
        } catch (err) {
            alert("Action failed: " + err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this product?")) {
            await productApi.deleteProduct(id);
            loadProducts();
        }
    };

    const handleEdit = (p) => {
        setEditId(p.id);
        setFormData({ name: p.name, sku: p.sku, price: p.price, description: p.description || '' });
    };

    const resetForm = () => {
        setEditId(null);
        setFormData({ name: '', sku: '', price: '', description: '' });
    };

    const handleAddReview = async (productId, updatedData) => {
        await productApi.updateProduct(productId, updatedData);
        loadProducts(); 
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>SuperLabs Admin</h1>

            {/* Modal for Product Details - Task 3 & 5 */}
            {selectedProduct && (
                <div className={styles.overlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2>{selectedProduct.name}</h2>
                            <span className={selectedProduct.availability ? styles.inStock : styles.outOfStock}>
                                {selectedProduct.availability ? '● In Stock' : '● Out of Stock'}
                            </span>
                        </div>
                        <hr />
                        <div className={styles.modalBody}>
                            <p><strong>SKU:</strong> {selectedProduct.sku}</p>
                            <p><strong>Price:</strong> ${selectedProduct.price}</p>
                            <p><strong>Description:</strong> {selectedProduct.description || 'No description available.'}</p>

                            <div className={styles.reviewSection}>
                                <h3>Customer Reviews</h3>
                                {selectedProduct.reviews && selectedProduct.reviews.length > 0 ? (
                                    selectedProduct.reviews.map((rev, index) => (
                                        <div key={index} className={styles.reviewItem}>
                                            <span><strong>{rev.user}</strong> - {rev.rating} ⭐</span>
                                            <p>"{rev.comment}"</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className={styles.noReviews}>No reviews yet.</p>
                                )}
                            </div>
                        </div>
                        <button className={styles.closeBtn} onClick={() => setSelectedProduct(null)}>Close</button>
                    </div>
                </div>
            )}
            <div className={styles.statsGrid}>
                <div className={styles.statsContainer}>
                    <StatCard title="Total Products" value={products.length} icon="📦" />
                    <StatCard title="Active Listings" value={products.length} icon="✅" />
                </div>

                <ReviewCard products={products} onReviewAdded={handleAddReview} />

            </div>

            <div className={styles.mainGrid}>
                {/* Admin Form Section - Task 4 */}
                <section className={styles.card}>
                    <h2>{editId ? 'Edit Product' : 'Create Product'}</h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                        <input placeholder="SKU" value={formData.sku} onChange={e => setFormData({ ...formData, sku: e.target.value })} required />
                        <input type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                        <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />

                        <div className={styles.formActions}>
                            <button type="submit" className={styles.saveBtn}>{editId ? 'Update' : 'Save'}</button>
                            {editId && <button type="button" className={styles.cancelBtn} onClick={resetForm}>Cancel</button>}
                        </div>
                    </form>
                </section>
                {/* Product List Section - Task 2 */}
                <section className={styles.card}>
                    <div className={styles.listHeader}>
                        <h2>Product List</h2>
                        <input placeholder="Search products..." onChange={e => loadProducts(e.target.value)} />
                    </div>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>SKU</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p.id}>
                                    <td className={styles.prodName} onClick={() => setSelectedProduct(p)}>{p.name}</td>
                                    <td>{p.sku}</td>
                                    <td>${p.price}</td>
                                    <td className={styles.actions}>
                                        <button className={styles.editBtn} onClick={() => handleEdit(p)}>Edit</button>
                                        <button className={styles.deleteBtn} onClick={() => handleDelete(p.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;