const express = require("express");
const bitcoin = require("bitcoinjs-lib");

const app = express();
app.use(express.json());

/**
 * Request body: { publicKey: string, amount: number }
 * */
app.post("/payout", async (req, res) => {
  const { publicKey, amount } = req.body;
  try {
    // create a new transaction builder
    const txb = new bitcoin.TransactionBuilder();

    // add the input to the transaction builder
    txb.addInput("inputTxId", 0);

    // add the output to the transaction builder
    txb.addOutput(publicKey, amount);

    // sign the transaction with the private key
    txb.sign(0, privateKey);

    // build the transaction and serialize it
    const tx = txb.build();
    const txHex = tx.toHex();

    // send the transaction to the Bitcoin network
    // using the Bitcore API or a similar library
    // e.g. bitcore.Networks.defaultNetwork.name = 'livenet' or 'testnet'
    const network = bitcoin.networks.testnet;
    const bitcore = require("bitcore-lib");
    const txObject = bitcore.Transaction(txHex);
    const txId = txObject.hash;
    const txSerialized = txObject.serialize(true);
    bitcore.transport.sendTx(txSerialized, network, function (err, res) {
      if (err) {
        console.error(err);
        res.status(500).send("Error sending transaction");
      } else {
        console.log(
          `Transaction ${txId} sent with ${amount} BTC to ${publicKey}`
        );
        res.send(`Transaction ${txId} sent with ${amount} BTC to ${publicKey}`);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(400).send("Error creating transaction");
  }
});

// start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

