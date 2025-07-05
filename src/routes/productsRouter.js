import  {Router} from 'express';
import {getProducts, getProductsByID, newProduct, patchProduct, editProduct, deleteById, getProductByBrand} from '../controllers/productsController.js';

import { authenticateToken } from '../middleware/authenticateToken.js';;

const router = Router();
router.use(authenticateToken);


router.get('/sneakers', getProducts); //GET ALL 
router.get('/sneakers/brand/:brand', getProductByBrand); //GET BY BRAND
router.get('/sneakers/:id', getProductsByID); //GET BY ID

router.post('/sneakers/', newProduct); //POST

router.patch('/sneakers/:id', patchProduct); //PATCH 

router.put('/sneakers/:id', editProduct); // PUT 

router.delete('/sneakers/:id', deleteById); //DELETE 

export default router;