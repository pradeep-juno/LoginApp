import firestore from '@react-native-firebase/firestore';

const moviesRef = firestore().collection('movies');

export const addMovie = async (movie) => {
  const id = Date.now().toString();
  await moviesRef.doc(id).set({ id, ...movie });
};

export const getMovies = async () => {
  const snapshot = await moviesRef.get();
  return snapshot.docs.map(doc => doc.data());
};

export const updateMovie = async (id, movie) => {
  await moviesRef.doc(id).update(movie);
};

export const deleteMovie = async (id) => {
  await moviesRef.doc(id).delete();
};
