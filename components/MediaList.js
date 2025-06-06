import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, Text, View } from "react-native";
import ListItem from "./ListItem";
import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDEyNDRjOTk1OTMxNjExOThhNDY1MWUwNDIzMzIyNSIsIm5iZiI6MTc0ODg5Njg3Ni42ODcsInN1YiI6IjY4M2UwYzZjMGI4Y2MzNWFjYTdmNDViYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j0GqGPjgG4RicGRA-8KoKQCw_2TWc7BjY-y1CtvsRoc";

export default function MediaList({ type, subtype, searchType, query }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = "";
    if (type === "movie") {
      url = `https://api.themoviedb.org/3/movie/${subtype}?language=en-US&page=1`;
    } else if (type === "tv") {
      url = `https://api.themoviedb.org/3/tv/${subtype}?language=en-US&page=1`;
    } else if (type === "search" && query) {
      url = `https://api.themoviedb.org/3/search/${searchType}?query=${encodeURIComponent(
        query
      )}&language=en-US&page=1`;
    }

    axios.defaults.headers.common["Authorization"] = "Bearer " + API_KEY;

    setLoading(true);
    if (url) {
      axios
        .get(url)
        .then((res) => setData(res.data.results || []))
        .catch(() => setData([]))
        .finally(() => setLoading(false));
    } else {
      setData([]);
      setLoading(false);
    }
  }, [type, subtype, searchType, query]);

  if (loading) return <ActivityIndicator style={{ marginTop: 32 }} />;

  if (!data.length)
    return (
      <View>
        <Text style={{ marginTop: 30, textAlign: "center", color: "#888" }}>
          No results.
        </Text>
      </View>
    );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id) + (item.media_type || "")}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          type={type === "search" ? item.media_type || searchType : type}
        />
      )}
      contentContainerStyle={{ paddingBottom: 24 }}
    />
  );
}
