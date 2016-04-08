import * as orderService from '../service/orderService';
import _ from 'lodash';

export function createOrder(req, res) {
  const loggedInUser = req.user;
  const ids = req.body.ids;
  const affinity = req.body.affinity;

  orderService.createOrderAndCheck(affinity, ids, loggedInUser)
    .subscribe(
      result => res.json(result),
      err    => {
        res.status(400);
        res.json({error: err, ids});
      }
    );
}

export function packedAndTakeNext(req, res) {
  res.json(orderService.packedAndTakeNext(req.body.orderId));
}

export function pickedAndTakeNext(req, res) {
  res.json(orderService.pickedAndTakeNext(req.body.orderId));
}

export function packed(req, res) {
  res.json(orderService.packed(req.body.orderId));
}

export function picked(req, res) {
  res.json(orderService.picked(req.body.orderId));
}

export function getNextPackingOrder(req, res) {
  res.json(orderService.getNextPackingOrder());
}

export function getNextPickingOrder(req, res) {
  res.json(orderService.getNextPickingOrder());
}
