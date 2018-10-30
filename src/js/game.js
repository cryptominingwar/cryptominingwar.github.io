game = [];

game.web3 = {};

game.default_gas_price = 0;

/** ----------------------------------------------------------------------
* MINING WAR GAME INFORMATION
* ------------------------------------------------------------------------
*/
game.user = {
    "address": '',
    "player_balance": 0,
    "crystals": 0,
    "lastupdate": 0,
    "hashratePerDay": 0,
    "miners": [],
    "hasBoost": 0,
    "referral_count": 0,
    "yourQuest": 0,
    "unconfirmedCrystals": 0,
};
// miner data
game.minerData = [];
game.minerData[0] = { "price": 10,      "hashrate": 10,    "limit": 10 };
game.minerData[1] = { "price": 100,     "hashrate": 200,   "limit": 2 };
game.minerData[2] = { "price": 400,     "hashrate": 800,   "limit": 4 };
game.minerData[3] = { "price": 1600,    "hashrate": 3200,  "limit": 8 };
game.minerData[4] = { "price": 6400,    "hashrate": 9600,  "limit": 16 };
game.minerData[5] = { "price": 25600,   "hashrate": 38400, "limit": 32 };
game.minerData[6] = { "price": 204800,  "hashrate": 204800,"limit": 64 };
game.minerData[7] = { "price": 1638400, "hashrate": 819200,"limit": 65536 };
// booster
game.boostData = [];
game.boostData[0] = { "owner": '', "boostRate": 150, "price": 0.01 };
game.boostData[1] = { "owner": '', "boostRate": 175, "price": 0.01 };
game.boostData[2] = { "owner": '', "boostRate": 200, "price": 0.01 };
game.boostData[3] = { "owner": '', "boostRate": 225, "price": 0.01 };
game.boostData[4] = { "owner": '', "boostRate": 250, "price": 0.01 };

game.miningWarRoundNumber = 0;

game.currentCrystals = 0;

game.referral = 0;

game.CRTSTAL_MINING_PERIOD = 86400;
game.VIRUS_MINING_PERIOD = 86400;
game.numberOfMiners = 8;
game.numberOfBoosts = 5;
game.numberOfOrders = 5;

game.deadline = Date.now;
game.showLottery = false;

game.sponsor_fee = 0.01;

game.rank_list = [];

/** ----------------------------------------------------------------------
* AIRDROP GAME INFORMATION
* ------------------------------------------------------------------------
*/
game.currentAirdropGameData = {
    miningWarRoundNumber: 0,
    ended: 0,
    prizeCrystal: 0,
    startTime: 0,
    endTime: 0,
    totalJoin: 0,
    playerWin: ''    
};
game.lastAirdropGameData = {
    prizeCrystal: 0,
    totalJoin: 0,
    playerWin: '0x0000000000000000000000000000000000000000'    
};
game.minigames = [];
game.currentMiniGameId = 0; // is mini game of airdrop game
game.playerAirdropGame = { 
    "win": 0,
    "share": 0,
    "crystal": 0,
    "totalJoin": 0,
    "currentMiniGameId": 0
};
/** ----------------------------------------------------------------------
* ENGINEER INFORMATION
* ------------------------------------------------------------------------
*/
// list players
game.players = [];
// game sponsor info
game.gameSponsor = "";
game.gameSponsorPrice = 0;
game.engineerPrizePool = 0;

game.engineerPlayer = {
    "engineerRoundNumber": 0,
    "virusNumber": 0,
    "virusDefence": 0,
    "research": 0,
    "researchPerDay": 0,
    "lastUpdateTime": 0,
    "engineers": [0,0,0,0,0,0,0,0],
    "hasBooster": false,
    "nextTimeAtk": 0,
    "endTimeUnequalledDef": 0
}
// engineer
game.engineerData = [];
game.engineerData[0] = { "basePrice": 10,      "baseEth": 0,    "baseResearch": 10,    "limit": 10 };
game.engineerData[1] = { "basePrice": 50,      "baseEth": 0.01,"baseResearch": 200,   "limit": 2 };
game.engineerData[2] = { "basePrice": 200,     "baseEth": 0.02, "baseResearch": 800,   "limit": 4 };
game.engineerData[3] = { "basePrice": 800,     "baseEth": 0.04, "baseResearch": 3200,  "limit": 8 };
game.engineerData[4] = { "basePrice": 3200,    "baseEth": 0.08, "baseResearch": 9600,  "limit": 16 };
game.engineerData[5] = { "basePrice": 12800,   "baseEth": 0.16, "baseResearch": 38400, "limit": 32 };
game.engineerData[6] = { "basePrice": 102400,  "baseEth": 0.32, "baseResearch": 204800,"limit": 64 };
game.engineerData[7] = { "basePrice": 819200,  "baseEth": 0.64, "baseResearch": 819200,"limit": 65536 };
//booster
game.EngineerboostData = [];
game.EngineerboostData[0] = { "owner": '', "boostRate": 150, "price": 0.01 };
game.EngineerboostData[1] = { "owner": '', "boostRate": 175, "price": 0.02 };
game.EngineerboostData[2] = { "owner": '', "boostRate": 200, "price": 0.04 };
game.EngineerboostData[3] = { "owner": '', "boostRate": 225, "price": 0.08 };
game.EngineerboostData[4] = { "owner": '', "boostRate": 250, "price": 0.16 };
             //level   1         2        3          4       5      6         7           8
game.engineersName = ["Link", "Mouse", "Switch", "Dozer", "Tank", "Apoc", "Trinity", "Morpheus"];

game.currentVirus = 0;

game.historyWars = [];

game.engineerRoundNumber = 0;
/** ----------------------------------------------------------------------
* BOSS WANNACRY INFORMATION
* ------------------------------------------------------------------------
*/
game.bossWannaCryPlayer = {
    "currentBossRoundNumber": 0,
    "lastBossRoundNumber": 0,
    "win": 0,
    "share": 0,
    "dame": 0,
    "nextTimeAtk": 0
}
game.currentBossWannaCry = {
    "bossRoundNumber": 0,
    "bossHp": 0,
    "def": 0,
    "prizePool": 0,
    "playerLastAtk": 0,
    "totalDame": 0,
    "ended": false
}
game.lastBossWannaCry = {
    "bossRoundNumber": 0,
    "bossHp": 0,
    "def": 0,
    "prizePool": 0,
    "playerLastAtk": 0,
    "totalDame": 0,
    "ended": false   
}

game.dameCurrentBossWannaCry = 0;

game.yourRewardBossWannaCry = 0;
/** ----------------------------------------------------------------------
* CRYSTALS CONTRIBUTIONS INFORMATION
* ------------------------------------------------------------------------
*/
game.minShare = 10000;

game.depositData = {
     "prizePool": 0,
     "crystals": 0,
     "endTime": 0,
    // player info
     "reward": 0,
     "share": 0,
     "questSequence": 0,
        // current quest of player
     "deposit": 0,
     "resetFreeTime": 0,
     "typeQuest": 0,
     "numberOfTimes": 0, 
     "number": 0,
     "isFinish": false,
     "haveQuest": true
}; 

// buy and sell info not use in current version

game.sellOrderData = [];

game.sellOrderData[0] = {
    owner: '',
    title: 'Title',
    description: '',
    unitPrice: 0,
    amount: 0,
};
game.sellOrderData[1] = {
    owner: '',
    title: 'Title',
    description: '',
    unitPrice: 0,
    amount: 0,
};
game.sellOrderData[2] = {
    owner: '',
    title: 'Title',
    description: '',
    unitPrice: 0,
    amount: 0,
};
game.sellOrderData[3] = {
    owner: '',
    title: 'Title',
    description: '',
    unitPrice: 0,
    amount: 0,
};
game.sellOrderData[4] = {
    owner: '',
    title: 'Title',
    description: '',
    unitPrice: 0,
    amount: 0,
};

game.buyOrderData = [];

game.buyOrderData[0] = {
    owner: '',
    title: 'Title',
    description: '',
    unitPrice: 0,
    amount: 0,
};
game.buyOrderData[1] = {
    owner: '',
    title: 'Title',
    description: '',
    unitPrice: 0,
    amount: 0,
};
game.buyOrderData[2] = {
    owner: '',
    title: 'Title',
    description: '',
    unitPrice: 0,
    amount: 0,
};
game.buyOrderData[3] = {
    owner: '',
    title: 'Title',
    description: '',
    unitPrice: 0,
    amount: 0,
};
game.buyOrderData[4] = {
    owner: '',
    title: 'Title',
    description: '',
    unitPrice: 0,
    amount: 0,
};