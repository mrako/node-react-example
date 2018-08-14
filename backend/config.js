module.exports = {
  PORT: process.env.PORT || 9000,
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://dinner:dinner@localhost/dinner',
  DEFAULT_LIMIT: 50,
};
