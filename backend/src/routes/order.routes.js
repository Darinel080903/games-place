import { Router } from "express";
import { methods as OrderMethods } from '../controllers/order.controller'

const router = Router()

router.get('/', OrderMethods.getOrders);
router.get('/:id', OrderMethods.getOrder);
router.post('/', OrderMethods.addOrder);
router.put('/:id', OrderMethods.updateOrder);
router.delete('/:id', OrderMethods.deleteOrder);
router.get('/user/:user_id', OrderMethods.getOrderByUser);
router.put('/detail/:id', OrderMethods.updateOrderDetail);
router.post('/detailitem/', OrderMethods.deleteItemFromOrderDetail);
router.post('/detailstatus/', OrderMethods.updateItemFromOrderDetailStatus);
router.get('/user/:user_id/game/:game_id', OrderMethods.getOrderByUserAndGameId);

export default router;
