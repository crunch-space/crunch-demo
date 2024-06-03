import { ethers, Wallet } from "ethers";

export async function deploySignatrue(
  signer: Wallet,
  tokenId: bigint,
  contractAddress: string
) {
  //   let meta = {
  //     sender: signer.address,
  //     tokenID: BigInt(5),
  //     contractAddress: "0x9DE962807C772Fb1bA5755B3d4203A275888b436",
  //   };
  let h = ethers.solidityPackedKeccak256(
    ["uint", "address", "address"],
    [tokenId, signer.address, contractAddress]
  );
  const signature = await signer.signMessage(ethers.getBytes(h));
  console.log("signature", signature);
  return signature;
}

export async function withdrawSignatrue(
  signer: Wallet,
  tokenId: bigint,
  amount: bigint,
  nonce: string
) {
  let h = ethers.solidityPackedKeccak256(
    ["uint", "address", "uint", "string"],
    [tokenId, signer.address, amount, nonce]
  );
  const signature = await signer.signMessage(ethers.getBytes(h));
  console.log("signature", signature);
  return signature;
}
