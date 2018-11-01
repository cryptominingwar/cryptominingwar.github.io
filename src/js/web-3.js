const MYWeb3 = {
	getAccount: () => { return web3.eth.accounts[0]; },
	isAddress: address => { return web3.isAddress(address); },
	toETH: number => { return web3.fromWei(number, 'ether'); },
	toWei: number => { return web3.toWei(number, 'ether'); },
	toHex: number => { return web3.toHex(number); }
}
export default MYWeb3;