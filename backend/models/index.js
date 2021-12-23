const mongoose = require("mongoose");
const UserSchema = require("./schemas/user");
const JoinChallengeeSchema = require('./schemas/joinChallenge');
const ChallengeSchema = require("./schemas/challenge");
const attendanceCheckSchema = require('./schemas/attendanceCheck');

exports.Challenge = mongoose.model("Challenge", ChallengeSchema);
exports.User = mongoose.model("User", UserSchema);
exports.JoinChallenge = mongoose.model("JoinChallenge", JoinChallengeeSchema);
exports.attendanceCheck = mongoose.model("attendanceCheck", attendanceCheckSchema);
