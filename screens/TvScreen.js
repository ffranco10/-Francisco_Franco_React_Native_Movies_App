import React, { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MediaList from '..//components/MediaList';

const TV_OPTIONS = [
  { label: 'Airing Today', value: 'airing_today' },
  { label: 'On The Air', value: 'on_the_air' },
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
];

export default function TvScreen() {
  const [open, setOpen] = useState(false);
  const [subtype, setSubtype] = useState('airing_today');

  return (
    <View style={{ flex: 1, backgroundColor: '#fafbfc', padding: 20 }}>
      <DropDownPicker
        open={open}
        value={subtype}
        items={TV_OPTIONS}
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
      <MediaList type="tv" subtype={subtype} />
    </View>
  );
}
