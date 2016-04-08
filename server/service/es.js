import config from '../config';
import {Client} from 'elasticsearch';

/** Elasticsearch client **/
const es = new Client({
  host: config.es.host,
  log: config.es.log
});
export default es;
