// compile, deploy and execute our smart contract on the blockchain

const main = async () => {
    // compile contract and generate necessary files in artifacts/
    // hre is available whenever we run `npx hardhat`
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    // create a new blockchain to deploy our contract
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log("Contract Deployed to: ", waveContract.address);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();