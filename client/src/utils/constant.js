export const loginInitialValues = {
  email: "",
  password: "",
};

export const registerInitialValues = {
  name: "",
  email: "",
  password: "",
};
export const inputData = [
  {
    name: "name",
    type: "text",
  },
  {
    name: "phone",
    type: "text",
  },
  {
    name: "email",
    type: "email",
  },
];

export const color = () => {
  const random = [
    "Gray",
    "Blue",
    "Green",
    "Purple",
    "Pink",
    "Brown",
    "Teal",
    "Navy",
    "Coral",
    "Salmon",
    "Turquoise",
    "lightslategrey",
    "palegreen",
  ];

  const randomIndex = Math.floor(Math.random() * random.length);
  const randomColor = random[randomIndex];
  return randomColor;
};

export const btn = [
  {
    btnText: "View All",
    btnValue: "all",
  },
  {
    btnText: "Personal",
    btnValue: "personal",
  },
  {
    btnText: "Professional",
    btnValue: "professional",
  },
];
