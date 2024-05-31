#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Initialize user balance and pin code
let myBalance = 5000;
let myPin = 1234;

// print welcome message
console.log(chalk.bold.green("\n \t Welcome to Coding With Huma - ATM Machine \n"));

let pinAnswer = await inquirer.prompt([
      {
       name :"pin",
       type : "number",
       message : chalk.yellow("Enter your Pin Code: ")
      }
]);

if (pinAnswer.pin === myPin){
    console.log(chalk.green("\nPin is Correct , Login successfully!\n"))
   // console.log(`Current Account Balance is ${myBalance}`)
    
    let operationAns = await inquirer.prompt([
        {
          name : "operation",
          type :"list",
          message:"select an operation:",
          choices :["Withdraw amount" ,"Check balance"]
        }
    ]);

 if (operationAns.operation === "Withdraw amount"){
      let withdrawAns = await inquirer.prompt([
        {
           name:"withdrawMethod",
           type:"list",
           message:"Select a withdrawl method",
           choices:["Fast cash","Enter Amount"] 
        }
      ])
      if(withdrawAns.withdrawMethod === "Fast cash"){
       let fastCashAns = await inquirer.prompt([
        {
            name :"fastCash",
            type:"list",
            message:"Select Amount",
            choices:[1000,2000,5000,10000,20000,50000]
        }
        ])
        if(fastCashAns.fastCash > myBalance ){
            console.log(chalk.red("Insufficient balance"));
        }
        else{
          myBalance -= fastCashAns.fastCash
          console.log(chalk.magenta(`\n${fastCashAns.fastCash} withdraw Successfully\n`));
          console.log(chalk.green(`Your Remaining Balance is : ${myBalance}`));

        }

      }   
      
     else if(withdrawAns.withdrawMethod === "Enter Amount"){
        let amountAns = await inquirer.prompt([{
            name:"amount",
            type:"number",
            message:"enter the amount to withdraw:"
     
       }
         
       ])
         if(amountAns.amount > myBalance){
             console.log(chalk.red("Insufficient balance"));
         }
         else {
             myBalance -= amountAns.amount;
             console.log(chalk.green(`${amountAns.amount} Withdraw successfully`));
             console.log(chalk.blue(`your remaining balance is:${ myBalance}`));
         }

      }
  
 } 
   else if (operationAns.operation === "Check balance" ) {
    console.log(chalk.blueBright(`\nyour Account balance is:${myBalance}\n`));
 }
}
else {
    console.log(chalk.red("Pin is incorrect Try again!"));  
}
