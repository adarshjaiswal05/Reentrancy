const ethers = require("ethers");
const ABI = require("./usdt.json");
const { sendEmail } = require("./mail");
require("dotenv").config();

async function main() {

    const contractAddress = '0x7e47a0d5B02Dd79fb1Bc3Cf9d76a4831FF80E7fb';

    const provider = new ethers.providers.WebSocketProvider("https://polygon-mumbai.g.alchemy.com/v2/nDJEiMb7pluMCl40aN6zkxzxhmO_PhMM");
    const contract = new ethers.Contract(contractAddress, ABI, provider);

    contract.on("Deposite", (from, to, value, event) => {

        let info = {
            from: from,
            to: to,
            value: ethers.utils.formatUnits(value, 6),
            data: event,
        };
        console.log(JSON.stringify(info, null, 4));
        sendEmail();  //calling sendEmail function from mail.js
    });
}

main();