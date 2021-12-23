const mongoose = require("mongoose");
const UserSchema = require("./schemas/user");
const ChallengeSchema = require("./schemas/challenge");
const attendanceCheckSchema = require('./schemas/attendanceCheck');

exports.Challenge = mongoose.model("Challenge", ChallengeSchema);
exports.User = mongoose.model("User", UserSchema);
exports.attendanceCheck = mongoose.model("attendanceCheck", attendanceCheckSchema);
