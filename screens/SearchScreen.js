import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';
import MediaList from '../components/MediaList';

const SEARCH_OPTIONS = [
  { label: 'Movie', value: 'movie' },
  { label: 'TV', value: 'tv' },
  { label: 'Multi', value: 'multi' },
];

export default function SearchScreen() {
  const [open, setOpen] = useState(false);
  const [searchType, setSearchType] = useState('movie');
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [hasError, setHasError] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#fafbfc', padding: 20 }}>
      {/* Label de campo */}
      <View style={{ flexDirection: 'row', marginBottom: 4 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Search Movie/TV Show Name</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#e05c5c' }}>*</Text>
      </View>

      {/* Input */}
      <TextInput
        placeholder="i.e. James Bond, CSI"
        value={query}
        onChangeText={text => {
          setQuery(text);
          if (text.trim() !== '') setHasError(false);
        }}
        style={{
          height: 50,
          borderWidth: 1,
          borderColor: hasError ? '#e05c5c' : '#ddd',
          backgroundColor: '#f3f3f3',
          paddingHorizontal: 12,
          borderRadius: 6,
          fontSize: 16,
          marginBottom: hasError ? 6 : 14
        }}
      />

      
      {hasError && (
        <Text style={{ color: '#e05c5c', fontSize: 14, marginBottom: 10 }}>
          Movie/TV show name is required
        </Text>
      )}

   
      <View style={{ flexDirection: 'row', marginBottom: 4 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Choose Search Type</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#e05c5c' }}>*</Text>
      </View>

     
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, gap: 8 }}>
        <View style={{ flex: 1, zIndex: 10 }}>
          <DropDownPicker
            open={open}
            value={searchType}
            items={SEARCH_OPTIONS}
            setOpen={setOpen}
            setValue={setSearchType}
            placeholder="Select search type"
            style={{
              height: 50,
              borderColor: hasError ? '#e05c5c' : '#ccc',
              backgroundColor: '#fff',
              borderRadius: 6,
            }}
            dropDownContainerStyle={{
              borderColor: hasError ? '#e05c5c' : '#ccc',
              backgroundColor: '#fff',
              borderRadius: 6
            }}
            textStyle={{ fontSize: 16 }}
            listItemLabelStyle={{ fontSize: 16 }}
            labelStyle={{ fontSize: 16 }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            if (query.trim() === '') {
              setHasError(true);
              setSubmittedQuery('');
            } else {
              setHasError(false);
              setSubmittedQuery(query);
            }
          }}
          style={{
            height: 50,
            minWidth: 100,
            backgroundColor: '#00b3e6',
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

    
      {submittedQuery.trim() === '' && !hasError ? (
        <Text style={{
          textAlign: 'center',
          fontSize: 30,
          color: '#555',
          marginTop: 200,
          fontWeight: 'bold'
        }}>
          Please initiate a search
        </Text>
      ) : (
        !hasError && (
          <MediaList type="search" searchType={searchType} query={submittedQuery} />
        )
      )}
    </View>
  );
}
