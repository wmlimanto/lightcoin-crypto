let balance = 500.00;

class Account {

  constructor(username) {
    this.username = username;
    //added to keep track of transactions
    this.transactions = [];
  }

  get balance() {
    //calculate the balance using the transactions object
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  //pass in the account that the deposit or withdrawal is for
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  //update the balance in the account
  commit() {
    //to validate withdrawals
    if (!this.isAllowed()) return false;
    //keep track of the time of the transaction
    this.time = new Date();
    //add the transaction to this account
    this.account.addTransaction(this);
    return true;
  }

}

class Deposit extends Transaction {

  //update the balance in the account using a getter method called value
  get value() {
    return this.amount;
  }

  isAllowed() {
    //deposits are always allowed
    return true;
  }

}

class Withdrawal extends Transaction {

  //update the balance in the account using a getter method called value
  get value() {
    return -this.amount;
  }

  isAllowed() {
    //note how it has access to this.account because of parent class
    return (this.account.balance - this.amount >= 0);
  }

}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("do kwon");

console.log('Starting Account Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);
