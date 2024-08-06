import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [userSearch, setUserSearch] = useState('');

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error(error));
  }, []);

  function handleNewTransaction(addNewTransaction) {
    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addNewTransaction),
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); 
        }
        throw new Error("Failed to add transaction");
      })
      .then((newTransaction) => {
        setTransactions((prevState) => [...prevState, newTransaction]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function searchFn(event) {
    setUserSearch(event.target.value);
  }

  
  const searchFilter = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div>
      <Search onChange={searchFn} /> {}
      <AddTransactionForm submitForm={handleNewTransaction} />
      <TransactionsList transactions={searchFilter} />
    </div>
  );
}

export default AccountContainer;
