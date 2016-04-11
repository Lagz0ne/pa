import express from 'express';
import * as orderHttp from './orderHttp';
const router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.status('403').end();
}

router.get('/', ensureAuthenticated, orderHttp.getOpenningOrders);
router.get('/checkingOut', orderHttp.getCheckingOutOrders);
router.post('/', ensureAuthenticated, orderHttp.createOrder);
router.get('/next/pack', ensureAuthenticated, orderHttp.getNextPackingOrder);
router.post('/packed', ensureAuthenticated, orderHttp.packed);
router.post('/packedAndTakeNext', ensureAuthenticated, orderHttp.packedAndTakeNext);

router.get('/next/pick', ensureAuthenticated, orderHttp.getNextPickingOrder);
router.post('/picked', ensureAuthenticated, orderHttp.picked);
router.post('/pickedAndTakeNext', ensureAuthenticated, orderHttp.pickedAndTakeNext);

router.delete('/', ensureAuthenticated, orderHttp.reset);

export default router;
