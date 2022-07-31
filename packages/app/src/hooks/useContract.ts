import { AddressZero } from "@ethersproject/constants";
import { Contract } from "@ethersproject/contracts";
import { getContract, getSigner } from "../functions/contract";
import { useMemo } from "react";
import CYRUS_ABI from "../constants/abi.json";
import CYRUS_MARKET_ABI from "../constants/market.json";
import ABI_TESTNET from "../constants/ABI_TESTNET.json";
import SSN_ABI_TESTNET from "../constants/ssn_abi.json";
import HYPERSONIC_ABI_TESTNET from "../constants/hypersonic_abi.json";
import WHSN_ABI from "../constants/whsn_abi.json";
import { useActiveWeb3React } from "./useActiveWeb3React";
import {
  cyrusMarketAddress,
  EXXFI_CONTRACT_ADDRESS,
  HYPERSONIC_CONTRACT_ADDRESS,
  SSN_CONTRACT_ADDRESS,
  WHSN_CONTRACT_ADDRESS,
} from "../constants";

export function useExxfiContract(): Contract | null {
  return useContract(EXXFI_CONTRACT_ADDRESS, ABI_TESTNET, true);
}

export function useSSNToken(): Contract | null {
  return useContract(SSN_CONTRACT_ADDRESS, SSN_ABI_TESTNET, true);
}

export function useWHSNContract(): Contract | null {
  return useContract(WHSN_CONTRACT_ADDRESS, WHSN_ABI, true);
}

export function useHypersonicContract(): Contract | null {
  return useContract(HYPERSONIC_CONTRACT_ADDRESS, HYPERSONIC_ABI_TESTNET, true);
}

export function useCyrusMarketContract(): Contract | null {
  return useContract(cyrusMarketAddress, CYRUS_MARKET_ABI, true);
}

// returns null on errors
export function useContract(
  nameOrAddress: string | undefined,
  ABI: any = undefined,
  withSignerIfPossible = true
): Contract | null {
  const { library, account, chainId } = useActiveWeb3React();

  let address: string | undefined = nameOrAddress;

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      const contract = getContract(
        address.toString(),
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );

      return contract;
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [nameOrAddress, address, ABI, library, withSignerIfPossible, account]);
}
