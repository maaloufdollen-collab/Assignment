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
    //reduce=>reduces array orders into one variable sum
   let result= orders.reduce((sum,order)=>{
    return sum+order.total;
   },0);//sum starts =0
   return result;
}
//console.log(getTotalRevenue(orders));

function getBigOrders(orders,min)
{
    //filter orders in bigorder if their total is greater than min
    let bigorder=orders.filter((order)=>
    {
        return order.total>=min;
    });
    return bigorder;
}
//console.log(getBigOrders(orders,8));

function getOrderSummaries(orders)
{
    //map returns a new array it follows what we write after => without modifying original one 
    return orders.map((order)=>
    "#"+order.id+" "+order.customer+" -"+order.items.length+" item (s) -$"+order.total.toFixed(2));
}
//console.log(getOrderSummaries(orders));

function getSortedByTotal(orders)
{
    const other=[...orders];//spread operator->it takes a copy of the array
    other.sort((a,b)=>b.total-a.total);//we sorted the copied array
    return other;
}
//console.log(getSortedByTotal(orders));

function findOrdersByItem(orders,item)
{
    let ids=[];
    for(let i=0;i<orders.length;i++)
    {
        if(orders[i].items.includes(item))//if we find the item inside the order
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
    for(let j=0;j<orders[i].items.length;j++)//items is also an array
    {
        //enters inside items array in order and searches item by item
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
        if(count[item]>max)//at the start->for e.g item=latte 
        {
            mostPopular=item; 
            max=count[item];//count[latte]=2>0 max=2
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
    });//inside customers there is the name of all customer that are in orders
     let unique=new Set(customers);//Set takes unique customers does not accept duplicates
     return [...unique];//turns the set into an array
}
//console.log(getUniqueCustomers(orders));
function getAllItems(orders)
{
    //flatMap combines all the arrays into one
    let items=orders.flatMap((order)=>{
        return order.items;
    });
    let distinct=new Set(items);
    return [...distinct];//turns the set into an array
}
//console.log(getAllItems(orders));
const setA=new Set(mondayCustomers);
const setB=new Set(tuesdayCustomers);

function bothDays(setA,setB)
{
    let both=[];
    setA.forEach((customer)=>{ 
        if(setB.has(customer))//for each customer in set a if they are in setB
        {
            both.push(customer);//push add them at the end 
        }
    });
    return both;
}
//console.log(bothDays(setA,setB));
function onlyFirstDay(setA,setB)
{
    let monday=[];
    setA.forEach((customer)=>{
        if(!setB.has(customer))//for each customer who isn't in setB
        {
            monday.push(customer);//add at the end
        }
    });
    return monday;
}
//console.log(onlyFirstDay(setA,setB));
function allCustomers(setA,setB)
{
    //either=>either monday or tuesday or both
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

//console.log("Size of Tuesday's customer:",setB.size);

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