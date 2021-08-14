// const HDWalletProvider = require("@truffle/hdwallet-provider");
// const INFURA_KEY = "c2dde5d7c0a0465a8e994f711a3a3c31";
// const METAMASK_MNEMONIC =
//   "pink dose endorse soccer demand pink fringe search always invest twin tower";
// const RINKEBY_KEY = "c2dde5d7c0a0465a8e994f711a3a3c31";
// const NETWORK_NAME = "rinkeby";
// const OWNER_ADDRESS = "0x8CA35f878fD14992b58a18bEB484f721b1d07A33";
// // const NODE_API_KEY = "live";
// const NODE_API_KEY = "rinkeby";

// if (!METAMASK_MNEMONIC || !NODE_API_KEY) {
//   console.error("Please set a mnemonic and ALCHEMY_KEY or INFURA_KEY.");
//   process.exit(0);
// }

// const RINKEBY_NODE_URL = `https://rinkeby.infura.io/v3/${RINKEBY_KEY}`;
// const MAIN_NODE_URL = `https://mainnet.infura.io/v3/${INFURA_KEY}`;
// module.exports = {
//   /**
//    * Networks define how you connect to your ethereum client and let you set the
//    * defaults web3 uses to send transactions. If you don't specify one truffle
//    * will spin up a development blockchain for you on port 9545 when you
//    * run `develop` or `test`. You can ask a truffle command to use a specific
//    * network from the command line, e.g
//    *
//    * $ truffle test --network <network-name>
//    */

//   networks: {
//     development: {
//       host: "localhost",
//       port: 8545,
//       network_id: "*",
//     },
//     rinkeby: {
//       provider: function () {
//         return new HDWalletProvider({
//           mnemonic: {
//             phrase: METAMASK_MNEMONIC,
//           },
//           providerOrUrl: RINKEBY_NODE_URL,
//           pollingInterval: 200000,
//         });
//       },
//       network_id: 4,
//       gas: 4500000,
//       gasPrice: 10000000000,
//       confirmations: 10,
//       timeoutBlocks: 4000,
//       networkCheckTimeout: 999999,
//       skipDryRun: true,
//     },
//     // Useful for deploying to a public network.
//     // NB: It's important to wrap the provider as a function.
//     // ropsten: {
//     // provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/YOUR-PROJECT-ID`),
//     // network_id: 3,       // Ropsten's id
//     // gas: 5500000,        // Ropsten has a lower block limit than mainnet
//     // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
//     // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
//     // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
//     // },
//     // Useful for private networks
//     // private: {
//     // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
//     // network_id: 2111,   // This network is yours, in the cloud.
//     // production: true    // Treats this network as if it was a public net. (default: false)
//     // }
//   },

//   // Set default mocha options here, use special reporters etc.

//   // Configure your compilers
//   compilers: {
//     solc: {
//       version: "0.5.5", // Fetch exact version from solc-bin (default: truffle's version)
//       // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
//       // settings: {          // See the solidity docs for advice about optimization and evmVersion
//       //  optimizer: {
//       //    enabled: false,
//       //    runs: 200
//       //  },
//       //  evmVersion: "byzantium"
//       // }
//     },
//   },

//   // Truffle DB is currently disabled by default; to enable it, change enabled: false to enabled: true
//   //
//   // Note: if you migrated your contracts prior to enabling this field in your Truffle project and want
//   // those previously migrated contracts available in the .db directory, you will need to run the following:
//   // $ truffle migrate --reset --compile-all

//   db: {
//     enabled: false,
//   },
// };
