let b = require("./mobile");
let c = require("./sales");

function totalOrderValue(){
    return c.orders.reduce((acc, curr) => {
        return acc + (curr.quantity * b.fns(curr.mobileId).price);
    }, 0);
}
//console.log(b.mobiles);
//console.log(b.brands);
//console.log(b.fns(1));
console.log(c.orders);
console.log("Total Order Value :" +totalOrderValue());