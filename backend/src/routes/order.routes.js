import { Router } from "express";
import { methods as OrderMethods } from '../controllers/order.controller'

const router = Router()

router.get('/', OrderMethods.getOrders);
router.get('/:id', OrderMethods.getOrder);

export default router;
