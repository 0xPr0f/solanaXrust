const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;
/*
describe("solanaXrust", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  it("Is initialized!", async () => {
    // Add your test here.
    const program = anchor.workspace.SolanaXrust;
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
*/
const main = async () => {
  console.log("🚀 Starting test...");
  // Create and set the provider. We set it before but we needed to update it, so that it can communicate with our frontend!

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.SolanaXrust;
  // Create an account keypair for our program to use.
  const baseAccount = anchor.web3.Keypair.generate();
  /*
  const baseAccount = anchor.web3.Keypair.generate();
  let tx = await program.rpc.initialize({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });
  */

  let tx = await program.methods.initialize().rpc({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });

  // const tx = await program.methods.initialize().rpc();
  console.log("📝 Your transaction signature", tx);

  // Fetch data from the account.
  console.log(baseAccount.publicKey);
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("👀 GIF Count", account.totalGifs.toString());
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
