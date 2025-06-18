import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  Pressable,
  Text,
  Platform,
  Dimensions,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { updateMovie } from '../services/firestoreService';

const { width } = Dimensions.get('window');

export default function EditMovieScreen({ route, navigation }) {
  const [movie, setMovie] = useState(route.params.movie);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(movie.releaseDate));

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

  const onDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      const formatted = date.toISOString().split('T')[0];
      setSelectedDate(date);
      setMovie({ ...movie, releaseDate: formatted });
    }
  };

  const handleUpdate = async () => {
    if (!isValid()) {
      Alert.alert('Validation Error', 'Please fill all fields before updating.');
      return;
    }

    try {
      await updateMovie(movie.id, movie);
      Alert.alert('Success', 'Movie updated successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update movie.');
      console.error(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Movie Name"
        value={movie.movieName}
        onChangeText={(text) => setMovie({ ...movie, movieName: text })}
        style={{ marginBottom: 10, borderWidth: 1, padding: 10, borderRadius: 8 }}
      />

      {/* Genre Picker */}
      <View style={{
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        overflow: 'hidden',
      }}>
        <Picker
          selectedValue={movie.genre}
          onValueChange={(value) => setMovie({ ...movie, genre: value })}
        >
          <Picker.Item label="Select Genre" value="" />
          {genreList.map((g, i) => (
            <Picker.Item key={i} label={g} value={g} />
          ))}
        </Picker>
      </View>

      {/* Date Picker */}
      <Pressable
        onPress={() => setShowDatePicker(true)}
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
          marginBottom: 10,
          backgroundColor: '#fff',
        }}
      >
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
        style={{ marginBottom: 10, borderWidth: 1, padding: 10, borderRadius: 8 }}
      />
      <TextInput
        placeholder="Theater"
        value={movie.theater}
        onChangeText={(text) => setMovie({ ...movie, theater: text })}
        style={{ marginBottom: 20, borderWidth: 1, padding: 10, borderRadius: 8 }}
      />

      <Button title="Update Movie" onPress={handleUpdate} />
    </View>
  );
}
 