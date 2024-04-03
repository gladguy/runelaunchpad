---
keywords: [advanced, motoko, bitcoin, bitcoin integration, btc]
---

# Basic Bitcoin

[View this sample's code on GitHub](https://github.com/dfinity/examples/tree/master/motoko/basic_bitcoin)

## Overview 
This tutorial will walk you through how to deploy a sample [canister smart contract](https://wiki.internetcomputer.org/wiki/Canister_smart_contract) **that can send and receive Bitcoin** on the Internet Computer.

## Architecture

This example internally leverages the [ECDSA API](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-ecdsa_public_key)
and [Bitcoin API](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-bitcoin-api) of the Internet Computer.

For a deeper understanding of the ICP < > BTC integration, see the [Bitcoin integration documentation](/docs/current/developer-docs/multi-chain/bitcoin/overview).

## Prerequisites

* [x] Install the [IC SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install/index.mdx).

## Step 1: Building and deploying sample code

### Clone the smart contract

To clone and build the smart contract in **Motoko**:

```bash
git clone https://github.com/dfinity/examples
cd examples/motoko/basic_bitcoin
git submodule update --init --recursive
```

### Acquire cycles to deploy

Deploying to the Internet Computer requires [cycles](https://internetcomputer.org/docs/current/developer-docs/setup/cycles) (the equivalent of "gas" in other blockchains). You can get free cycles from the [cycles faucet](https://internetcomputer.org/docs/current/developer-docs/setup/cycles/cycles-faucet.md).

### Deploy the smart contract to the Internet Computer

```bash
dfx deploy basic_bitcoin --argument '(variant { regtest })'
```

#### What this does
- `dfx deploy` tells the command line interface to `deploy` the smart contract
- `--network=ic` tells the command line to deploy the smart contract to the mainnet ICP blockchain
- `--argument '(variant { Testnet })'` passes the argument `Testnet` to initialize the smart contract, telling it to connect to the Bitcoin testnet

**We're initializing the canister with `variant { Testnet }`, so that the canister connects to the the [Bitcoin testnet](https://en.bitcoin.it/wiki/Testnet). To be specific, this connects to `Testnet3`, which is the current Bitcoin test network used by the Bitcoin community.**


If successful, you should see an output that looks like this:

```bash
Deploying: basic_bitcoin
Building canisters...
...
Deployed canisters.
URLs:
Candid:
    basic_bitcoin: https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=<YOUR-CANISTER-ID>
```

bcrt1pxnpfkqg00qflsyutywyynz4mdr3yh46j8xc3tckvqz22tm3vwrashad8ql

After calling get_utxos -- you get address (Canister Address)
miM6NSs5Ymd3zgnE5nK7yVxpbJpSHrTRwr
./bin/bitcoin-cli -conf=$(pwd)/bitcoin.conf generatetoaddress 1 mmEjUTmDdUeLEF3TmL9jrDmRohY1fJhqPz



dfx deploy basic_bitcoin --argument '(variant { regtest })'
/home/waheed/bin/ord --datadir '/home/waheed/Bitcoin/bitcoin-25.0/data' wallet balance
bitcoin-cli -datadir='/home/waheed/Bitcoin/bitcoin-25.0/data' getblockchaininfo


Step 0: cd /home/waheed/Bitcoin/bitcoin-25.0
Step 1: ord env /home/waheed/Bitcoin/bitcoin-25.0/data
Step 2:
/home/waheed/bin/ord  --datadir '/home/waheed/Bitcoin/bitcoin-25.0/data' wallet inscribe --fee-rate 20 --file  158007.png

Step 3:
bitcoin-cli -rpcport=9000 -rpccookiefile=/home/waheed/Bitcoin/bitcoin-25.0/data/regtest/.cookie -conf=/home/waheed/Bitcoin/bitcoin-25.0/bitcoin.conf generatetoaddress 6 bcrt1pz0avddqjm6tqfnmwc8mmmhxcaww853wsggqjjpn6xgjmt5cxmvestck5jr

Rune Deployment
ord --cookie-file /home/waheed/Bitcoin/bitcoin-25.0/data/regtest/.cookie --data-dir /home/waheed/Bitcoin/bitcoin-25.0/data wallet --server-url http://localhost:9001 batch --batch data.yaml --fee-rate 2


ord --cookie-file /home/waheed/Bitcoin/bitcoin-25.0/data/regtest/.cookie --data-dir /home/waheed/Bitcoin/bitcoin-25.0/data  wallet mint --rune DIRHAMSXYZCOMMON --fee-rate 1

ord --cookie-file /home/waheed/Bitcoin/bitcoin-25.0/data/regtest/.cookie --data-dir /home/waheed/Bitcoin/bitcoin-25.0/data  wallet mint --rune RUNEXYZCOMMON --fee-rate 1

/home/waheed/bin/ord --datadir '/home/waheed/Bitcoin/bitcoin-25.0/data' wallet receive



ord --cookie-file /home/waheed/Bitcoin/bitcoin-25.0/data/regtest/.cookie --data-dir /home/waheed/Bitcoin/bitcoin-25.0/data  send --fee-rate 12 bc1p8e27ct3jwfmepjgq2y9jmmxdthl0c2pw6vr5e3xq0hpwhmd9jvfqqf0uze c5dd15e20594c66e0337305aae640b1c411a88cc9da76ce11d3b16c64f73fd58i0



ord --cookie-file /home/waheed/Bitcoin/bitcoin-25.0/data/regtest/.cookie --data-dir /home/waheed/Bitcoin/bitcoin-25.0/data wallet --server-url http://localhost:9001 batch --batch etch.yaml --fee-rate 2

Rune Stone
https://www.youtube.com/watch?v=cDIHGLJvPh4


/home/waheed/bin/ord --datadir '/home/waheed/Bitcoin/bitcoin-25.0/data' index update

ord  --datadir './home/waheed/Bitcoin/ord/target/env' wallet inscribe --fee-rate 20 --file  158007.png

ord --datadir './home/waheed/Bitcoin/bitcoin-25.0/data' wallet batch --batch etch.yaml --fee-rate 10


bitcoin-cli -rpcport=9000 -rpccookiefile=/home/waheed/Bitcoin/bitcoin-25.0/data/regtest/.cookie -conf=/home/waheed/Bitcoin/bitcoin-25.0/bitcoin.conf generatetoaddress 1 mmEjUTmDdUeLEF3TmL9jrDmRohY1fJhqPz

ord wallet inscribe --batch etch.yaml --fee-rate 10
bitcoin-cli -rpcport=9000 -rpccookiefile=/home/waheed/Bitcoin/bitcoin-25.0/data/regtest/.cookie -conf=/home/waheed/Bitcoin/bitcoin-25.0/bitcoin.conf generatetoaddress 100 mmEjUTmDdUeLEF3TmL9jrDmRohY1fJhqPz


bitcoin-cli -conf=$(pwd)/bitcoin.conf -named getnewaddress label=generic-p2tr address_type=bech32m

./bin/bitcoin-cli -conf=$(pwd)/bitcoin.conf generatetoaddress 100 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa

./bin/bitcoin-cli -conf=$(pwd)/bitcoin.conf createwallet localaddress
./bin/bitcoin-cli -conf=$(pwd)/bitcoin.conf  -rpcwallet=localaddress getnewaddress 
Works
./bin/bitcoin-cli -conf=$(pwd)/bitcoin.conf  -rpcwallet=localaddress getnewaddress "adr1" "legacy" 
mqNPiuz2c1Hvr35KHTU95hzHbPk5iLUsJm

./bin/bitcoin-cli -conf=$(pwd)/bitcoin.conf generatetoaddress 1 mqNPiuz2c1Hvr35KHTU95hzHbPk5iLUsJm



Your canister is live and ready to use! You can interact with it using either the command line or the Candid UI, which is the link you see in the output above.

In the output above, to see the Candid Web UI for your bitcoin canister, you would use the URL `https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=<YOUR-CANISTER-ID>`. Here are the two methods you will see:

* `public_key`
* `sign`

## Step 2: Generating a Bitcoin address

Bitcoin has different types of addresses (e.g. P2PKH, P2SH). Most of these
addresses can be generated from an ECDSA public key. The example code
showcases how your canister can generate a [P2PKH address](https://en.bitcoin.it/wiki/Transaction#Pay-to-PubkeyHash) using the [ecdsa_public_key](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-ecdsa_public_key) API.

On the Candid UI of your canister, click the "Call" button under `get_p2pkh_address` to
generate a P2PKH Bitcoin address.

Or, if you prefer the command line:

```bash
dfx canister --network=ic call basic_bitcoin get_p2pkh_address
```

* The Bitcoin address you see will be different from the one above because the
  ECDSA public key your canister retrieves is unique.

* We are generating a Bitcoin testnet address, which can only be
used for sending/receiving Bitcoin on the Bitcoin testnet.


## Step 3: Receiving bitcoin

Now that the canister is deployed and you have a Bitcoin address, it's time to receive
some testnet bitcoin. You can use one of the Bitcoin faucets, such as [coinfaucet.eu](https://coinfaucet.eu),
to receive some bitcoin.

Enter your address and click on "Send testnet bitcoins". In the example below we will use Bitcoin address `n31eU1K11m1r58aJMgTyxGonu7wSMoUYe7`, but you will use your address. The canister will be receiving 0.011 test BTC on the Bitcoin Testnet.


Once the transaction has at least one confirmation, which can take a few minutes,
you'll be able to see it in your canister's balance.

## Step 4: Checking your bitcoin balance

You can check a Bitcoin address's balance by using the `get_balance` endpoint on your canister.

In the Candid UI, paste in your canister's address, and click on "Call".

Alternatively, make the call using the command line. Be sure to replace `mheyfRsAQ1XrjtzjfU1cCH2B6G1KmNarNL` with your own generated P2PKH address:

```bash
dfx canister --network=ic call basic_bitcoin get_balance '("mheyfRsAQ1XrjtzjfU1cCH2B6G1KmNarNL")'
```

Checking the balance of a Bitcoin address relies on the [bitcoin_get_balance](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-bitcoin_get_balance) API.

## Step 5: Sending bitcoin

You can send bitcoin using the `send` endpoint on your canister.

In the Candid UI, add a destination address and an amount to send. In the example
below, we're sending 4'321 Satoshi (0.00004321 BTC) back to the testnet faucet.

Via the command line, the same call would look like this:

```bash
dfx canister --network=ic call basic_bitcoin send '(record { destination_address = "tb1ql7w62elx9ucw4pj5lgw4l028hmuw80sndtntxt"; amount_in_satoshi = 4321; })'
```

The `send` endpoint can send bitcoin by:

1. Getting the percentiles of the most recent fees on the Bitcoin network using the [bitcoin_get_current_fee_percentiles API](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-bitcoin_get_current_fee_percentiles).
2. Fetching your unspent transaction outputs (UTXOs), using the [bitcoin_get_utxos API](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-bitcoin_get_utxos).
3. Building a transaction, using some of the UTXOs from step 2 as input and the destination address and amount to send as output.
   The fee percentiles obtained from step 1 are used to set an appropriate fee.
4. Signing the inputs of the transaction using the [sign_with_ecdsa API](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-sign_with_ecdsa).
5. Sending the signed transaction to the Bitcoin network using the [bitcoin_send_transaction API](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-bitcoin_send_transaction).

The `send` endpoint returns the ID of the transaction it sent to the network.
You can track the status of this transaction using a block explorer. Once the
transaction has at least one confirmation, you should be able to see it
reflected in your current balance.

## Conclusion

In this tutorial, you were able to:

* Deploy a canister smart contract on the ICP blockchain that can receive & send Bitcoin.
* Use a cycles faucet to deploy the canister to ICP blockchain on the mainnet for free.
* Connect the canister to the Bitcoin testnet.
* Send the canister some testnet BTC.
* Check the testnet BTC balance of the canister.
* Use the canister to send testnet BTC to another BTC address. 

This example is extensively documented in the following tutorials:

* [Deploying your first Bitcoin dapp](https://internetcomputer.org/docs/current/samples/deploying-your-first-bitcoin-dapp).
* [Developing Bitcoin dapps locally](https://internetcomputer.org/docs/current/developer-docs/integrations/bitcoin/local-development).

## Security considerations and best practices

If you base your application on this example, we recommend you familiarize yourself with and adhere to the [security best practices](https://internetcomputer.org/docs/current/references/security/) for developing on the Internet Computer. This example may not implement all the best practices.

For example, the following aspects are particularly relevant for this app:
* [Certify query responses if they are relevant for security](https://internetcomputer.org/docs/current/references/security/general-security-best-practices#certify-query-responses-if-they-are-relevant-for-security), since the app e.g. offers a method to read balances.
* [Use a decentralized governance system like SNS to make a canister have a decentralized controller](https://internetcomputer.org/docs/current/references/security/rust-canister-development-security-best-practices#use-a-decentralized-governance-system-like-sns-to-make-a-canister-have-a-decentralized-controller), since decentralized control may be essential for canisters holding Bitcoin on behalf of users.
