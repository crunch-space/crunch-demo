import * as ethers from "ethers";

import * as dotenv from "dotenv";
import {
  CrunchProtocol__factory,
  CrunchVendor__factory,
} from "crunch-contract";
import { deploySignatrue, withdrawSignatrue } from "./signature";
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
  const protocol = CrunchProtocol__factory.connect(caddress, providerWallet);
  const [
    tokenID, // NFT ID
    price, // NFT offering price
    rate, // Creator share ratio 1-100
    amount, // Number of NFTs offered for sale
  ] = [BigInt("1"), "1", "1", "1"];
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
  const amount = "1"; //mint NFT quantity
  const protocol = CrunchProtocol__factory.connect(caddress, providerWallet);
  const tx = await protocol.mint(tokenID, amount);
  const resp = await tx.wait();
  return resp;
}

//topup purchase
async function topup() {
  const invater = "0x1"; //Inviter address
  const amount = 1; // purchase quantity
  const protocol = CrunchVendor__factory.connect(caddress, providerWallet);
  const tx = await protocol.topUp(invater, amount);
  const resp = await tx.wait();
  return resp;
}

//burnToClaim
async function burnToClaim() {
  const tokenID = "1";
  const amount = "1"; //burn NFT quantity
  const protocol = CrunchProtocol__factory.connect(caddress, providerWallet);
  const tx = await protocol.burnToClaim(tokenID, amount);
  const resp = await tx.wait();
  return resp;
}

//withdraw
async function withdraw() {
  const tokenID = BigInt("1");
  const nonce = "1";
  const amount = BigInt("1");
  const protocol = CrunchProtocol__factory.connect(caddress, providerWallet);
  const signatrue = await withdrawSignatrue(wallet, tokenID, amount, nonce);
  const tx = await protocol.withdraw(tokenID, amount, signatrue, nonce);
  const resp = await tx.wait();
  return resp;
}
