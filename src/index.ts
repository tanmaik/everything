import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";

(async () => {
  const keypair = Keypair.generate();
  const connection = new Connection("http://127.0.0.1:8899", "confirmed");

  console.log("Requesting airdrop for address:", keypair.publicKey.toString());

  const signature = await connection.requestAirdrop(
    keypair.publicKey,
    LAMPORTS_PER_SOL
  );

  console.log("Airdrop requested with signature:", signature);

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();
  await connection.confirmTransaction({
    blockhash,
    lastValidBlockHeight,
    signature,
  });

  console.log(
    "Airdrop confirmed! 1 SOL has been sent to:",
    keypair.publicKey.toString()
  );
  connection.onAccountChange(
    keypair.publicKey,
    (updatedAccountInfo, context) =>
      console.log("Updated account info: ", updatedAccountInfo),
    "confirmed"
  );
})();
