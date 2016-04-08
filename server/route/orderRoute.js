import express from 'express';
import * as orderHttp from './orderHttp';
const router = express.Router();

router.post('/', orderHttp.createOrder);
router.get('/next/pack', orderHttp.getNextPackingOrder);
router.post('/packed', orderHttp.packed);
router.post('/packedAndTakeNext', orderHttp.packedAndTakeNext);

router.get('/next/pick', orderHttp.getNextPickingOrder);
router.post('/picked', orderHttp.picked);
router.post('/pickedAndTakeNext', orderHttp.pickedAndTakeNext);

export default router;
