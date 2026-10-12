function calculatePrice(size,quantity,isMember,hour)
{
    //input validation
    if(size!="small"&&size!="medium"&&size!="large")
    {
        return "Invalid size";
    }
    if(!Number.isInteger(quantity)||quantity<=0)
    {
        return "Invalid quantity";
    }
    if(!Number.isInteger(hour)||hour<0||hour>23)
    {
        return "Invalid hour";
    }
    //base pricing
    let price;
    switch(size)
    {
        case "small": 
        {price=2.50;
            break;
        }
        case "medium":{
            price=3.50;
            break;
        }
        case "large":
        {
            price=4.50;
            break;
        }
    }
    let subtotal=price*quantity;
    if(quantity>=5)
    {
        subtotal=subtotal*0.90;//0.90=>100-10(%)
    }
    if(isMember===true)
        {
            subtotal=subtotal*0.95;//0.95=>100-95(%)
        }
    if(hour>=15&&hour<=17)
    {
        subtotal-=1;
    }
    if(subtotal<0)
    {
        return 0;
    }
    subtotal=Math.round(subtotal*100)/100;//rounding
    return subtotal;
}

function printPriceTable(size,isMember,hour)
{
    //cup from 1->10
    for(let i=1;i<=10;i++)
    {
        let price=calculatePrice(size,i,isMember,hour);//called the function calculateprice in order to get the toal of cups based on their qty
        console.log("Qty"+i+"->"+"$"+price.toFixed(2));
    }
}

function cheapestHour(size,quantity,isMember)
{
    let low=calculatePrice(size,quantity,isMember,0);
    let bestHour=0;
    //the loop checks all hours, whenever it finds a lower price it updates
    for(let h=0;h<=23;h++)
    {
        let price=calculatePrice(size,quantity,isMember,h);
        if(price<low)
        {
            low=price;
            bestHour=h;
        }
    }
    console.log("The best time to order "+quantity+" "+size+" coffees at "+bestHour+" for $ "+low.toFixed(2));
    return bestHour;
}
console.log(calculatePrice("large", 2, false, 10));
console.log(calculatePrice("medium", 5, true, 16));
console.log(calculatePrice("small", 4, true, 9));
console.log(calculatePrice("small", 1, false, 15));
console.log(calculatePrice("xl", 1, false, 9));
console.log(calculatePrice("large", 0, false, 9));
console.log(calculatePrice("large", 2.5, true, 9));
console.log(calculatePrice("medium", 2, true, 25));

console.log(printPriceTable("medium", false, 16));

cheapestHour("large", 3, false);
