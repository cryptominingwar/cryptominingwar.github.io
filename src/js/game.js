game = [];

game.default_gas_price = 0;

game.CRTSTAL_MINING_PERIOD = 86400;
game.numberOfMiners = 8;
game.numberOfBoosts = 5;
game.numberOfOrders = 5;

game.deadline = Date.now;

game.referral = 0;

game.user = {
    address: '',
	player_balance: 0,
    crystals: 0,
    lastupdate: 0,
    hashratePerDay: 0,
    miners: [],
    hasBoost: 0,
    referral_count: 0,
    yourQuest: 0,
    unconfirmedCrystals: 0,
};

game.sponsor_fee = 0.01;

game.rank_list = [];

// BOOSTER
game.boostData = [];

game.boostData[0] = {
    owner: '',
    boostRate: 150,
    price: 0.01
};
game.boostData[1] = {
    owner: '',
    boostRate: 175,
    price: 0.01
};
game.boostData[2] = {
    owner: '',
    boostRate: 200,
    price: 0.01
};
game.boostData[3] = {
    owner: '',
    boostRate: 225,
    price: 0.01
};
game.boostData[4] = {
    owner: '',
    boostRate: 250,
    price: 0.01
};

// minerData[0] = MinerData(10, 10, 10); //lv1
// minerData[1] = MinerData(100, 200, 10); //lv2
// minerData[2] = MinerData(400, 800, 10); //lv3
// minerData[3] = MinerData(1600, 3200, 10); //lv4
// minerData[4] = MinerData(6400, 12800, 10); //lv5
// minerData[5] = MinerData(25600, 51200, 10); //lv6
// minerData[6] = MinerData(204800, 409600, 10); //lv7
// minerData[7] = MinerData(1638400, 1638400, 999); //lv8
game.minerData = [];

game.minerData[0] = {
    price: 10,
    hashrate: 10,
    limit: 10
};
game.minerData[1] = {
    price: 100,
    hashrate: 200,
    limit: 2
};
game.minerData[2] = {
    price: 400,
    hashrate: 800,
    limit: 4
};
game.minerData[3] = {
    price: 1600,
    hashrate: 3200,
    limit: 8
};
game.minerData[4] = {
    price: 6400,
    hashrate: 9600,
    limit: 16
};
game.minerData[5] = {
    price: 25600,
    hashrate: 38400,
    limit: 32
};
game.minerData[6] = {
    price: 204800,
    hashrate: 204800,
    limit: 64
};
game.minerData[7] = {
    price: 1638400,
    hashrate: 819200,
    limit: 65536
};

game.sellOrderData = [];

game.sellOrderData[0] = {
    owner: '',
    title: 'title',
    description: '',
    unitPrice: 0,
    amount: 0,
};
game.sellOrderData[1] = {
    owner: '',
    title: 'title',
    description: '',
    unitPrice: 0,
    amount: 0,
};
game.sellOrderData[2] = {
    owner: '',
    title: 'title',
    description: '',
    unitPrice: 0,
    amount: 0,
};
game.sellOrderData[3] = {
    owner: '',
    title: 'title',
    description: '',
    unitPrice: 0,
    amount: 0,
};
game.sellOrderData[4] = {
    owner: '',
    title: 'title',
    description: '',
    unitPrice: 0,
    amount: 0,
};

game.buyOrderData = [];

game.buyOrderData[0] = {
    owner: '',
    title: 'title',
    description: '',
    unitPrice: 0,
    amount: 0,
};
game.buyOrderData[1] = {
    owner: '',
    title: 'title',
    description: '',
    unitPrice: 0,
    amount: 0,
};
game.buyOrderData[2] = {
    owner: '',
    title: 'title',
    description: '',
    unitPrice: 0,
    amount: 0,
};
game.buyOrderData[3] = {
    owner: '',
    title: 'title',
    description: '',
    unitPrice: 0,
    amount: 0,
};
game.buyOrderData[4] = {
    owner: '',
    title: 'title',
    description: '',
    unitPrice: 0,
    amount: 0,
};