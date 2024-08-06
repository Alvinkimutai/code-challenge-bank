import React, { useState } from "react";


function AddTransactionForm({submitForm}) {                   
  const [formData, setFormData] = useState({
      date: "",
      description:"",
      category:"",
      amount:""
  })

  function handleChange (event){
      let formInput = {...formData, [event.target.name]:event.target.value};
      setFormData(formInput)
    

  }
  function handleSubmit(event){
    event.preventDefault()
    if (!formData.date || !formData.description || !formData.category || formData.amount <= 0) {
      alert("Please fill in all fields with valid data.");
      return;
    }
    submitForm(formData)
      setFormData({
        date: "",
        description: "",
        category: "",
        amount: ""
    })
  }


  return (
    <div className="ui segment">
      <form className="ui form" onChange={handleChange} onSubmit={handleSubmit}> 
        <div className="inline fields">
          <input type="date" name="date"value={formData.date} onChange={handleChange} />
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange}/>
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
          <input type="number" name="amount" placeholder="Amount" step="0.01" value={formData.amount} onChange={handleChange} />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
