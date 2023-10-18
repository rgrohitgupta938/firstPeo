import React, { Component } from "react";
import http from "../../../services/httpService";
import auth from "../../../services/authService";
class CustomerDetails extends Component {
  state = {
    details: {
      gender: "",
      dob: "",
      PAN: "",
      addressLine1: "",
      state: "",
      city: "",
      addressLine2: "",
      name: "",
    },
    errors: {},
    btn: false,
  };
  splitDOB = (dob) => {
    const [day = "", month = "", year = ""] = dob.split("-");
    return { day, month, year };
  };
  formatDOB = (dobObj) => {
    const { day, month, year } = dobObj;
    return `${day}-${month}-${year}`;
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    const { details, btn } = this.state;
    console.log(btn);
    if (name === "day" || name === "month" || name === "year") {
      const currentDOB = details.dob || "";
      const dobObject = currentDOB
        ? this.splitDOB(currentDOB)
        : { day: "", month: "", year: "" };
      const updatedDOB = {
        ...dobObject,
        [name]: value,
      };
      const newDOB = this.formatDOB(updatedDOB);
      const updatedDetails = {
        ...details,
        dob: newDOB,
        name: auth.getUser().name,
      };
      this.setState({ details: updatedDetails });
    } else if (name === "gender") {
      const updatedDetails = {
        ...details,
        gender: value,
        name: auth.getUser().name,
      };
      this.setState({ details: updatedDetails });
    } else {
      const updatedDetails = {
        ...details,
        [name]: value,
        name: auth.getUser().name,
      };
      this.setState({ details: updatedDetails });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hanlde");
    let { details } = this.state;
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      console.log(details);
      this.postEmpContact(`/customerDetails`, details);
      alert("Details added Successfully");
      this.props.history.push("/customer");
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  validateAll = () => {
    const { gender, city, state, PAN, dob } = this.state.details;
    let errors = {};
    errors.gender = this.validateGender(gender);
    errors.state = this.validateState(state);
    errors.PAN = this.validatePAN(PAN);
    errors.dob = this.validateDob(dob);
    errors.city = this.validateCity(city);
    return errors;
  };

  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, key) => (errors[key] ? acc + 1 : acc), 0);
    return count === 0;
  };

  validateGender = (gender) => {
    if (!gender) {
      return "Select Gender";
    }
  };
  validateState = (state) => {
    return !state ? "State must be Selected" : "";
  };

  validateCity = (city) => {
    return !city ? "City must be Selected" : "";
  };
  validatePAN = (PAN) => {
    return !PAN ? "PAN No must be entered" : "";
  };
  validateDob = (dob) => {
    if (!dob) {
      return "Select Date of birth";
    }
    const months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const { day, month, year } = this.splitDOB(dob);
    const validDay = day >= 1 && day <= 31;
    const validMonth = months.includes(month);
    const validYear = year >= 1980 && year <= 2023;
    const errors = [];
    console.log(day, month, year);
    if (!validDay) {
      errors.push("Select day");
    }
    if (!validMonth) {
      errors.push("Select month");
    }
    if (!validYear) {
      errors.push("Select year");
    }
    return errors.join(", ");
  };

  isFormValid = () => {
    let errors = this.validateAll();
    return this.isValid(errors);
  };
  async postEmpContact(url, obj) {
    try {
      let response = await http.post(url, obj);
      let errors = {};
      errors.succ = "Details have been Successfully Added";
      this.setState({ errors: errors });
    } catch (ex) {
      if (ex.response && ex.status !== 200) {
        let errors = {};
        errors.fail = "Database error";
        this.setState({ errors: errors });
      }
    }
  }
  async fetchEmpContact() {
    const user = auth.getUser().name;
    console.log(user);
    let response = await http.get(`/getCustomer/${user}`);
    let { data } = response;
    console.log(response);
    this.setState({
      details: data,
      btn: data === "" ? true : false,
    });
    console.log(this.state.btn);
  }
  handleValidate = (e) => {
    let { currentTarget: input } = e;
    let s1 = { ...this.state };
    switch (input.name) {
      case "city":
        s1.errors.city = this.validateCity(input.value);
        break;
      case "gender":
        s1.errors.gender = this.validateGender(input.value);
        break;
      case "state":
        s1.errors.state = this.validateState(input.value);
        break;
      case "dob":
        s1.errors.dob = this.validateDob(input.value);
        break;
      case "PAN":
        s1.errors.PAN = this.validatePAN(input.value);
        break;
      default:
        break;
    }
    this.setState(s1);
  };
  componentDidMount() {
    this.fetchEmpContact();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchEmpContact();
  }
  render() {
    const { gender, city, state, addressLine1, PAN, dob, addressLine2 } =
      this.state.details;
    let { errors, btn } = this.state;
    const { day, month, year } = dob
      ? this.splitDOB(this.state.details.dob)
      : {};
    const months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const cities = {
      "Andaman and Nicobar Islands": ["Port Blair"],
      Haryana: [
        "Faridabad",
        "Gurgaon",
        "Hisar",
        "Rohtak",
        "Panipat",
        "Karnal",
        "Sonipat",
        "Yamunanagar",
        "Panchkula",
        "Bhiwani",
        "Bahadurgarh",
        "Jind",
        "Sirsa",
        "Thanesar",
        "Kaithal",
        "Palwal",
        "Rewari",
        "Hansi",
        "Narnaul",
        "Fatehabad",
        "Gohana",
        "Tohana",
        "Narwana",
        "Mandi Dabwali",
        "Charkhi Dadri",
        "Shahbad",
        "Pehowa",
        "Samalkha",
        "Pinjore",
        "Ladwa",
        "Sohna",
        "Safidon",
        "Taraori",
        "Mahendragarh",
        "Ratia",
        "Rania",
        "Sarsod",
      ],
      "Tamil Nadu": [
        "Chennai",
        "Coimbatore",
        "Madurai",
        "Tiruchirappalli",
        "Salem",
        "Tirunelveli",
        "Tiruppur",
        "Ranipet",
        "Nagercoil",
        "Thanjavur",
        "Vellore",
        "Kancheepuram",
        "Erode",
        "Tiruvannamalai",
        "Pollachi",
        "Rajapalayam",
        "Sivakasi",
        "Pudukkottai",
        "Neyveli (TS)",
        "Nagapattinam",
        "Viluppuram",
        "Tiruchengode",
        "Vaniyambadi",
        "Theni Allinagaram",
        "Udhagamandalam",
        "Aruppukkottai",
        "Paramakudi",
        "Arakkonam",
        "Virudhachalam",
        "Srivilliputhur",
        "Tindivanam",
        "Virudhunagar",
        "Karur",
        "Valparai",
        "Sankarankovil",
        "Tenkasi",
        "Palani",
        "Pattukkottai",
        "Tirupathur",
        "Ramanathapuram",
        "Udumalaipettai",
        "Gobichettipalayam",
        "Thiruvarur",
        "Thiruvallur",
        "Panruti",
        "Namakkal",
        "Thirumangalam",
        "Vikramasingapuram",
        "Nellikuppam",
        "Rasipuram",
        "Tiruttani",
        "Nandivaram-Guduvancheri",
        "Periyakulam",
        "Pernampattu",
        "Vellakoil",
        "Sivaganga",
        "Vadalur",
        "Rameshwaram",
        "Tiruvethipuram",
        "Perambalur",
        "Usilampatti",
        "Vedaranyam",
        "Sathyamangalam",
        "Puliyankudi",
        "Nanjikottai",
        "Thuraiyur",
        "Sirkali",
        "Tiruchendur",
        "Periyasemur",
        "Sattur",
        "Vandavasi",
        "Tharamangalam",
        "Tirukkoyilur",
        "Oddanchatram",
        "Palladam",
        "Vadakkuvalliyur",
        "Tirukalukundram",
        "Uthamapalayam",
        "Surandai",
        "Sankari",
        "Shenkottai",
        "Vadipatti",
        "Sholingur",
        "Tirupathur",
        "Manachanallur",
        "Viswanatham",
        "Polur",
        "Panagudi",
        "Uthiramerur",
        "Thiruthuraipoondi",
        "Pallapatti",
        "Ponneri",
        "Lalgudi",
        "Natham",
        "Unnamalaikadai",
        "P.N.Patti",
        "Tharangambadi",
        "Tittakudi",
        "Pacode",
        "O' Valley",
        "Suriyampalayam",
        "Sholavandan",
        "Thammampatti",
        "Namagiripettai",
        "Peravurani",
        "Parangipettai",
        "Pudupattinam",
        "Pallikonda",
        "Sivagiri",
        "Punjaipugalur",
        "Padmanabhapuram",
        "Thirupuvanam",
      ],
      "Madhya Pradesh": [
        "Indore",
        "Bhopal",
        "Jabalpur",
        "Gwalior",
        "Ujjain",
        "Sagar",
        "Ratlam",
        "Satna",
        "Murwara (Katni)",
        "Morena",
        "Singrauli",
        "Rewa",
        "Vidisha",
        "Ganjbasoda",
        "Shivpuri",
        "Mandsaur",
        "Neemuch",
        "Nagda",
        "Itarsi",
        "Sarni",
        "Sehore",
        "Mhow Cantonment",
        "Seoni",
        "Balaghat",
        "Ashok Nagar",
        "Tikamgarh",
        "Shahdol",
        "Pithampur",
        "Alirajpur",
        "Mandla",
        "Sheopur",
        "Shajapur",
        "Panna",
        "Raghogarh-Vijaypur",
        "Sendhwa",
        "Sidhi",
        "Pipariya",
        "Shujalpur",
        "Sironj",
        "Pandhurna",
        "Nowgong",
        "Mandideep",
        "Sihora",
        "Raisen",
        "Lahar",
        "Maihar",
        "Sanawad",
        "Sabalgarh",
        "Umaria",
        "Porsa",
        "Narsinghgarh",
        "Malaj Khand",
        "Sarangpur",
        "Mundi",
        "Nepanagar",
        "Pasan",
        "Mahidpur",
        "Seoni-Malwa",
        "Rehli",
        "Manawar",
        "Rahatgarh",
        "Panagar",
        "Wara Seoni",
        "Tarana",
        "Sausar",
        "Rajgarh",
        "Niwari",
        "Mauganj",
        "Manasa",
        "Nainpur",
        "Prithvipur",
        "Sohagpur",
        "Nowrozabad (Khodargama)",
        "Shamgarh",
        "Maharajpur",
        "Multai",
        "Pali",
        "Pachore",
        "Rau",
        "Mhowgaon",
        "Vijaypur",
        "Narsinghgarh",
      ],
      Jharkhand: [
        "Dhanbad",
        "Ranchi",
        "Jamshedpur",
        "Bokaro Steel City",
        "Deoghar",
        "Phusro",
        "Adityapur",
        "Hazaribag",
        "Giridih",
        "Ramgarh",
        "Jhumri Tilaiya",
        "Saunda",
        "Sahibganj",
        "Medininagar (Daltonganj)",
        "Chaibasa",
        "Chatra",
        "Gumia",
        "Dumka",
        "Madhupur",
        "Chirkunda",
        "Pakaur",
        "Simdega",
        "Musabani",
        "Mihijam",
        "Patratu",
        "Lohardaga",
        "Tenu dam-cum-Kathhara",
      ],
      Mizoram: ["Aizawl", "Lunglei", "Saiha"],
      Nagaland: [
        "Dimapur",
        "Kohima",
        "Zunheboto",
        "Tuensang",
        "Wokha",
        "Mokokchung",
      ],
      "Himachal Pradesh": [
        "Shimla",
        "Mandi",
        "Solan",
        "Nahan",
        "Sundarnagar",
        "Palampur",
        "Kullu",
      ],
      Tripura: [
        "Agartala",
        "Udaipur",
        "Dharmanagar",
        "Pratapgarh",
        "Kailasahar",
        "Belonia",
        "Khowai",
      ],
      "Andhra Pradesh": [
        "Visakhapatnam",
        "Vijayawada",
        "Guntur",
        "Nellore",
        "Kurnool",
        "Rajahmundry",
        "Kakinada",
        "Tirupati",
        "Anantapur",
        "Kadapa",
        "Vizianagaram",
        "Eluru",
        "Ongole",
        "Nandyal",
        "Machilipatnam",
        "Adoni",
        "Tenali",
        "Chittoor",
        "Hindupur",
        "Proddatur",
        "Bhimavaram",
        "Madanapalle",
        "Guntakal",
        "Dharmavaram",
        "Gudivada",
        "Srikakulam",
        "Narasaraopet",
        "Rajampet",
        "Tadpatri",
        "Tadepalligudem",
        "Chilakaluripet",
        "Yemmiganur",
        "Kadiri",
        "Chirala",
        "Anakapalle",
        "Kavali",
        "Palacole",
        "Sullurpeta",
        "Tanuku",
        "Rayachoti",
        "Srikalahasti",
        "Bapatla",
        "Naidupet",
        "Nagari",
        "Gudur",
        "Vinukonda",
        "Narasapuram",
        "Nuzvid",
        "Markapur",
        "Ponnur",
        "Kandukur",
        "Bobbili",
        "Rayadurg",
        "Samalkot",
        "Jaggaiahpet",
        "Tuni",
        "Amalapuram",
        "Bheemunipatnam",
        "Venkatagiri",
        "Sattenapalle",
        "Pithapuram",
        "Palasa Kasibugga",
        "Parvathipuram",
        "Macherla",
        "Gooty",
        "Salur",
        "Mandapeta",
        "Jammalamadugu",
        "Peddapuram",
        "Punganur",
        "Nidadavole",
        "Repalle",
        "Ramachandrapuram",
        "Kovvur",
        "Tiruvuru",
        "Uravakonda",
        "Narsipatnam",
        "Yerraguntla",
        "Pedana",
        "Puttur",
        "Renigunta",
        "Rajam",
        "Srisailam Project (Right Flank Colony) Township",
      ],
      Punjab: [
        "Ludhiana",
        "Patiala",
        "Amritsar",
        "Jalandhar",
        "Bathinda",
        "Pathankot",
        "Hoshiarpur",
        "Batala",
        "Moga",
        "Malerkotla",
        "Khanna",
        "Mohali",
        "Barnala",
        "Firozpur",
        "Phagwara",
        "Kapurthala",
        "Zirakpur",
        "Kot Kapura",
        "Faridkot",
        "Muktsar",
        "Rajpura",
        "Sangrur",
        "Fazilka",
        "Gurdaspur",
        "Kharar",
        "Gobindgarh",
        "Mansa",
        "Malout",
        "Nabha",
        "Tarn Taran",
        "Jagraon",
        "Sunam",
        "Dhuri",
        "Firozpur Cantt.",
        "Sirhind Fatehgarh Sahib",
        "Rupnagar",
        "Jalandhar Cantt.",
        "Samana",
        "Nawanshahr",
        "Rampura Phul",
        "Nangal",
        "Nakodar",
        "Zira",
        "Patti",
        "Raikot",
        "Longowal",
        "Urmar Tanda",
        "Morinda, India",
        "Phillaur",
        "Pattran",
        "Qadian",
        "Sujanpur",
        "Mukerian",
        "Talwara",
      ],
      Chandigarh: ["Chandigarh"],
      Rajasthan: [
        "Jaipur",
        "Jodhpur",
        "Bikaner",
        "Udaipur",
        "Ajmer",
        "Bhilwara",
        "Alwar",
        "Bharatpur",
        "Pali",
        "Barmer",
        "Sikar",
        "Tonk",
        "Sadulpur",
        "Sawai Madhopur",
        "Nagaur",
        "Makrana",
        "Sujangarh",
        "Sardarshahar",
        "Ladnu",
        "Ratangarh",
        "Nokha",
        "Nimbahera",
        "Suratgarh",
        "Rajsamand",
        "Lachhmangarh",
        "Rajgarh (Churu)",
        "Nasirabad",
        "Nohar",
        "Phalodi",
        "Nathdwara",
        "Pilani",
        "Merta City",
        "Sojat",
        "Neem-Ka-Thana",
        "Sirohi",
        "Pratapgarh",
        "Rawatbhata",
        "Sangaria",
        "Lalsot",
        "Pilibanga",
        "Pipar City",
        "Taranagar",
        "Vijainagar, Ajmer",
        "Sumerpur",
        "Sagwara",
        "Ramganj Mandi",
        "Lakheri",
        "Udaipurwati",
        "Losal",
        "Sri Madhopur",
        "Ramngarh",
        "Rawatsar",
        "Rajakhera",
        "Shahpura",
        "Shahpura",
        "Raisinghnagar",
        "Malpura",
        "Nadbai",
        "Sanchore",
        "Nagar",
        "Rajgarh (Alwar)",
        "Sheoganj",
        "Sadri",
        "Todaraisingh",
        "Todabhim",
        "Reengus",
        "Rajaldesar",
        "Sadulshahar",
        "Sambhar",
        "Prantij",
        "Mount Abu",
        "Mangrol",
        "Phulera",
        "Mandawa",
        "Pindwara",
        "Mandalgarh",
        "Takhatgarh",
      ],
      Assam: [
        "Guwahati",
        "Silchar",
        "Dibrugarh",
        "Nagaon",
        "Tinsukia",
        "Jorhat",
        "Bongaigaon City",
        "Dhubri",
        "Diphu",
        "North Lakhimpur",
        "Tezpur",
        "Karimganj",
        "Sibsagar",
        "Goalpara",
        "Barpeta",
        "Lanka",
        "Lumding",
        "Mankachar",
        "Nalbari",
        "Rangia",
        "Margherita",
        "Mangaldoi",
        "Silapathar",
        "Mariani",
        "Marigaon",
      ],
      Odisha: [
        "Bhubaneswar",
        "Cuttack",
        "Raurkela",
        "Brahmapur",
        "Sambalpur",
        "Puri",
        "Baleshwar Town",
        "Baripada Town",
        "Bhadrak",
        "Balangir",
        "Jharsuguda",
        "Bargarh",
        "Paradip",
        "Bhawanipatna",
        "Dhenkanal",
        "Barbil",
        "Kendujhar",
        "Sunabeda",
        "Rayagada",
        "Jatani",
        "Byasanagar",
        "Kendrapara",
        "Rajagangapur",
        "Parlakhemundi",
        "Talcher",
        "Sundargarh",
        "Phulabani",
        "Pattamundai",
        "Titlagarh",
        "Nabarangapur",
        "Soro",
        "Malkangiri",
        "Rairangpur",
        "Tarbha",
      ],
      Chhattisgarh: [
        "Raipur",
        "Bhilai Nagar",
        "Korba",
        "Bilaspur",
        "Durg",
        "Rajnandgaon",
        "Jagdalpur",
        "Raigarh",
        "Ambikapur",
        "Mahasamund",
        "Dhamtari",
        "Chirmiri",
        "Bhatapara",
        "Dalli-Rajhara",
        "Naila Janjgir",
        "Tilda Newra",
        "Mungeli",
        "Manendragarh",
        "Sakti",
      ],
      "Jammu and Kashmir": [
        "Srinagar",
        "Jammu",
        "Baramula",
        "Anantnag",
        "Sopore",
        "KathUrban Agglomeration",
        "Rajauri",
        "Punch",
        "Udhampur",
      ],
      Karnataka: [
        "Bengaluru",
        "Hubli-Dharwad",
        "Belagavi",
        "Mangaluru",
        "Davanagere",
        "Ballari",
        "Mysore",
        "Tumkur",
        "Shivamogga",
        "Raayachuru",
        "Robertson Pet",
        "Kolar",
        "Mandya",
        "Udupi",
        "Chikkamagaluru",
        "Karwar",
        "Ranebennuru",
        "Ranibennur",
        "Ramanagaram",
        "Gokak",
        "Yadgir",
        "Rabkavi Banhatti",
        "Shahabad",
        "Sirsi",
        "Sindhnur",
        "Tiptur",
        "Arsikere",
        "Nanjangud",
        "Sagara",
        "Sira",
        "Puttur",
        "Athni",
        "Mulbagal",
        "Surapura",
        "Siruguppa",
        "Mudhol",
        "Sidlaghatta",
        "Shahpur",
        "Saundatti-Yellamma",
        "Wadi",
        "Manvi",
        "Nelamangala",
        "Lakshmeshwar",
        "Ramdurg",
        "Nargund",
        "Tarikere",
        "Malavalli",
        "Savanur",
        "Lingsugur",
        "Vijayapura",
        "Sankeshwara",
        "Madikeri",
        "Talikota",
        "Sedam",
        "Shikaripur",
        "Mahalingapura",
        "Mudalagi",
        "Muddebihal",
        "Pavagada",
        "Malur",
        "Sindhagi",
        "Sanduru",
        "Afzalpur",
        "Maddur",
        "Madhugiri",
        "Tekkalakote",
        "Terdal",
        "Mudabidri",
        "Magadi",
        "Navalgund",
        "Shiggaon",
        "Shrirangapattana",
        "Sindagi",
        "Sakaleshapura",
        "Srinivaspur",
        "Ron",
        "Mundargi",
        "Sadalagi",
        "Piriyapatna",
        "Adyar",
      ],
      Manipur: ["Imphal", "Thoubal", "Lilong", "Mayang Imphal"],
      Kerala: [
        "Thiruvananthapuram",
        "Kochi",
        "Kozhikode",
        "Kollam",
        "Thrissur",
        "Palakkad",
        "Alappuzha",
        "Malappuram",
        "Ponnani",
        "Vatakara",
        "Kanhangad",
        "Taliparamba",
        "Koyilandy",
        "Neyyattinkara",
        "Kayamkulam",
        "Nedumangad",
        "Kannur",
        "Tirur",
        "Kottayam",
        "Kasaragod",
        "Kunnamkulam",
        "Ottappalam",
        "Thiruvalla",
        "Thodupuzha",
        "Chalakudy",
        "Changanassery",
        "Punalur",
        "Nilambur",
        "Cherthala",
        "Perinthalmanna",
        "Mattannur",
        "Shoranur",
        "Varkala",
        "Paravoor",
        "Pathanamthitta",
        "Peringathur",
        "Attingal",
        "Kodungallur",
        "Pappinisseri",
        "Chittur-Thathamangalam",
        "Muvattupuzha",
        "Adoor",
        "Mavelikkara",
        "Mavoor",
        "Perumbavoor",
        "Vaikom",
        "Palai",
        "Panniyannur",
        "Guruvayoor",
        "Puthuppally",
        "Panamattom",
      ],
      Delhi: ["Delhi", "New Delhi"],
      "Dadra and Nagar Haveli": ["Silvassa"],
      Puducherry: ["Pondicherry", "Karaikal", "Yanam", "Mahe"],
      Uttarakhand: [
        "Dehradun",
        "Hardwar",
        "Haldwani-cum-Kathgodam",
        "Srinagar",
        "Kashipur",
        "Roorkee",
        "Rudrapur",
        "Rishikesh",
        "Ramnagar",
        "Pithoragarh",
        "Manglaur",
        "Nainital",
        "Mussoorie",
        "Tehri",
        "Pauri",
        "Nagla",
        "Sitarganj",
        "Bageshwar",
      ],
      "Uttar Pradesh": [
        "Lucknow",
        "Kanpur",
        "Firozabad",
        "Agra",
        "Meerut",
        "Varanasi",
        "Allahabad",
        "Amroha",
        "Moradabad",
        "Aligarh",
        "Saharanpur",
        "Noida",
        "Loni",
        "Jhansi",
        "Shahjahanpur",
        "Rampur",
        "Modinagar",
        "Hapur",
        "Etawah",
        "Sambhal",
        "Orai",
        "Bahraich",
        "Unnao",
        "Rae Bareli",
        "Lakhimpur",
        "Sitapur",
        "Lalitpur",
        "Pilibhit",
        "Chandausi",
        "Hardoi ",
        "Azamgarh",
        "Khair",
        "Sultanpur",
        "Tanda",
        "Nagina",
        "Shamli",
        "Najibabad",
        "Shikohabad",
        "Sikandrabad",
        "Shahabad, Hardoi",
        "Pilkhuwa",
        "Renukoot",
        "Vrindavan",
        "Ujhani",
        "Laharpur",
        "Tilhar",
        "Sahaswan",
        "Rath",
        "Sherkot",
        "Kalpi",
        "Tundla",
        "Sandila",
        "Nanpara",
        "Sardhana",
        "Nehtaur",
        "Seohara",
        "Padrauna",
        "Mathura",
        "Thakurdwara",
        "Nawabganj",
        "Siana",
        "Noorpur",
        "Sikandra Rao",
        "Puranpur",
        "Rudauli",
        "Thana Bhawan",
        "Palia Kalan",
        "Zaidpur",
        "Nautanwa",
        "Zamania",
        "Shikarpur, Bulandshahr",
        "Naugawan Sadat",
        "Fatehpur Sikri",
        "Shahabad, Rampur",
        "Robertsganj",
        "Utraula",
        "Sadabad",
        "Rasra",
        "Lar",
        "Lal Gopalganj Nindaura",
        "Sirsaganj",
        "Pihani",
        "Shamsabad, Agra",
        "Rudrapur",
        "Soron",
        "SUrban Agglomerationr",
        "Samdhan",
        "Sahjanwa",
        "Rampur Maniharan",
        "Sumerpur",
        "Shahganj",
        "Tulsipur",
        "Tirwaganj",
        "PurqUrban Agglomerationzi",
        "Shamsabad, Farrukhabad",
        "Warhapur",
        "Powayan",
        "Sandi",
        "Achhnera",
        "Naraura",
        "Nakur",
        "Sahaspur",
        "Safipur",
        "Reoti",
        "Sikanderpur",
        "Saidpur",
        "Sirsi",
        "Purwa",
        "Parasi",
        "Lalganj",
        "Phulpur",
        "Shishgarh",
        "Sahawar",
        "Samthar",
        "Pukhrayan",
        "Obra",
        "Niwai",
        "Mirzapur",
      ],
      Bihar: [
        "Patna",
        "Gaya",
        "Bhagalpur",
        "Muzaffarpur",
        "Darbhanga",
        "Arrah",
        "Begusarai",
        "Chhapra",
        "Katihar",
        "Munger",
        "Purnia",
        "Saharsa",
        "Sasaram",
        "Hajipur",
        "Dehri-on-Sone",
        "Bettiah",
        "Motihari",
        "Bagaha",
        "Siwan",
        "Kishanganj",
        "Jamalpur",
        "Buxar",
        "Jehanabad",
        "Aurangabad",
        "Lakhisarai",
        "Nawada",
        "Jamui",
        "Sitamarhi",
        "Araria",
        "Gopalganj",
        "Madhubani",
        "Masaurhi",
        "Samastipur",
        "Mokameh",
        "Supaul",
        "Dumraon",
        "Arwal",
        "Forbesganj",
        "BhabUrban Agglomeration",
        "Narkatiaganj",
        "Naugachhia",
        "Madhepura",
        "Sheikhpura",
        "Sultanganj",
        "Raxaul Bazar",
        "Ramnagar",
        "Mahnar Bazar",
        "Warisaliganj",
        "Revelganj",
        "Rajgir",
        "Sonepur",
        "Sherghati",
        "Sugauli",
        "Makhdumpur",
        "Maner",
        "Rosera",
        "Nokha",
        "Piro",
        "Rafiganj",
        "Marhaura",
        "Mirganj",
        "Lalganj",
        "Murliganj",
        "Motipur",
        "Manihari",
        "Sheohar",
        "Maharajganj",
        "Silao",
        "Barh",
        "Asarganj",
      ],
      Gujarat: [
        "Ahmedabad",
        "Surat",
        "Vadodara",
        "Rajkot",
        "Bhavnagar",
        "Jamnagar",
        "Nadiad",
        "Porbandar",
        "Anand",
        "Morvi",
        "Mahesana",
        "Bharuch",
        "Vapi",
        "Navsari",
        "Veraval",
        "Bhuj",
        "Godhra",
        "Palanpur",
        "Valsad",
        "Patan",
        "Deesa",
        "Amreli",
        "Anjar",
        "Dhoraji",
        "Khambhat",
        "Mahuva",
        "Keshod",
        "Wadhwan",
        "Ankleshwar",
        "Savarkundla",
        "Kadi",
        "Visnagar",
        "Upleta",
        "Una",
        "Sidhpur",
        "Unjha",
        "Mangrol",
        "Viramgam",
        "Modasa",
        "Palitana",
        "Petlad",
        "Kapadvanj",
        "Sihor",
        "Wankaner",
        "Limbdi",
        "Mandvi",
        "Thangadh",
        "Vyara",
        "Padra",
        "Lunawada",
        "Rajpipla",
        "Vapi",
        "Umreth",
        "Sanand",
        "Rajula",
        "Radhanpur",
        "Mahemdabad",
        "Ranavav",
        "Tharad",
        "Mansa",
        "Umbergaon",
        "Talaja",
        "Vadnagar",
        "Manavadar",
        "Salaya",
        "Vijapur",
        "Pardi",
        "Rapar",
        "Songadh",
        "Lathi",
        "Adalaj",
        "Chhapra",
        "Gandhinagar",
      ],
      Telangana: [
        "Hyderabad",
        "Warangal",
        "Nizamabad",
        "Karimnagar",
        "Ramagundam",
        "Khammam",
        "Mahbubnagar",
        "Mancherial",
        "Adilabad",
        "Suryapet",
        "Jagtial",
        "Miryalaguda",
        "Nirmal",
        "Kamareddy",
        "Kothagudem",
        "Bodhan",
        "Palwancha",
        "Mandamarri",
        "Koratla",
        "Sircilla",
        "Tandur",
        "Siddipet",
        "Wanaparthy",
        "Kagaznagar",
        "Gadwal",
        "Sangareddy",
        "Bellampalle",
        "Bhongir",
        "Vikarabad",
        "Jangaon",
        "Bhadrachalam",
        "Bhainsa",
        "Farooqnagar",
        "Medak",
        "Narayanpet",
        "Sadasivpet",
        "Yellandu",
        "Manuguru",
        "Kyathampalle",
        "Nagarkurnool",
      ],
      Meghalaya: ["Shillong", "Tura", "Nongstoin"],
      "Himachal Praddesh": ["Manali"],
      "Arunachal Pradesh": ["Naharlagun", "Pasighat"],
      Maharashtra: [
        "Mumbai",
        "Pune",
        "Nagpur",
        "Thane",
        "Nashik",
        "Kalyan-Dombivali",
        "Vasai-Virar",
        "Solapur",
        "Mira-Bhayandar",
        "Bhiwandi",
        "Amravati",
        "Nanded-Waghala",
        "Sangli",
        "Malegaon",
        "Akola",
        "Latur",
        "Dhule",
        "Ahmednagar",
        "Ichalkaranji",
        "Parbhani",
        "Panvel",
        "Yavatmal",
        "Achalpur",
        "Osmanabad",
        "Nandurbar",
        "Satara",
        "Wardha",
        "Udgir",
        "Aurangabad",
        "Amalner",
        "Akot",
        "Pandharpur",
        "Shrirampur",
        "Parli",
        "Washim",
        "Ambejogai",
        "Manmad",
        "Ratnagiri",
        "Uran Islampur",
        "Pusad",
        "Sangamner",
        "Shirpur-Warwade",
        "Malkapur",
        "Wani",
        "Lonavla",
        "Talegaon Dabhade",
        "Anjangaon",
        "Umred",
        "Palghar",
        "Shegaon",
        "Ozar",
        "Phaltan",
        "Yevla",
        "Shahade",
        "Vita",
        "Umarkhed",
        "Warora",
        "Pachora",
        "Tumsar",
        "Manjlegaon",
        "Sillod",
        "Arvi",
        "Nandura",
        "Vaijapur",
        "Wadgaon Road",
        "Sailu",
        "Murtijapur",
        "Tasgaon",
        "Mehkar",
        "Yawal",
        "Pulgaon",
        "Nilanga",
        "Wai",
        "Umarga",
        "Paithan",
        "Rahuri",
        "Nawapur",
        "Tuljapur",
        "Morshi",
        "Purna",
        "Satana",
        "Pathri",
        "Sinnar",
        "Uchgaon",
        "Uran",
        "Pen",
        "Karjat",
        "Manwath",
        "Partur",
        "Sangole",
        "Mangrulpir",
        "Risod",
        "Shirur",
        "Savner",
        "Sasvad",
        "Pandharkaoda",
        "Talode",
        "Shrigonda",
        "Shirdi",
        "Raver",
        "Mukhed",
        "Rajura",
        "Vadgaon Kasba",
        "Tirora",
        "Mahad",
        "Lonar",
        "Sawantwadi",
        "Pathardi",
        "Pauni",
        "Ramtek",
        "Mul",
        "Soyagaon",
        "Mangalvedhe",
        "Narkhed",
        "Shendurjana",
        "Patur",
        "Mhaswad",
        "Loha",
        "Nandgaon",
        "Warud",
      ],
      Goa: ["Marmagao", "Panaji", "Margao", "Mapusa"],
      "West Bengal": [
        "Kolkata",
        "Siliguri",
        "Asansol",
        "Raghunathganj",
        "Kharagpur",
        "Naihati",
        "English Bazar",
        "Baharampur",
        "Hugli-Chinsurah",
        "Raiganj",
        "Jalpaiguri",
        "Santipur",
        "Balurghat",
        "Medinipur",
        "Habra",
        "Ranaghat",
        "Bankura",
        "Nabadwip",
        "Darjiling",
        "Purulia",
        "Arambagh",
        "Tamluk",
        "AlipurdUrban Agglomerationr",
        "Suri",
        "Jhargram",
        "Gangarampur",
        "Rampurhat",
        "Kalimpong",
        "Sainthia",
        "Taki",
        "Murshidabad",
        "Memari",
        "Paschim Punropara",
        "Tarakeswar",
        "Sonamukhi",
        "PandUrban Agglomeration",
        "Mainaguri",
        "Malda",
        "Panchla",
        "Raghunathpur",
        "Mathabhanga",
        "Monoharpur",
        "Srirampore",
        "Adra",
      ],
    };
    const states = [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
      "Andaman and Nicobar Islands",
      "Chandigarh",
      "Dadra and Nagar Haveli",
      "Daman and Diu",
      "Lakshadweep",
      "Delhi",
      "Puducherry",
    ];
    const cityOpt = cities[state] || [];
    const years = [];
    for (let i = 1980; i <= 2023; i++) {
      years.push(i);
    }
    const days = [];
    for (let day = 1; day <= 31; day++) {
      days.push(day);
    }
    console.log(errors, btn);
    return (
      <div className="container">
        <h4>Customer Details</h4>
        <div className="form-group row m-2">
          <div className="col-3">
            <label className="form-check-label fw-bold">
              Gender <span className="required-asterisk text-danger">*</span>
            </label>
          </div>
          <div className="col-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                checked={gender === "Male"}
                value="Male"
                onChange={this.handleChange}
              />
              <label className="form-check-label">Male</label>
            </div>
          </div>
          <div className="col-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                checked={gender === "Female"}
                value="Female"
                onChange={this.handleChange}
              />
              <label className="form-check-label">Female</label>
            </div>
          </div>
          {errors && errors.gender && (
            <span className="text-danger">{errors.gender}</span>
          )}
          <hr className="m-4"></hr>
        </div>
        <div className="form-group row m-2">
          <label className="form-check-label fw-bold">
            Date of Birth{" "}
            <span className="required-asterisk text-danger">*</span>
          </label>
        </div>
        <div className="form-group row m-2">
          <div className="col-4">
            <select
              className="form-control"
              name="day"
              value={day}
              onChange={this.handleChange}
            >
              <option value="">Select the Day</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            {errors && errors.dob && (
              <span className="text-danger">{errors.dob}</span>
            )}
          </div>
          <div className="col-4">
            <select
              className="form-control"
              name="month"
              value={month}
              onChange={this.handleChange}
            >
              <option value="">Select the Month</option>
              {months.map((month, index) => (
                <option key={index + 1} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="col-4">
            <select
              className="form-control"
              name="year"
              value={year}
              onChange={this.handleChange}
            >
              <option value="">Select the Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="text-center">
            {errors && errors.checkInDate && (
              <span className="text-danger">{errors.checkInDate}</span>
            )}
          </div>
        </div>
        <div className="form-group row m-2">
          <label className="form-check-label fw-bold">
            PAN
            <span className="required-asterisk text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control ms-2"
            id="PAN"
            name="PAN"
            onChange={this.handleChange}
            placeholder=""
            value={PAN}
            onBlur={this.handleValidate}
          />
          {errors && errors.PAN && (
            <span className="text-danger">{errors.PAN}</span>
          )}
        </div>
        <div className="form-group row m-2">
          <label className="form-check-label fw-bold">Address</label>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="addressLine1"
              name="addressLine1"
              onChange={this.handleChange}
              placeholder=""
              value={addressLine1}
              onBlur={this.handleValidate}
            />
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="addressLine2"
              name="addressLine2"
              onChange={this.handleChange}
              placeholder=""
              value={addressLine2}
              onBlur={this.handleValidate}
            />
          </div>
        </div>
        <div className="form-group row m-2">
          <div className="col-6">
            <label className="form-check-label fw-bold">
              State
              <span className="required-asterisk text-danger">*</span>
            </label>
            <select
              className="form-control"
              name="state"
              value={state}
              onChange={this.handleChange}
            >
              <option value="">Select the State</option>
              {states.map((month, index) => (
                <option key={index + 1} value={month}>
                  {month}
                </option>
              ))}
            </select>
            {errors && errors.state && (
              <span className="text-danger">{errors.state}</span>
            )}
          </div>
          <div className="col-6">
            <label className="form-check-label fw-bold">
              City
              <span className="required-asterisk text-danger">*</span>
            </label>
            <select
              className="form-control"
              name="city"
              value={city}
              onChange={this.handleChange}
            >
              <option value="">Select the City</option>
              {cityOpt.map((month, index) => (
                <option key={index + 1} value={month}>
                  {month}
                </option>
              ))}
            </select>
            {errors && errors.city && (
              <span className="text-danger">{errors.city}</span>
            )}
          </div>
        </div>
        {btn && (
          <button className="btn btn-primary m-2" onClick={this.handleSubmit}>
            Add Details
          </button>
        )}
      </div>
    );
  }
}
export default CustomerDetails;
