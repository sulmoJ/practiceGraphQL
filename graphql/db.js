export const people = [
  {
    id: 1,
    name: "sulmoJ",
    gender: "male",
    age: 24,
  },
  {
    id: 2,
    name: "sulmoK",
    gender: "male",
    age: 24,
  },
  {
    id: 3,
    name: "hanulLee",
    gender: "male",
    age: 24,
  },
  {
    id: 4,
    name: "chanwooLee",
    gender: "male",
    age: 24,
  },
  {
    id: 5,
    name: "dongyuLim",
    gender: "male",
    age: 24,
  },
  {
    id: 6,
    name: "yongheeLee",
    gender: "male",
    age: 24,
  },
  {
    id: 7,
    name: "omlusJ",
    gender: "male",
    age: 24,
  },
];

export const getbyId = (id) => {
  const filteredPeople = people.filter((person) => person.id == id);
  return filteredPeople[0];
};
// export const getbyId = (id) => {
//     let re;
//     people.forEach((p) => {
//       if (p.id == id) {
//         console.log(typeof p);
//         re = p;
//       }
//     });
//     return re;
//   };
