let Movies = [
  {
    id: 1,
    name: "sulmoJ",
    score: 21,
  },
  {
    id: 2,
    name: "hanulLee",
    score: 20,
  },
  {
    id: 3,
    name: "chanwooLee",
    score: 25,
  },
  {
    id: 4,
    name: "dongyuLim",
    score: 24,
  },
  {
    id: 5,
    name: "yongheeLee",
    score: 99,
  },
];

export const getMovies = () => Movies;

export const getbyId = (id) => {
  const filteredMovies = Movies.filter((movie) => movie.id == id);
  return filteredMovies[0];
};

export const deleteMovie = (id) => {
  const cleanMovies = Movies.filter((movie) => id != movie.id);
  if (Movies.length > cleanMovies.length) {
    Movies = cleanMovies;
    return true;
  } else {
    return false;
  }
};

export const addMovie = (name, score) => {
  const newMoive = {
    id: `${Movies.length + 1}`,
    name,
    score,
  };
  Movies.push(newMoive);
  return newMoive;
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
