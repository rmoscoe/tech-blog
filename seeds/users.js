const { User } = require(path.join(dirname, "../models"));

const userdata = [
    {
        username: "neo",
        password: "IKnowKungFu"
    },
    {
        username: "agentsmith",
        password: "goodbyeMrAnderson"
    },
    {
        username: "trinity",
        password: "FollowtheWhiteRabbit"
    }
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;