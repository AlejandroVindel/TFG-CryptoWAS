require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/shz5-bMFSR69Vix1zpRDSiPWuXvpPsVo',
      accounts: ['76325905d897c764815abfdb2eb9471ca7cc538226a20eae37bfb18b3e847927'],
    },
  },
};