import React from 'react';
import { Progress } from 'antd';

const Analytics = ({allTransection}) => {
//category
const categories = [
  "salary",
"tip",
"food",
"movie",
"bills",
"medical",
"fee",
"tax",
"Rent",
];

  //total transections
  const totalTransection =allTransection.length
  const totalIncomeTransections=allTransection.filter(transection => transection.type === 'income')
  const totalExpenseTransections=allTransection.filter(transection => transection.type === 'expense')
  const totalIncomePercent = (totalIncomeTransections.length/totalTransection)*100
  const totalExpensePercent = (totalExpenseTransections.length/totalTransection)*100
  
  //total turnover
  const totalTurnover =allTransection.reduce(
    (acc,transection) => acc + transection.amount,
    0
  );
  const totalIncomeTurnover=allTransection.filter(
    (transection)=> transection.type ==="income"
  ).reduce((acc,transection) => acc + transection.amount,0)
 const totalExpenseTurnover =allTransection.filter(
   (transection)=> transection.type ==='expense'
 ).reduce((acc,transection) => acc + transection.amount,0)
const totalIncomeTurnoverPercent=(totalIncomeTurnover/totalTurnover)*100
const totalExpenseTurnoverPercent=(totalExpenseTurnover/totalTurnover)*100
  return (
    <>
     <div className='row m-3'>
       <div className='col-md-3'>
         <div className='card'>
           <div className='card-header'>
             Total Transection : {totalTransection}
             </div>
             <div className='card-body'>
              <h5 className='text-success'>Income : {totalIncomeTransections.length}</h5>
              <h5 className='text-danger'>Expense :  {totalExpenseTransections.length}</h5>
               <div>
                 <Progress type="circle" 
                 strokeColor={'green'} 
                 className='m-2'
                 percent={totalIncomePercent.toFixed(0)}/>
                <Progress type="circle" 
                 strokeColor={'red'} 
                 className='m-2'
                 percent={totalExpensePercent.toFixed(0)}/>
               
               </div>
               </div>
           </div>
         </div>
       <div className='col-md-3'>
         <div className='card'>
           <div className='card-header'>
             Total Turnover : {totalTurnover}
             </div>
             <div className='card-body'>
              <h5 className='text-success'>Income : {totalIncomeTurnover}</h5>
              <h5 className='text-danger'>Expense :  {totalExpenseTurnover}</h5>
               <div>
                 <Progress type="circle" 
                 strokeColor={'green'} 
                 className='m-2'
                 percent={totalIncomeTurnoverPercent.toFixed(0)}/>
                <Progress type="circle" 
                 strokeColor={'red'} 
                 className='m-2'
                 percent={totalExpenseTurnoverPercent.toFixed(0)}/>
               
               </div>
               </div>
           </div>
         </div>
          <div className='col-md-3'>
            <h4>Categorywise Income</h4>
            {
              categories.map(category =>{
                const amount =allTransection
                .filter((transection)=> transection.type === 'income' &&
                transection.category === category)
                .reduce((acc,transection) => acc + transection.amount,0);
                return (
                  amount > 0 && (
                  <div className="card mb-2">
                    <div className="card-body">
                      <h5>{category}</h5>
                      <Progress percent={((amount/totalIncomeTurnover)*100).toFixed(0) }/>
                    </div>
                  </div>
                  )
                );
              })}
          </div>
          <div className='col-md-3'>
            <h4>Categorywise Expense</h4>
            {
              categories.map((category) =>{
                const amount =allTransection
                .filter((transection)=> transection.type === 'expense' &&
                transection.category === category)
                .reduce((acc,transection) => acc + transection.amount,0);
                return (
                  amount > 0 && (
                  <div className="card mb-2">
                    <div className="card-body">
                      <h5>{category}</h5>
                      <Progress percent={((amount/totalExpenseTurnover)*100).toFixed(0) }/>
                    </div>
                  </div>
                  )
                );
              })
            }
          </div>
       </div>
     </>
  )
}

export default Analytics