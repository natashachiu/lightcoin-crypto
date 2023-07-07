class Account {
  constructor(username) {
    this.transactions = [];
  }
  // computes balance by summing transactions
  get balance() {
    let balance = 0; // balance must exist for it to be returned

    this.transactions.forEach(transaction => balance += transaction.value);
    return balance;
  }

  // called in Transaction.commit()
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}


class Transaction {
  // Transaction isn't used directly, Withdrawal and Deposit are used
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) {
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);

    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return (this.account.balance >= this.amount);
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }

}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

console.log('Starting Account Balance: ', myAccount.balance);

console.log('\nAttempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit()); // false
console.log('Account Balance: ', myAccount.balance);

console.log('\nDepositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit()); // true
console.log('Account Balance: ', myAccount.balance);

console.log('\nWithdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit()); // true

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('\nAccount Transaction History: ', myAccount.transactions);
