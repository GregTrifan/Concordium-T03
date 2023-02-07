// The TESTNET_GENESIS_BLOCK_HASH is used to check that the user has its browser wallet connected to testnet and not to mainnet.
import { Network } from "@concordium/react-components";

export const TESTNET_GENESIS_BLOCK_HASH =
	"4221332d34e1694168c2a0c0b3fd0f273809612cb13d000d5c2e00e85f50f796";

export const CONTRACT_NAME = "t02_counter";

export const CONTRACT_INDEX = 2799n;
export const RAW_SCHEMA =
	"//8DAQAAAAsAAAB0MDJfY291bnRlcgABAAAABAAAAHZpZXcBFAABAAAABQAAAGNvdW50CQA";

export const WALLET_CONNECT_PROJECT_ID = "76324905a70fe5c388bab46d3e0564dc";
export const TESTNET = {
	name: "testnet",
	genesisHash: TESTNET_GENESIS_BLOCK_HASH,
	jsonRpcUrl: "https://json-rpc.testnet.concordium.com",
	ccdScanBaseUrl: "https://testnet.ccdscan.io",
};
