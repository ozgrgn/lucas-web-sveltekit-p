let pools;
const getPools = async () => {
	let getPoolsResponse = await RestService.getPools(undefined, undefined);
	if (getPoolsResponse['status']) {
		console.log(getPoolsResponse, 'getPoolsResponse');
		pools = getPoolsResponse['pools'];
		console.log(pools, 'pools');
	} else {
		ToastService.error($TranslateApiMessage(response.message));
	}
};







