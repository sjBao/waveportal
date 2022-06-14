// compile, deploy and execute our smart contract on the blockchain
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const choices = {
    rock: "🪨",
    scissors: "✂️",
    paper: "🧻"
}

const main = async () => {
    // compile contract and generate necessary files in artifacts/
    // hre is available whenever we run `npx hardhat`
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    // create a new blockchain to deploy our contract
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();


    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave();
    await waveTxn.wait();


    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();


    const randomChoice = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
    const choice = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];

    console.log(`${owner.address} chose ${choices[choice]}`);

    const [result, yourChoice, theirChoice] = await waveContract.rockPaperScissors(choice, randomChoice);
    console.log("Computer chose: ", choices[randomChoice]);
    console.log("Result: ", result);

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
