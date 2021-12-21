const mongoose = require("mongoose");
const UserSchema = require("./schemas/user");
const JoinChallengeeSchema = require('./schemas/joinChallenge');
const ChallengeSchema = require("./schemas/challenge");
const attendenceCheckSchema = require('./schemas/attendenceCheck');

exports.Challenge = mongoose.model("Challenge", ChallengeSchema);
exports.User = mongoose.model("User", UserSchema);
exports.JoinChallenge = mongoose.model("JoinChallenge", JoinChallengeeSchema);
exports.attendenceCheck = mongoose.model("attendenceCheck", attendenceCheckSchema);
