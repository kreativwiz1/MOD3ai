export const CONFIG = {
  CONTRACTS: {
    MOD3POA: '0x641d50581635F408024e9656e37F9bb100dAa8a0',
    MOCKTOKEN: '0xD42c6082016B047B959007e67093C664D2c0145e'
  },
  NETWORK: {
    CHAIN_ID: '0x13882',
    NAME: 'Polygon Amoy Testnet',
    RPC_URL: 'https://rpc.ankr.com/polygon_amoy',
    EXPLORER_URL: 'https://www.oklink.com/amoy',
    CURRENCY: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    }
  }
} as const;