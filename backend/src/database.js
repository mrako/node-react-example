var Sequelize = require('sequelize');
const config = require('../config');

/** INIT DATABASE **/

const sequelize = new Sequelize(config.DATABASE_URL, {
  operatorsAliases: false,
  logging: false,
});

/** INIT CHAT TABLE WITH MESSAGE **/

const Chat = sequelize.define('chats', {
  message: Sequelize.TEXT,
});

Chat.prototype.toJSON = function toJSON() {
  return {
    id: this.id,
    message: this.message,
    createdAt: this.createdAt,
  };
};

/* EXPORT OBJECTS AND OPERATIONS */

exports.Chat = Chat;

exports.sync = options => sequelize.sync(options);
exports.transaction = options => sequelize.transaction(options);
exports.close = options => sequelize.close(options);

