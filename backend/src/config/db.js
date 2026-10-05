const { Sequelize } = require("sequelize");

// SQLite is used for easy local development with zero setup — the
// database is just a file (dev.db) created automatically.
//
// For a shared/staging environment, switch to Postgres/MySQL (per the SAD)
// by changing `dialect` and supplying host/user/password/database, e.g.:
//
// const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: "postgres" });

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DATABASE_FILE || "./dev.db",
  logging: false,
});

module.exports = sequelize;
