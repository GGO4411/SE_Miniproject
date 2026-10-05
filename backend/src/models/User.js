const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Member 1 owns this model. Members 2-4 will add Event, Registration,
// Payment, and Notification models alongside this one as the project grows
// (see the field layouts in the SRS Appendix B for their shapes).
const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM("ATTENDEE", "ORGANIZER", "ADMIN"),
      allowNull: false,
      defaultValue: "ATTENDEE",
    },
    isVerified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    // Simple brute-force protection (SRS REQ-3 / NFR-Sec-2)
    failedAttempts: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    lockUntil: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;
