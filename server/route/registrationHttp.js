import * as registrations from '../service/registration';
import _ from 'lodash';

export function search(req, res) {
  registrations.search(req.query.searchKeyword)
    .subscribe(
      result => res.json(result),
      err    => {
        res.status(400);
        res.json({error: err, keyword: req.body.keyword});
      }
    );
}

export function pickup(req, res) {
  console.log(req.body);
  if (req.body.id && _.isString(id)) {
    registrations.pickup(req.body.id)
      .subscribe(
        result => res.json(result),
        err    => {
          res.status(400);
          res.json({error: err, keyword: req.body.id});
        }
      );
  } else if (req.body.ids && _.isArray(req.body.ids)) {
    registrations.pickupAll(req.body.ids)
      .subscribe(
        result => res.json(result),
        err    => {
          res.status(400);
          res.json({error: err, keyword: req.body.ids});
        }
      );
  } else {
    res.status(400);
    res.json({error: 'invalid body format'});
  }
}
