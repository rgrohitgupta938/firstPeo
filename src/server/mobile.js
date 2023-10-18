const mobiles = [
    { id: 1, brand: "Apple", model: "iPhone11", price: 55000 },
    { id: 2, brand: "Xiaomi", model: "Poco F1", price: 16000 },
    { id: 3, brand: "Apple", model: "iPhone12", price: 71000 },
    { id: 4, brand: "Xiaomi", model: "Poco F2", price: 19000 },
    { id: 5, brand: "Xiaomi", model: "Mi 11", price: 21000 },
    { id: 6, brand: "Apple", model: "iPhoneXR", price: 48500 },
  ];
  const brands = ["Apple", "Xiaomi"];
  function getMobileByModel(id){
    return mobiles.find((mod) => mod.id === id);
  }
  module.exports.mobiles = mobiles;
  module.exports.brands = brands;
  module.exports.fns = getMobileByModel;
  