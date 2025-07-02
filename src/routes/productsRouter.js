import e, {Router} from 'express';
const router = Router();

import {getProducts, getProductById, newProduct, editProduct, deleteById} from '../controllers/productsController.js';

router.get('/sneakers', getProducts); //GET ALL
router.get('/sneakers/:id', getProductById); //GET BY ID
router.post('/sneakers/', newProduct); //POST
router.put('/sneakers/:id', editProduct); // PUT BY ID
router.delete('/sneakers/:id', deleteById); //DELETE BY ID

export default router;