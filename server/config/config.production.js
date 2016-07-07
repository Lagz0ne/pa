const ES_HOST = process.env.ES_PORT_9200_TCP ? process.env.ES_PORT_9200_TCP.replace('tcp', 'http') : 'http://es:9200';
const FILE = process.env.FILE ? process.env.FILE : 'data.csv';

export default {
  "es": {
    "host": ES_HOST,
    "log": "debug"
  },
  "import": {
    "host": "http://pu1se.work:9200",
    "log": "debug",
    "file": './files/' + 'DNIM-2016-2.csv'
  },
  "loki": {
    "orders": "/var/data/loki/orders.json",
    "users": "server/config/users.json"
  }
};
