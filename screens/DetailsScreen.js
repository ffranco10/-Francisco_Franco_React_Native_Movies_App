import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Image } from 'react-native';
import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDEyNDRjOTk1OTMxNjExOThhNDY1MWUwNDIzMzIyNSIsIm5iZiI6MTc0ODg5Njg3Ni42ODcsInN1YiI6IjY4M2UwYzZjMGI4Y2MzNWFjYTdmNDViYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j0GqGPjgG4RicGRA-8KoKQCw_2TWc7BjY-y1CtvsRoc';

export default function DetailsScreen({ route }) {
  const { id, mediaType } = route.params;
  const [data, setData] = useState(null);

  useEffect(() => {
    let endpoint = '';
    if (mediaType === 'movie') {
      endpoint = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
    } else if (mediaType === 'tv') {
      endpoint = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`;
    }
    axios.get(endpoint)
      .then(res => setData(res.data))
      .catch(console.error);
  }, [id, mediaType]);

  if (!data) return <ActivityIndicator style={{ marginTop: 40 }} />;

  const imgUrl = data.poster_path
    ? `https://image.tmdb.org/t/p/w342${data.poster_path}`
    : 'https://via.placeholder.com/180x270?text=No+Image';

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fafbfc' }}>
      <View style={{ padding: 20, alignItems: 'center' }}>
        {/* Título */}
        <Text style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: '#222',
          textAlign: 'center',
          marginBottom: 16
        }}>
          {data.title || data.name}
        </Text>

       
        <Image
          source={{ uri: imgUrl }}
          style={{
            width: 200,
            height: 300,
            borderRadius: 8,
            marginBottom: 20,
            backgroundColor: '#eee'
          }}
          resizeMode="cover"
        />

      
        <Text style={{
          fontSize: 16,
          color: '#333',
          lineHeight: 24,
          textAlign: 'justify',
          marginBottom: 20
        }}>
          {data.overview}
        </Text>

      
        <Text style={{
          fontSize: 14,
          color: '#666',
          textAlign: 'center',
          marginTop: 10
        }}>
          Popularity: {data.popularity?.toFixed(2) ?? 'N/A'} | Release Date: {data.release_date || data.first_air_date || 'N/A'}
        </Text>
      </View>
    </ScrollView>
  );
}
