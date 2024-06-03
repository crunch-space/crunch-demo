import * as ethers from "ethers";

import * as dotenv from "dotenv";
import {
  ICrunchProtocol__factory,
  ICrunchVendor__factory,
} from "crunch-contract";
import { deploySignatrue } from "./signature";
dotenv.config();
// const INFURA_KEY = `${process.env.INFURA_API_KEY}`;
const PRIVATE_KEY = `${process.env.PRIVATE_KEY}`;
const caddress = `0x52806ae50D45A2c9f1836eCA255E3A5b2108ecC4`;
const provider = new ethers.JsonRpcProvider("https://sepolia.base.org");

// Wallet setup
const wallet = new ethers.Wallet(PRIVATE_KEY);
const providerWallet = wallet.connect(provider);
// create vendor
async function creatorVendor() {
  const protocol = ICrunchProtocol__factory.connect(caddress, providerWallet);
  const [tokenID, price, rate, amount] = [BigInt("1"), "1", "1", "1"];
  const signatrue = await deploySignatrue(wallet, tokenID, caddress);
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
  const tokenID = "1";
  const amount = "1";
  const protocol = ICrunchProtocol__factory.connect(caddress, providerWallet);
  const tx = await protocol.mint(tokenID, amount);
  const resp = await tx.wait();
  return resp;
}

//topup purchase
async function topup() {
  const invater = "0x1";
  const amount = 1;
  const protocol = ICrunchVendor__factory.connect(caddress, providerWallet);
  const tx = await protocol.topUp(invater, amount);
  const resp = await tx.wait();
  return resp;
}

//burnToClaim
async function burnToClaim() {
  const tokenID = "1";
  const amount = "1";
  const protocol = ICrunchProtocol__factory.connect(caddress, providerWallet);
  const tx = await protocol.burnToClaim(tokenID, amount);
  const resp = await tx.wait();
  return resp;
}
