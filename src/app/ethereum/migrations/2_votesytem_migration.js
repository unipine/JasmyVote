// eslint-disable-next-line no-undef
const VoteSystem = artifacts.require("VoteSystem");

module.exports = function (deployer) {
    deployer.deploy(VoteSystem);
};
