let name = "jack";
let age = 25;
let techs = ["JS","Node","React"];
function knowsTech(tech){
    console.log("In function knowsTech ",tech);
    return techs.find(t1 => t1 === tech) ? true : false;
}
module.exports.data =  {name,age,techs};
module.exports.fns = {knowsTech};