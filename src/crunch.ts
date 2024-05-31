import * as ethers from "ethers";

import * as dotenv from "dotenv";
import {
  ICrunchProtocol__factory,
  ICrunchVendor__factory,
} from "crunch-contract";
dotenv.config();
// const INFURA_KEY = `${process.env.INFURA_API_KEY}`;
const PRIVATE_KEY = `${process.env.PRIVATE_KEY}`;
const caddress = `0x52806ae50D45A2c9f1836eCA255E3A5b2108ecC4`;
const blastProvider = new ethers.JsonRpcProvider("https://sepolia.base.org");

// Wallet setup
const wallet = new ethers.Wallet(PRIVATE_KEY);
const blastWallet = wallet.connect(blastProvider);
// 创建 vendor
async function creatorVendor() {
  // Providers for Sepolia and Blast networks
  //   const sepoliaProvider = new ethers.JsonRpcProvider(
  //     `https://sepolia.infura.io/v3/${INFURA_KEY}`
  //   );

  const protocol = ICrunchProtocol__factory.connect(caddress, blastWallet);
  const [tokenID, price, rate, amount, signatrue] = ["1", "1", "1", "1", "0x0"];
  const tx = await protocol.deployCrunchVendor(
    tokenID,
    price,
    rate,
    amount,
    signatrue
  );
  const resp = await tx.wait();
  return resp;
}
// mint token
async function mintToken() {
  const protocol = ICrunchProtocol__factory.connect(caddress, blastWallet);
  const tx = await protocol.mint("1", "1");
  const resp = await tx.wait();
  return resp;
}

//topup 购买
async function topup() {
  const invater = "0x1";
  const protocol = ICrunchVendor__factory.connect(caddress, blastWallet);
  const tx = await protocol.topUp("1", "1");
  const resp = await tx.wait();
  return resp;
}

//burnToClaim
async function burnToClaim() {
  const tokenID = "1";
  const amount = "1";
  const protocol = ICrunchProtocol__factory.connect(caddress, blastWallet);
  const tx = await protocol.burnToClaim(tokenID, amount);
  const resp = await tx.wait();
  return resp;
}
