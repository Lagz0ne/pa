import * as registrations from '../service/registration';

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
  registrations.pickup(req.body.id)
    .subscribe(
      result => res.json(result),
      err    => {
        res.status(400);
        res.json({error: err, keyword: req.body.keyword});
      }
    );
}
