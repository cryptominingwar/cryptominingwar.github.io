const MYTronWeb = {
	getAccount: ()      => { 
		if (typeof(window.tronWeb) === 'undefined') return game.addressDefault;
		return tronWeb.defaultAddress['base58']; 
	},
	toAddress : hex     => { return tronWeb.address.fromHex(hex); },
	isAddress : address => { return tronWeb.isAddress(address) },
	toTrx     : number  => { return tronWeb.fromSun(number); },
	toSun     : number  => { return tronWeb.toSun(number); },
	// isAddress: address => { return web3.isAddress(address); },
	// toETH: number => { return web3.fromWei(number, 'ether'); },
	// toWei: number => { return web3.toWei(number, 'ether'); },
	// toHex: number => { return web3.toHex(number); }
}
export default MYTronWeb;