import React, { useState } from 'react';
import styles from './ReviewCard.module.css';

const ReviewCard = ({ products, onReviewAdded }) => {
    const [review, setReview] = useState({ productId: '', user: '', rating: 5, comment: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!review.productId) return alert("Select a product first");

        try {
            const product = products.find(p => p.id === parseInt(review.productId));

            const updatedReviews = [...(product.reviews || []), {
                user: review.user,
                rating: parseInt(review.rating),
                comment: review.comment
            }];

            const fullUpdatedProduct = {
                ...product,
                reviews: updatedReviews
            };

            await onReviewAdded(review.productId, fullUpdatedProduct);

            setReview({ productId: '', user: '', rating: 5, comment: '' });
            alert("Review added!");
        } catch (err) {
            console.error("Error adding review:", err);
        }
    };

    return (
        <div className={styles.reviewCard}>
            <h3>Add Customer Review</h3>
            <form onSubmit={handleSubmit} className={styles.reviewForm}>
                <select
                    value={review.productId}
                    onChange={e => setReview({ ...review, productId: e.target.value })}
                >
                    <option value="">Select Product...</option>
                    {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                    ))}
                </select>
                <div className={styles.row}>
                    <input placeholder="Customer Name" value={review.user} onChange={e => setReview({ ...review, user: e.target.value })} required />
                    <input type="number" min="1" max="5" value={review.rating} onChange={e => setReview({ ...review, rating: e.target.value })} required />
                </div>
                <textarea placeholder="Review Comment" value={review.comment} onChange={e => setReview({ ...review, comment: e.target.value })} required />
                <button type="submit">Post Review</button>
            </form>
        </div>
    );
};

export default ReviewCard;