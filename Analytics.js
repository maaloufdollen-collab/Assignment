const orders = [ 
  { id: 1, customer: "Rami",  items: ["latte", "croissant"],          total: 7.5 }, 
  { id: 2, customer: "Lea",   items: ["espresso"],                    total: 3.0 }, 
  { id: 3, customer: "Rami",  items: ["latte", "muffin"],             total: 8.0 }, 
  { id: 4, customer: "Karim", items: ["mocha", "croissant"],          total: 9.0 }, 
  { id: 5, customer: "Lea",   items: ["latte"],                       total: 4.5 }, 
  { id: 6, customer: "Nour",  items: ["espresso", "latte", "muffin"], total: 10.5 }, 
]; 
 
const mondayCustomers  = ["Rami", "Lea", "Karim", "Nour"]; 
const tuesdayCustomers = ["Lea", "Nour", "Tony", "Rami", "Lea"]; 

function getTotalRevenue(orders)
{
   let result= orders.reduce((sum,order)=>{
    return sum+order.total;
   },0);
   return result;
}
//console.log(getTotalRevenue(orders));

function getBigOrders(orders,min)
{
    let bigorder=orders.filter((order)=>
    {
        return order.total>=min;
    });
    return bigorder;
}
//console.log(getBigOrders(orders,8));

function getOrderSummaries(orders)
{
    return orders.map((order)=>
    "#"+order.id+" "+order.customer+" -"+order.items.length+" item (s) -$"+order.total.toFixed(2));
}
//console.log(getOrderSummaries(orders));

function getSortedByTotal(orders)
{
    const other=[...orders];
    other.sort((a,b)=>b.total-a.total);
    return other;
}
//console.log(getSortedByTotal(orders));

function findOrdersByItem(orders,item)
{
    let ids=[];
    for(let i=0;i<orders.length;i++)
    {
        if(orders[i].items.includes(item))
            ids.push(orders[i].id);
    }
    return ids;
}
//console.log(findOrdersByItem(orders,"muffin"));

function countItems(orders)
{
    let c={};
   for(let i=0;i<orders.length;i++)
   {
    for(let j=0;j<orders[i].items.length;j++)
    {
        let it=orders[i].items[j];
        if(c[it]===undefined)
            c[it]=1;
        else c[it]++;
    }
   }
   return c;
}
//console.log(countItems(orders));
function getMostPopularItem(orders)
{
    let count=countItems(orders);
    let mostPopular="";
    let max=0;
    for(let item in count)
    {
        if(count[item]>max)
        {
            mostPopular=item;
            max=count[item];
        }
    }
    return mostPopular;
}
//console.log(getMostPopularItem(orders));
function getSpendingPerCustomer(orders)
{
    let total_spending={};
    for(let i=0;i<orders.length;i++)
    {
            let customer=orders[i].customer;
            if(total_spending[customer]===undefined)
                total_spending[customer]=orders[i].total;
            else total_spending[customer]+=orders[i].total;
    }
    return total_spending;
}
//console.log(getSpendingPerCustomer(orders));
function getUniqueCustomers(orders)
{
    let customers=orders.map((order)=>{
        return order.customer;
    });
     let unique=new Set(customers);
     return [...unique];//turns the set into an array
}
//console.log(getUniqueCustomers(orders));
function getAllItems(orders)
{
    let items=orders.flatMap((order)=>{
        return order.items;
    });
    let distinct=new Set(items);
    return [...distinct];
}
//console.log(getAllItems(orders));
const setA=new Set(mondayCustomers);
const setB=new Set(tuesdayCustomers);

function bothDays(setA,setB)
{
    let both=[];
    setA.forEach((customer)=>{
        if(setB.has(customer))
        {
            both.push(customer);
        }
    });
    return both;
}
//console.log(bothDays(setA,setB));
function onlyFirstDay(setA,setB)
{
    let monday=[];
    setA.forEach((customer)=>{
        if(!setB.has(customer))
        {
            monday.push(customer);
        }
    });
    return monday;
}
//console.log(onlyFirstDay(setA,setB));
function allCustomers(setA,setB)
{
    let all=[];
    setA.forEach((customer)=>{
        if(!setB.has(customer)||setB.has(customer))
            all.push(customer);
    });
    setB.forEach((customer)=>{
        if(!setA.has(customer))
            all.push(customer);
    });
    return all;
}
//console.log(allCustomers(setA,setB));

//console.log("Size of Tuesday's customer:",setB.size);//setB.size we are working with the sets of customers
//who came on Tuesday while set includes only unique values and does not have duplicates
//thats why its 4 and not 5

console.log("Total Revenue:",getTotalRevenue(orders));
console.log("Big Orders:",getBigOrders(orders,8));
console.log("Order Summaries:",getOrderSummaries(orders));
console.log("Sorted by total:",getSortedByTotal(orders));
console.log("Finding orders by it's item:",findOrdersByItem(orders,"muffin"));
console.log("Counting Items:",countItems(orders));
console.log("Most Popular Item:",getMostPopularItem(orders));
console.log("Spending Per Customer:",getSpendingPerCustomer(orders));
console.log("Unique Customers:",getUniqueCustomers(orders));
console.log("All items ordered",getAllItems(orders));
console.log("Customer Visits, Both days customers:", bothDays(setA, setB));
console.log("Customer Visits, Only on Monday customers:", onlyFirstDay(setA, setB));
console.log("Customer Visits, All customers:", allCustomers(setA, setB));
console.log("Size of Tuesday's customers:",setB.size);//setB.size we are working with the sets of customers
//who came on Tuesday while set includes only unique values and does not have duplicates
//thats why its 4 and not 5