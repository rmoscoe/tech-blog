const path = require("path");
const { User } = require(path.join(__dirname, "../models"));

const userdata = [
    {
        id: 1,
        username: "neo",
        password: "IKnowKungFu"
    },
    {
        id: 2,
        username: "agentsmith",
        password: "goodbyeMrAnderson"
    },
    {
        id: 3,
        username: "trinity",
        password: "FollowtheWhiteRabbit"
    }
];

const seedUser = () => User.bulkCreate(userdata, {
    individualHooks: true,
    returning: true
});

module.exports = seedUser;