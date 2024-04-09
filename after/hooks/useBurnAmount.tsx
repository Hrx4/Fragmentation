import { useCallback, useState } from "react";

const useBurnAmount = () => {
  const [burnAmount, setBurnAmount] = useState("");

  const onChangeBurnAmount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "") setBurnAmount("");
    if (isNaN(parseFloat(e.target.value))) return;
    setBurnAmount(e.target.value);
  }, []);

  return { burnAmount , onChangeBurnAmount };
};

export default useBurnAmount;
