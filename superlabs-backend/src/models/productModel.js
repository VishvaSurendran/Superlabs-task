const db = require('../config/db');

const Product = {
    async find(keyword, limit, offset) {
        const sql = `
      SELECT * FROM products 
      WHERE name ILIKE $1 OR description ILIKE $1 
      LIMIT $2 OFFSET $3`;
        const { rows } = await db.query(sql, [`%${keyword}%`, limit, offset]);
        return rows;
    },

    async findBySku(sku) {
        const { rows } = await db.query('SELECT * FROM products WHERE sku = $1', [sku]);
        return rows[0];
    },

    async create(data) {
        const { name, description, price, images, sku, availability } = data;
        const sql = `
      INSERT INTO products (name, description, price, images, sku, availability) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const { rows } = await db.query(sql, [name, description, price, images, sku, availability]);
        return rows[0];
    },

    async update(id, data) {
        const { name, description, price, images, sku, availability } = data;
        const sql = `
        UPDATE products 
        SET name = $1, description = $2, price = $3, images = $4, sku = $5, availability = $6
        WHERE id = $7 RETURNING *`;
        const { rows } = await db.query(sql, [name, description, price, images, sku, availability, id]);
        return rows[0];
    },

    async remove(id) {
        await db.query('DELETE FROM products WHERE id = $1', [id]);
    },

    async update(id, data) {
        const { name, description, price, images, sku, availability, reviews } = data;
        const sql = `
        UPDATE products 
        SET name = $1, description = $2, price = $3, images = $4, sku = $5, availability = $6, reviews = $7
        WHERE id = $8 RETURNING *`;
        const { rows } = await db.query(sql, [
            name,
            description,
            price,
            images,
            sku,
            availability,
            JSON.stringify(reviews), 
            id
        ]);
        return rows[0];
    },
};



module.exports = Product;