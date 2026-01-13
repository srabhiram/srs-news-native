export const navbarItems = [
  // {
  //   id: 1,
  //   name: "హోమ్",
  //   href: "/",
  // },
  // {
  //   id: 2,
  //   name: "వీడియో",
  //   href: "/category/video",
  // },
  {
    id: 3,
    name: "టెక్నాలజీ ",
    href: "category/technology",
  },
  {
    id: 4,
    name: "స్పోర్ట్స్ ",
    href: "category/sports",
  },
];

export const districts = [
  { value: "adilabad", label: "ఆదిలాబాద్" },
  { value: "bhadradri", label: "భద్రాద్రి కొత్తగూడెం" },
  { value: "hyderabad", label: "హైదరాబాద్" },
  { value: "jagtial", label: "జగిత్యాల" },
  { value: "jangaon", label: "జనగాం" },
  { value: "jayashankar", label: "జయశంకర్ భూపాలపల్లి" },
  { value: "jogulamba", label: "జోగులాంబ గద్వాల" },
  { value: "kamareddy", label: "కామారెడ్డి" },
  { value: "karimnagar", label: "కరీంనగర్" },
  { value: "khammam", label: "ఖమ్మం" },
  { value: "komaram_bheem", label: "కొమరం భీం ఆసిఫాబాద్" },
  { value: "mahabubabad", label: "మహబూబాబాద్" },
  { value: "mahabubnagar", label: "మహబూబ్‌నగర్" },
  { value: "mancherial", label: "మంచిర్యాల" },
  { value: "medak", label: "మెదక్" },
  { value: "medchal", label: "మేడ్చల్ మల్కాజిగిరి" },
  { value: "mulugu", label: "ములుగు" },
  { value: "nagarkurnool", label: "నాగర్‌కర్నూల్" },
  { value: "nalgonda", label: "నల్గొండ" },
  { value: "narayanpet", label: "నారాయణపేట" },
  { value: "nirmal", label: "నిర్మల్" },
  { value: "nizamabad", label: "నిజామాబాద్" },
  { value: "peddapalli", label: "పెద్దపల్లి" },
  { value: "rajanna", label: "రాజన్న సిరిసిల్ల" },
  { value: "rangareddy", label: "రంగారెడ్డి" },
  { value: "sangareddy", label: "సంగారెడ్డి" },
  { value: "siddipet", label: "సిద్దిపేట" },
  { value: "suryapet", label: "సూర్యాపేట" },
  { value: "vikarabad", label: "వికారాబాద్" },
  { value: "wanaparthy", label: "వనపర్తి" },
  { value: "warangal", label: "వరంగల్" },
  { value: "hanamkonda", label: "హన్మకొండ" },
  { value: "yadadri", label: "యాదాద్రి భువనగిరి" },
];

export const states = [
  { value: "telangana", label: "తెలంగాణ " },
  { value: "andhra pradesh", label: "ఆంధ్రప్రదేశ్" },
];
export const categories = [
  { value: "technology", label: "టెక్నాలజీ" },
  { value: "sports", label: "స్పోర్ట్స్" },
  {value:"video",label:"వీడియో"}
];
export const distname = (dist: string) => {
  const district = districts.find((d) => d.value === dist);
  return district ? district.label : dist;
};
export const categoryNames = (cat: string) => {
  const category = categories.find((c) => c.value === cat);
  return category ? category.label : cat;
};
