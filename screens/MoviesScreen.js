import React, { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MediaList from '../components/MediaList';

const MOVIE_OPTIONS = [
  { label: 'Now Playing', value: 'now_playing' },
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

export default function MoviesScreen() {
  const [open, setOpen] = useState(false);
  const [subtype, setSubtype] = useState('now_playing');

  return (
    <View style={{ flex: 1, backgroundColor: '#fafbfc', padding: 20 }}>
      <DropDownPicker
        open={open}
        value={subtype}
        items={MOVIE_OPTIONS}
        setOpen={setOpen}
        setValue={setSubtype}
        style={{
          marginBottom: 16,
          borderColor: '#ddd',
          backgroundColor: '#f4f4f4',
          minHeight: 45
        }}
        dropDownContainerStyle={{ borderColor: '#ddd', backgroundColor: '#f4f4f4' }}
      />
      <MediaList type="movie" subtype={subtype} />
    </View>
  );
}
