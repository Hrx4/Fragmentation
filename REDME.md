
# Task-Fragmentation
AN assignment to test the fragmentation ability of Developers

My Pick - Fragmentation of Functinality 

## My Reasons for Fragmentating it like that

First of all i choose Freagmentation of functionality , i thought it will be good if i make fragmentaion of the functionality first. So, I make 4 different hooks. The hooks are -
1) useBurnAmount - This hook doesnot take any parameters. It return us one state burnAmount and a function onChangeBurnAmount.
2) useCoinData - Used for take the value of coindata only 
3) useExecuteBurn - This hook takes a lot of parameters and gives only the needed  states like txButton, txProgress,  burnTxHash and a function executeBurn
4) useRefetchTransaction - This hook gives use two states and a function.