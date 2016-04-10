import Rx from 'rx';
import lokiDB from 'lokijs';
import _ from 'lodash';
import config from '../config';
import users from '../config/users.json';

const loadHandler = (result) => {
  let userCollection = userDB.getCollection('users');
  if (userCollection == null) {
    console.log("Adding users collection");
    userDB.addCollection('users');
    userCollection = userDB.getCollection('users');

    console.log("Adding all users");
    users.forEach(user => {
      userCollection.insert(user);
    });
  }
}

const userDB = new lokiDB(config.loki.users, {
  autosave: true,
  autoload: true,
  autoloadCallback: loadHandler
});

export function getUser(username, password) {
  return userDB.getCollection('users').findObject({
    '$and': [
      {username}, {password}
    ]});
}
