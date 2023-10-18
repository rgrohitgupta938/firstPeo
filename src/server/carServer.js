let express = require("express");
let { carMaster, cars } = require("./carData");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  next();
});
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));
app.get("/cars", function (req, res) {
    let minprice = req.query.minprice;
    let maxprice = req.query.maxprice;
    let fuel = req.query.fuel;
    let type = req.query.type;
    let sort = req.query.sort;
    let arr1 = cars;
    if(minprice){
        arr1 = arr1.filter((ar) => ar.price >= +minprice)
    }
    if(maxprice){
        arr1 = arr1.filter((ar) => ar.price <= +maxprice)
    }
    if (fuel) {
        arr1 = arr1.filter((cr) => {
          return carMaster.find((st) => st.model === cr.model && st.fuel === fuel);
        });
      }
    if(type){
        arr1 = arr1.filter((cr) => {
            return carMaster.find((st) => st.model === cr.model && st.type === type);
          });
    }
    if(sort){
        sort === "kms" ? arr1.sort((p1,p2) => +p1.kms - +p2.kms) : arr1;
        sort === "price" ? arr1.sort((p1,p2) => +p1.price - +p2.price) : arr1;
        sort === "year" ? arr1.sort((p1,p2) => +p1.year - +p2.year) : arr1;
    }
    console.log(arr1);
    res.send(arr1);
});
app.post("/cars",function(req,res){
    let body = req.body;
    let st = cars.findIndex((t) => t.id === body.id);
    console.log(st,body);
    if( st <0){
        cars.push(body);
        console.log(body);
        res.send(body);
    }
    else{
        res.send("Id already Exist");
    }
});
app.get("/cars/:id",function(req,res){
    let id = req.params.id;
    let arr1 = cars.find((cr) => cr.id === id);
    if(arr1){
        res.send(arr1);
    }
    else{
        res.status(404).send("Car Not Found");
    }
});
app.put("/cars/:id",function(req,res){
    let id = req.params.id;
    let body = req.body;
    let arr1 =  cars.findIndex((st) => st.id === id);
    if(arr1 >=0){
        let updated = {id:id,...body};
        cars[arr1] = updated;
        res.send(updated);
    }
    else{
        res.status(404).send("Cart not found");
    }
});
app.delete("/cars/:id",function(req,res){
    let id = req.params.id;
    let st = cars.findIndex((st) => st.id === id);
    if(st < 0){
        res.status(404).send("car not found");
    }else{
        let delCar = cars.splice(st,1);
        res.send(delCar);
    }
});
app.get("/carmaster",function(req,res){
    console.log(carMaster);
    res.send(carMaster);
})