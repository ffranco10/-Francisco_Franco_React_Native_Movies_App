import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ListItem({ item, type }) {
  const navigation = useNavigation();
  const mediaType = item.media_type || type;

  const imgUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w185${item.poster_path}`
    : 'https://via.placeholder.com/90x135?text=No+Image';

  return (
    <View style={{
      flexDirection: 'row',
      paddingVertical: 12,
      paddingHorizontal: 3,
      borderBottomWidth: 1,
      borderColor: '#e5e5e5',
      backgroundColor: '#fff'
    }}>
      <Image
        source={{ uri: imgUrl }}
        style={{ width: 70, height: 105, borderRadius: 6, marginRight: 14, backgroundColor: '#eee' }}
        resizeMode="cover"
      />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 2 }}>
          {item.title || item.name}
        </Text>
        <Text style={{ color: '#444', marginBottom: 2, fontSize: 14 }}>
          Popularity: {item.popularity?.toFixed(3) ?? 'N/A'}
        </Text>
        <Text style={{ color: '#444', marginBottom: 8, fontSize: 14 }}>
          Release Date: {item.release_date || item.first_air_date || 'N/A'}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Details', { id: item.id, mediaType })}
          style={{
            backgroundColor: '#16b9e0',
            borderRadius: 6,
            paddingVertical: 10,
            alignItems: 'center'
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
