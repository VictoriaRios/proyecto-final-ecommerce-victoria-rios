import { getAllProducts, getProductById, createProduct, patchProductById,  deleteProductById ,updateProduct, getProductByBRAND } from '../models/productsModel.js'

// GET ALL PRODUCTS 
export const getProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        if (products.length === 0) {
            return res.status(404).json({ error: 'No products found' });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error('Error obtaining the products:', error);
        res.status(500).json({ error: 'Error obtaining the products' });
    }
}; 

// GET PRODUCT BY BRAND 
export const getProductByBrand = async (req,res) =>{
    const brand = req.params.brand;
    try{
        const product = await getProductByBRAND(brand);
        if (product.length === 0) {
            return res.status(404).json({ error: 'No products found for this brand' });
        }
        res.status(200).json(product);
    }catch (error) {
        console.error('Error getting products by brand:', error);
        res.status(500).json({ error: 'Error getting products by brand' });
    }
}

// GET PRODUCT BY ID 
export const getProductsByID = async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        res.status(200).json(product);
    } catch (error) {
        console.error('Error getting product:', error);
        res.status(500).json({ error: 'Error getting the product' });
    }
};

// POST PRODUCT 
export const newProduct = async (req, res) => {
    const { brand, color, name, price } = req.body;

    if (!name || !price || !brand || !color) {
        return res.status(400).json({ error: 'Complete all parameters' });
    }

    try {
        const newProduct = {
            brand: brand.trim(),
            color: color.trim(),
            name: name.trim(),
            price: parseFloat(price),
        };

    const savedProduct = await createProduct(newProduct);
    res.status(201).json(savedProduct);

    } catch (error) {
        console.error('Error creating the product:', error);
        res.status(500).json({ error: 'Error creating the product' });
    }
};

// PATCH PRODUCT 
export const patchProduct = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updated = await patchProductById(id, updates);
        if (!updated) return res.status(404).json({ error: 'Product not found' });

        res.status(200).json(updated);
    } catch (error) {
        console.error('Error patching product:', error);
        res.status(500).json({ error: 'Error patching the product' });
    }
};


// UPDATE PRODUCT 
export const editProduct = async (req, res) => {
    const { id } = req.params;
    const { brand, color, name, price } = req.body;

    if (!name || !price || !brand || !color) {
        return res.status(400).json({ error: 'Complete all parameters' });
    }

    const updatedData = {
        brand: brand.trim(),
        color: color.trim(),
        name: name.trim(),
        price: parseFloat(price),
    };

    try {
        const updatedProduct = await updateProduct(id, updatedData);

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(updatedProduct);

    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Error updating the product' });
    }
};

// DELETE PRODUCT 
export const deleteById = async (req, res) => {
    try {
        const product = await deleteProductById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        res.status(200).json({ message: 'Product deleted', id: product.id, name: product.name });
    } catch (error) {
        res.status(500).json({ error: 'Internal error' });
    }
};
