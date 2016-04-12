import * as orderService from '../service/orderService';
import _ from 'lodash';

export function createOrder(req, res) {
  const loggedInUser = req.user;
  const ids = req.body.ids;
  const affinity = req.body.affinity;
  const type = req.body.type;

  orderService.createOrderAndCheck(affinity, ids, type, loggedInUser)
    .subscribe(
      result => res.json(result),
      err    => {
        res.status(400);
        res.json({error: err, ids});
      }
    );
}

export function reset(req, res) {
  if (!req.user.isOrdinaryUser) {
    res.json(403);
    return;
  }

  orderService.resetOrder(req.body.type, req.body.orderId, req.user)
    .subscribe(
      result => res.json(result),
      err => {
        res.status(400);
        res.json({error, err, ids});
      }
    );
}

export function getOpenningOrders(req, res) {
  res.json(orderService.getOpenningOrders(req.user));
}

export function getCheckingOutOrders(req, res) {
  res.json(orderService.getCheckingOutOrders());
}

export function packedAndTakeNext(req, res) {
  res.json(orderService.packedAndTakeNext(req.body.orderId, req.user));
}

export function pickedAndTakeNext(req, res) {
  res.json(orderService.pickedAndTakeNext(req.body.orderId, req.user));
}

export function packed(req, res) {
  res.json(orderService.packed(req.body.orderId, req.user));
}

export function picked(req, res) {
  res.json(orderService.picked(req.body.orderId, req.user));
}

export function getNextPackingOrder(req, res) {
  res.json(orderService.getNextPackingOrder(req.user));
}

export function getNextPickingOrder(req, res) {
  res.json(orderService.getNextPickingOrder(req.user));
}
