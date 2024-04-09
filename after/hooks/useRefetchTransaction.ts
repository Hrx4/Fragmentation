import React, { useCallback, useState } from 'react'

const useRefetchTransaction = () => {

    const [burnTransactions, setBurnTransactions] = useState<any[]>([]);


    const refetchTransactions = useCallback(
        () => {
            Promise.all(
              ChainScanner.fetchAllTxPromises(isChainTestnet(walletChain?.id))
            )
              .then((results: any) => {
                //console.log(res);
                let res = results.flat();
                res = ChainScanner.sortOnlyBurnTransactions(res);
                res = res.sort((a: any, b: any) => b.timeStamp - a.timeStamp);
                setBurnTransactions(res);
              })
              .catch((err) => {
                console.log(err);
              });
          },
      []
    )
    

  return {burnTransactions, setBurnTransactions , refetchTransactions }
}

export default useRefetchTransaction