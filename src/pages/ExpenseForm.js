import React, { useState } from 'react';
import { handleError } from '../utils';

function ExpenseForm({ addTransaction }) {

    const [expenseInfo, setExpenseInfo] = useState({
        amount: '',
        text: '',
        type: 'debit'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyExpenseInfo = { ...expenseInfo };
        copyExpenseInfo[name] = value;
        setExpenseInfo(copyExpenseInfo);
    };

    const addExpenses = (e) => {
        e.preventDefault();
        const { amount, text, type } = expenseInfo;

        if (!amount || !text) {
            handleError('Please add Expense Details');
            return;
        }

        const amountValue = type === 'credit' ? Math.abs(amount) : -Math.abs(amount);

        const transactionData = { ...expenseInfo, amount: amountValue };
        addTransaction(transactionData);

        setExpenseInfo({ amount: '', text: '', type: 'debit' });
    };

    return (
        <div className='container'>
            <h1>Expense Tracker</h1>
            <form onSubmit={addExpenses}>
                <div>
                    <label htmlFor='text'>Expense Detail</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='text'
                        placeholder='Enter your Expense Detail...'
                        value={expenseInfo.text}
                    />
                </div>
                <div>
                    <label htmlFor='amount'>Amount</label>
                    <input
                        onChange={handleChange}
                        type='number'
                        name='amount'
                        placeholder='Enter your Amount...'
                        value={expenseInfo.amount}
                    />
                </div>

                <div>
                    <label htmlFor='type'>Transaction Type</label>
                    <select
                        name="type"
                        value={expenseInfo.type}
                        onChange={handleChange}
                    >
                        <option value="debit">Debit</option>
                        <option value="credit">Credit</option>
                    </select>
                </div>

                <button type='submit'>Add Expense</button>
            </form>
        </div>
    );
}

export default ExpenseForm;
