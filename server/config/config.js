const FILE = process.env.FILE ? process.env.FILE : 'data.csv';

export default {
  "es": {
    "host": "http://pu1se.work:9200",
    "log": "trace"
  },
  "import": {
    "host": "http://pu1se.work:9200/",
    "log": "trace",
    "file": './files/' + 'DNIM-2016-2.csv'
  },
  "loki": {
    "orders": "orders.json",
    "users": "server/config/users.json"
  }
};
