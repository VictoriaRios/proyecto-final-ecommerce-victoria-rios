import  {Router} from 'express';
const router = Router();

import {getProducts, getProductsByID, getProductByName, newProduct, patchProduct, editProduct, deleteById} from '../controllers/productsController.js';

router.get('/sneakers', getProducts); //GET ALL ok
router.get('/sneakers/name/:name', getProductByName);
router.get('/sneakers/:id', getProductsByID); //GET BY ID
router.post('/sneakers/', newProduct); //POST
router.patch('/sneakers/:id', patchProduct); //PATCH BY ID
router.put('/sneakers/:id', editProduct); // PUT BY ID
router.delete('/sneakers/:id', deleteById); //DELETE BY ID

export default router;