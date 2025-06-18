import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Text,
  Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { addMovie } from '../services/firestoreService';

const { width } = Dimensions.get('window');

export default function AddMovieScreen({ navigation }) {
  const [movie, setMovie] = useState({
    movieName: '',
    genre: '',
    releaseDate: '',
    director: '',
    theater: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const genreList = [
    'Fantasy/Sci-Fi',
    'Horror/Horror-Comedy',
    'Thriller/Crime',
    'Romance',
    'Comedy',
    'Action',
  ];

  const isValid = () => {
    const { movieName, genre, releaseDate, director, theater } = movie;
    return movieName && genre && releaseDate && director && theater;
  };

  const handleAdd = async () => {
    if (!isValid()) {
      Alert.alert('Validation Error', 'Please fill all fields!');
      return;
    }

    try {
      await addMovie(movie);
      Alert.alert('Success', 'Movie added successfully!');
      setMovie({
        movieName: '',
        genre: '',
        releaseDate: '',
        director: '',
        theater: '',
      });
      setSelectedDate(new Date());
      navigation.goBack(); // Optional
    } catch (error) {
      Alert.alert('Error', 'Failed to add movie');
      console.error(error);
    }
  };

  const onDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      const formatted = date.toISOString().split('T')[0]; // YYYY-MM-DD
      setSelectedDate(date);
      setMovie({ ...movie, releaseDate: formatted });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.title}>🎬 Add New Movie</Text>

        <TextInput
          placeholder="Movie Name"
          value={movie.movieName}
          onChangeText={(text) => setMovie({ ...movie, movieName: text })}
          style={styles.input}
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={movie.genre}
            onValueChange={(value) => setMovie({ ...movie, genre: value })}
          >
            <Picker.Item label="Select Genre" value="" />
            {genreList.map((g, i) => (
              <Picker.Item label={g} value={g} key={i} />
            ))}
          </Picker>
        </View>

        <Pressable onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
          <Text style={{ color: movie.releaseDate ? '#000' : '#aaa' }}>
            {movie.releaseDate || 'Select Release Date'}
          </Text>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            value={selectedDate}
            onChange={onDateChange}
            display="default"
          />
        )}

        <TextInput
          placeholder="Director"
          value={movie.director}
          onChangeText={(text) => setMovie({ ...movie, director: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Theater"
          value={movie.theater}
          onChangeText={(text) => setMovie({ ...movie, theater: text })}
          style={styles.input}
        />

        <View style={{ marginTop: 20 }}>
          <Button title="Add Movie" onPress={handleAdd} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  form: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: width * 0.9,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    width: width * 0.9,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  dateInput: {
    width: width * 0.9,
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    marginBottom: 12,
    backgroundColor: '#fff',
  },
});
