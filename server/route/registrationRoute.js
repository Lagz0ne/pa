import express from 'express';
import * as registrationHttp from './registrationHttp';
const router = express.Router();

router.get('/search', registrationHttp.search);
router.post('/pickup', registrationHttp.pickup);

export default router;
