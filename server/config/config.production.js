const ES_HOST = process.env.ES_PORT_9200_TCP ? process.env.ES_PORT_9200_TCP.replace('tcp', 'http') : 'http://es:9200';

export default {
  "es": {
    "host": ES_HOST,
    "log": "debug"
  },
  "import": {
    "host": "http://e.pu1se.work:9200",
    "log": "trace"
  },
  "loki": {
    "orders": "/var/data/loki/orders.json",
    "users": "server/config/users.json"
  }
};
