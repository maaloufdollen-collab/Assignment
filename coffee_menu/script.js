const menu = [ 
  { name: "Espresso", price: 3.0 }, 
  { name: "Latte",    price: 4.5 }, 
  { name: "Mocha",    price: 5.0 }, 
  { name: "Muffin",   price: 2.5 }, 
]; 
let cart = []; 
function renderMenu()
//displays the menu in a list form :item name - price
{
    const menuList=document.getElementById("menu-list");
    //to get the elements with id=menu-list
    menuList.textContent="";
    //clears the list
    menu.forEach((item)=>{
        //for each item in the menu store it in a list
        const li=document.createElement("li");
        li.textContent=item.name+" — $"+item.price.toFixed(2);
        //each list has an Add button
        const button =document.createElement("button");
        button.textContent=" Add";
        button.addEventListener("click",()=>{
            cart.push(item);
            renderCart();//to update cart display everytime we click on Add
        });//when button is clicked execute this function
        li.appendChild(button);//put button inside the list
        menuList.appendChild(li);
    });
}

const cartList=document.getElementById("cart-list");

//updates the cart
function renderCart(){
    cartList.textContent="";
    const cart_count=document.getElementById("cart-count");
    cart_count.textContent=cart.length;
    const unique=[...new Set(cart.map(item=>item.name))];//we created a set for items name
       unique.forEach((name)=>{
        const items=cart.filter(item=>item.name===name);
        const quantity=items.length;
        const item=items[0];
    const li=document.createElement("li");
        li.textContent=item.name+" x "+quantity+" — $ "+(item.price*quantity).toFixed(2)+" ";
       
        //we added two new buttons + and -
        const plus=document.createElement("button");
        plus.textContent="+";
        plus.dataset.name=name;
        const minus=document.createElement("button");
        minus.textContent="-";
        minus.dataset.name=name;
        
        // const button=document.createElement("button");
        // button.textContent=" Remove";
        //we used button.dataset.index in order to delete one entry even if the user entered same entry twice
        //button.dataset.index=index;//we are putting the index number on the button
        //but the user doesn't see the index of the button only javascript does
        
        li.appendChild(plus);
        li.appendChild(minus);
        //li.appendChild(button);
        cartList.appendChild(li);
    });
    updateTotal();
}
//we need to add one listener to the whole cart list and not to each item in it
 cartList.addEventListener("click",(event)=>
{
    if(event.target.tagName ==="BUTTON")
        //event.target means the thing i clicked
    {
        const name=event.target.dataset.name;
        //if we clicked on + add at the end
        if(event.target.textContent==="+")
            {
                const item=cart.find(c=>c.name===name);
                cart.push(item);
            }
            //if we clicked - delete at index
        else if(event.target.textContent==="-")
            {
                const i=cart.findIndex(c=>c.name===name);
                cart.splice(i,1);
            }
        renderCart();//to show updated cart
        // const index=Number(event.target.dataset.index);
        // cart.splice(index,1);//starts at index and removes one element
    }
});

function updateTotal()
{
    const total=cart.reduce((sum,item)=>{
        return sum+item.price;
    },0);
    const cartTotal= document.getElementById("cart-total");
    cartTotal.textContent=total.toFixed(2);
     const reward=document.getElementById("reward-msg");
    if(total>15)
    {
        cartTotal.style.color="red";
        reward.classList.remove("hidden");
        //classList so javascript can access to Css classes
    }
    else{
        cartTotal.style.color="black";
        reward.classList.add("hidden");
    }
}

function addTomenu()
{
    const click=document.getElementById("add-custom-btn");
    click.addEventListener("click",()=>{
        const item=document.getElementById("item-name").value.trim();
        //we take item-name then trim it then take price and trim
        const price=document.getElementById("item-price").value.trim();

    const error=document.getElementById("error-msg");
    error.style.color="red";
    error.textContent="";//error is empty
    let valid=true;

    if(item==="")//if item name is empty
        {
            error.textContent+="Name is required.";
            valid=false;
        }
    if(!isNaN(item))
    {
        error.textContent+="Item name shouldn't be a number";
        valid=false;
    }
    if(price<=0)
    {
        error.textContent+="Price must be a positive number.";
         valid=false;
    }

    if(isNaN(Number(price)))//price is not a number
    //Number(price) at the start we are taking price of a string form
    {
        error.textContent+="Price must be a number.";
         valid=false;
    }
    //to check if item already exists
    const exists=menu.some((c)=>{
        return c.name.toLowerCase()===item.toLowerCase();
    });

    if(exists)
    {
        error.textContent+=" This item already exists.";
        valid=false;
    }
    if(valid===false)
    {
         return;
    }
    
   menu.push({name:item, price:Number(price)});
   renderMenu();//to add on the displayed menu
   document.getElementById("item-name").value="";//.value because they are an input
   document.getElementById("item-price").value="";
   document.getElementById("error-msg").textContent="";//.textContent because its a message
});
}

function ClearCart()
{
    const clear=document.getElementById("clear-cart-btn");
    clear.addEventListener("click",()=>{
   
    if(cart.length===0)//in case we clicked clear but the cart is already empty
   { const message =document.getElementById("cart-list");
    message.textContent="Your cart is already empty";
   }
   else{cart=[];//empty the cart
    renderCart();//updates the display of the cart
   }
});
}

renderMenu();
renderCart();
addTomenu();
ClearCart();