const FILE = process.env.FILE ? process.env.FILE : 'data.csv';

export default {
  "es": {
    "host": "http://localhost:9200",
    "log": "trace"
  },
  "import": {
    "host": "http://localhost:9200/",
    "log": "trace",
    "file": './files/' + FILE
  },
  "loki": {
    "orders": "orders.json",
    "users": "server/config/users.json"
  }
};
