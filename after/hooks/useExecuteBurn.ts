enum BurnTxProgress {
    default = "Burn App Tokens",
    burning = "Burning...",
  }

import { useState } from "react";

const useExecuteBurn = (
  isWalletConnected: any,
  walletChain: any,
  openConnectModal: any,
  burnAmount : String,
  showToast : any,
  ethersSigner : any,
  refetchTransactions : ()=>void,
  fetchSupplies : ()=>void
) => {

    const [txButton, setTxButton] = useState<BurnTxProgress>(
        BurnTxProgress.default
      );
      const [txProgress, setTxProgress] = useState<boolean>(false);
      const [burnTxHash, setBurnTxHash] = useState<string | null>(null);


  const executeBurn = async () => {
    if (!isWalletConnected) {
      openConnectModal();
    }
    if (burnAmount === "") {
      console.log("Enter amount to migrate");
      showToast("Enter amount to migrate", ToastSeverity.warning);
      return;
    }
    const newTokenAddress = fetchAddressForChain(walletChain?.id, "newToken");
    const oftTokenContract = new Contract(
      newTokenAddress,
      oftAbi,
      ethersSigner
    );
    let amount = parseEther(burnAmount);
    setTxButton(BurnTxProgress.burning);
    setTxProgress(true);
    try {
      const burnTx = await oftTokenContract.burn(
        //tokenAddress,
        amount
      );
      setBurnTxHash(burnTx.hash);
      console.log(burnTx, burnTx.hash);
      await burnTx.wait();
      setTxButton(BurnTxProgress.default);
      setTxProgress(false);
      refetchTransactions();
      fetchSupplies();
    } catch (err) {
      console.log(err);
      setTxButton(BurnTxProgress.default);
      setTxProgress(false);
      showToast("Burn Failed!", ToastSeverity.error);
      return;
    }
  };

  return {txButton, txProgress,  burnTxHash, executeBurn};
};

export default useExecuteBurn;
