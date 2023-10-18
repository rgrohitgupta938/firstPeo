let fData = [
  {
    prodCode: "DS2S245",
    category: "Dining",
    desc: ["Two	seater	Dining	Set", "Built	from	High	quality	wood", "1	year	warranty"],
    img: "https://m.media-amazon.com/images/I/71GHHR5sxQL.jpg",
    ingredients: [
      { ingName: "Dining	Table", qty: 1 },
      { ingName: "Chair", qty: 2 },
    ],
    title: "Two	seater	Dining	Set",
  },
  {
    prodCode: "DS6S761",
    category: "Dining",
    desc: [
      "Six	Seater	Dining	Set	in	Antique	Cherry	Colour",
      "Assembly	by	Skilled	Carpenters",
      "Made	from	Teak	wood",
    ],
    img: "https://hometown.gumlet.io/media/product/58/8673/91345/1.jpg?mode=fill&w=335&h=335&dpr=1.3",
    ingredients: [
      { ingName: "Dining	Table", qty: 1 },
      { ingName: "Chair", qty: 4 },
      { ingName: "Bench", qty: 1 },
    ],
    title: "Six	Seater	Dining	Set",
  },
  {
    prodCode: "DS4S177",
    category: "Dining",
    desc: [
      "Mild	Steel	Four	Seater	Dining	Set	in	Black	Colour",
      "Knock-down	construction	for	easy	transportation",
    ],
    img: "https://m.media-amazon.com/images/I/71u6M17c5VL._AC_UF894,1000_QL80_.jpg",
    ingredients: [
      { ingName: "Dining	Table", qty: 1 },
      { ingName: "Chair", qty: 4 },
    ],
    title: "Mild	Steel	Dining	Set",
  },
  {
    prodCode: "DC2S705",
    category: "Dining",
    desc: [
      "Solid	Wood	Dining	Chair	Set	of	Two	in	Dark	Walnut	Colour",
      "Beautiful	design	carved	on	dining	chair",
      "Dining	chair	seat	upholstered	in	dark	brown	Fabric",
    ],
    img: "https://cdn.shopify.com/s/files/1/0044/1208/0217/files/ROVERDININGCHAIR02_900x.jpg?v=1692599226",
    ingredients: [{ ingName: "Chair", qty: 2 }],
    title: "Dining	Chair	Set",
  },
  {
    prodCode: "BN1S388",
    category: "Dining",
    desc: [
      "Solid	Wood	Dining	Bench	in	Dark	Walnut	Colour",
      "Comfortable	bench	for	a	relaxed	dinner",
    ],
    img: "https://m.media-amazon.com/images/I/41CAJX83OcL._AC_UF894,1000_QL80_DpWeblab_.jpg",
    ingredients: [{ ingName: "Bench", qty: 1 }],
    title: "Dining	Bench",
  },
  {
    prodCode: "SF2S532",
    category: "Drawing",
    desc: [
      "Characteristic	Rising	Track	Arm	Rest	Design",
      "Premium	High	Gloss	Leatherette	Upholstery",
      "Independent	Headrest	And	Lumber	Support",
    ],
    img: "https://m.media-amazon.com/images/I/61fOx8M9d4S._AC_UF894,1000_QL80_.jpg",
    ingredients: [{ ingName: "Sofa", qty: 1 }],
    title: "Two	Seater	Sofa",
  },
  {
    prodCode: "SF2S206",
    category: "Drawing",
    desc: ["Two	Seater	Sofa	in	Blue	Colour", "Assembly	by	Skilled	Carpenters"],
    img: "https://hometown.gumlet.io/media/product/97/2073/47584/1.jpg?mode=fill&w=335&h=335&dpr=1.3",
    ingredients: [{ ingName: "Sofa", qty: 1 }],
    title: "Two	Seater	Sofa",
  },
  {
    prodCode: "SFBD311",
    category: "Drawing",
    desc: [
      "Sofa	Cum	bed	in	Brown	Colour",
      "Ply-wood	construction	with	hand	polished	finish",
      "Removable	fabric	cover	on	best	quality	foam	mattress",
      "Throw	cushions	and	bolsters	come	with	the	product",
    ],
    img: "https://www.jfwoods.in/admin/images/products/Emporio%203%20Seater%20Sofa%20Cum%20Bed%20in%20Teak%20Wood%20by%20Jfwoods/1.jpg",
    ingredients: [
      { ingName: "Sofa", qty: 1 },
      { ingName: "Cushions", qty: 2 },
    ],
    title: "Sofa	cum	Bed",
  },
  {
    prodCode: "BDQS381",
    category: "Bedroom",

    desc: [
      "Wood	Box	Storage	King	Size	Bed	in	Wenge	Colour	",
      "Box	Storage	included	for	Maximum	space	utilization",
      "Mattress	is	included",
    ],
    img: "https://m.media-amazon.com/images/I/61lU-bKpLaL._AC_UF894,1000_QL80_DpWeblab_.jpg",
    ingredients: [
      { ingName: "Bed", qty: 1 },
      { ingName: "Mattress", qty: 2 },
    ],
    title: "King	size	Bed",
  },
  {
    prodCode: "BDQS229",
    category: "Bedroom",
    desc: [
      "Wood	Hydraulic	Storage	Queen	Size	Bed",
      "Half	hydraulic	storage",
      "Superior	E2	grade	MDF	used	with	melamine	finish",
    ],
    img: "https://www.royaloakindia.com/_next/image?url=https%3A%2F%2Fmedia.royaloakindia.com%2Fmedia%2Fcatalog%2Fproduct%2Fr%2Fo%2Froyaloak-tivoli-italian-queen-size-bed-with-hydraulic-and-headboard-storage-2.jpg&w=1920&q=50",
    ingredients: [{ ingName: "Bed", qty: 1 }],
    title: "Queen	size	Bed",
  },
  {
    prodCode: "ST1T425",
    category: "Study",
    desc: [
      "Wood	Study	Table	in	Walnut	Colour",
      "Assembly	by	Skilled	Carpenters",
      "Built	from	High	Quality	Wood",
    ],
    img: "https://m.media-amazon.com/images/I/81Wuout6cYL._AC_UF894,1000_QL80_DpWeblab_.jpg",
    ingredients: [{ ingName: "Study	Table", qty: 1 }],
    title: "Study	Table",
  },
  {
    prodCode: "ST1T588",
    category: "Study",
    desc: [
      "	Wood	Study	Table	in	Highgloss	White	&	Blue	Colour",
      "Study	table	comes	with	bookshelf	on	top,	5	drawers	&	1	open	shelf",
      "Superior	quality	MDF	with	stain	resistant	melamine	finish",
    ],
    img: "https://m.media-amazon.com/images/I/71LPzyNF34L._AC_UF894,1000_QL80_DpWeblab_.jpg",
    ingredients: [{ ingName: "Study	Table", qty: 1 }],
    title: "Study	Table",
  },
];
let users = [
  { email: "rgrohitgupta938@gmail.com", password: "admin", role: "admin" },
  { email: "user@user.com", password: "admin", role: "admin" },
  { email: "user@user.com", password: "user", role: "customer" },
];
module.exports.fData = fData;
module.exports.users = users;
