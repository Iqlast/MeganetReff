const axios = require('axios');
const fs = require('fs');
const readline = require('readline');
const chalk = require('chalk');

// URL base
const baseUrl = "https://api.meganet.app/wallets/task";

// Header
const headers = {
    "Host": "api.meganet.app",
    "Connection": "keep-alive",
    "sec-ch-ua-platform": "\"Windows\"",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Brave\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "Sec-GPC": "1",
    "Accept-Language": "en-US,en;q=0.7",
    "Origin": "https://meganet.app",
    "Sec-Fetch-Site": "same-site",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Referer": "https://meganet.app/",
    "Accept-Encoding": "gzip, deflate, br, zstd"
};

// List of tasks
const tasks = [
    "connectX", "followX", "subChannel", "joinGroup", "likeAndRt", "react", "oneRef", "fiveRef", "tenRef", "twentyRef",
    "fiftyRef", "oneHundredRef", "twoHundredRef", "threeHundredRef", "fiveHundredRef", "oneThousandRef", "oneNode",
    "fiveNode", "tenNode", "fiftyNode", "oneHundredNode", "twoHoursUptime", "fourHoursUptime", "eightHoursUptime",
    "twelveHoursUptime", "playTonTon", "playMove", "playTonpoke", "playQuantumAi", "playBagelFinance", "playMajyoTreasure",
    "playCandyDream", "joinRoarcoin", "followMeganetIntern", "playPookie", "likeAndRtMilestone", "reactMilestone",
    "playPixiland", "playBizTycoon", "playEton", "playBitgame", "joinAndShare", "launchAngelPoop", "likeAndRtMgntAnnounce",
    "reactMgntAnnounce", "likeRtCommentGm", "voteLikeRtCommentPoll", "reactVotePoll", "glaslessCrossChainExp", "joinDiscord",
    "likeRtDiscordOpen", "reactDiscordOpen", "playMegamine", "killEnemyInTonBattle", "playMortaleKlicker", "rubTheEgg",
    "joinEarnTon", "playAndEarnDogs", "joinVndgAirdrop", "likeSupportAiDevelopment", "reactSupportAiDevelopment"
];

// Read ID from id.txt
const walletId = fs.readFileSync('id.txt', 'utf8').trim();

// Function to send PATCH request with retry mechanism
async function sendPatchRequest(task) {
    let attempt = 1;
    while (true) {
        const url = `${baseUrl}/${walletId}/${task}`;
        try {
            const response = await axios.patch(url, {}, { headers });
            if (response.status === 200) {
                console.log(chalk.green.bold(`Task ${task}: ${response.status} - [succestod] 🎉`));
                break; // Keluar dari loop jika berhasil
            } else {
                console.log(chalk.yellow(`Task ${task}: ${response.status} - Retrying... (Attempt ${attempt})`));
            }
        } catch (error) {
            console.log(chalk.red.bold(`Task ${task}: Error - ${error.message}. Retrying... (Attempt ${attempt})`));
        }
        attempt++;
        await new Promise(resolve => setTimeout(resolve, 5000)); // Tunggu 5 detik sebelum mencoba lagi
    }
}

// Function to loop oneHundredNode task
async function oneHundredNode() {
    console.log(chalk.blue.bold("Memulai Suntik 10M XP..."));
    let counter = 1;
    while (true) {
        console.log(chalk.cyan(`\nSuntik ke-${counter}`));
        await sendPatchRequest("oneHundredNode");
        await new Promise(resolve => setTimeout(resolve, 5000)); // Interval 3 detik
        counter++;
    }
}

// Function to handle user choice
async function handleUserChoice(choice) {
    if (choice === "1") {
        for (const task of tasks) {
            await sendPatchRequest(task);
            await new Promise(resolve => setTimeout(resolve, 5000)); // Interval 5 detik antar task
        }
    } else if (choice === "2") {
        await oneHundredNode(); // Loop berulang untuk Suntik 10M XP
    } else {
        console.log(chalk.red.bold("Pilihan tidak valid. Silakan pilih 1 atau 2."));
    }
}

// User input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(chalk.blue.bold("===================================="));
console.log(chalk.blue.bold("      Meganet Task Automation       "));
console.log(chalk.blue.bold("===================================="));
console.log(chalk.cyan("Pilih opsi:"));
console.log(chalk.cyan("1. Complete all tasks"));
console.log(chalk.cyan("2. Suntik 10M XP"));

rl.question("Masukkan pilihan (1/2): ", (choice) => {
    handleUserChoice(choice).then(() => {
        rl.close();
    });
});
