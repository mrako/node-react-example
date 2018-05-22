var Sequelize = require('sequelize');

/** INIT DATABASE **/

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://example:example@localhost/example';

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false,
});

/** INIT CHAT TABLE WITH MESSAGE **/

const Chat = sequelize.define('chats', {
  message: Sequelize.TEXT,
});

Chat.prototype.toJSON = function () {
  return {
    // Id and timestamps are generated automatically
    id: this.id,
    createdAt: this.createdAt,

    // Message was added on the POST request
    message: this.message,
  };
};

/** EXPORT CHAT OBJECT **/

exports.sync = (options) => {
  return sequelize.sync(options);
};

exports.Chat = Chat;
