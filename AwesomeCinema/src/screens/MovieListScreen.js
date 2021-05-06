import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  Animated,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';

import {getMovies} from '../api/tmdbAPI';
import Genres from '../components/Genres';
import Rating from '../components/Rating';
import Backdrop from '../components/Backdrop';
import Loading from '../components/Loading';
import SearchBar from 'react-native-searchbar';

const {width, height} = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const MovieListScreen = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchMovies, setSearchMovies] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const searchBar = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      setMovies([{key: 'left-spacer'}, ...movies, {key: 'right-spacer'}]);
      setSearchMovies([{key: 'left-spacer'}, ...movies, {key: 'right-spacer'}]);
    };

    if (movies.length === 0) {
      fetchData(movies);
    }
  }, [movies]);

  if (movies.length === 0) {
    return <Loading />;
  }

  const handleSearchResults = results => {
    const searchList = movies
      .slice(1, -1)
      .filter(movie =>
        movie.title.toLowerCase().includes(results.toLowerCase()),
      );
    setSearchMovies([
      {key: 'left-spacer'},
      ...searchList,
      {key: 'right-spacer'},
    ]);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar hidden />
      <Backdrop movies={searchMovies} scrollX={scrollX} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={searchMovies}
        keyExtractor={item => item.key}
        horizontal
        contentContainerStyle={{alignItems: 'center'}}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          if (!item.poster) {
            return <View style={{width: SPACER_ITEM_SIZE}} />;
          }
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
          });
          return (
            <TouchableOpacity
              style={{width: ITEM_SIZE}}
              onPress={() => navigation.navigate('MovieDetails', {item})}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 34,
                  transform: [{translateY}],
                }}>
                <Image source={{uri: item.poster}} style={styles.posterImage} />
                <Text style={{fontSize: 24}} numberOfLines={1}>
                  {item.title}
                </Text>
                <Rating rating={item.rating} />
                <Genres genres={item.genres} />
                <Text style={{fontSize: 12}} numberOfLines={3}>
                  {item.description}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
      <Icon
        raised
        name="search"
        type="EvilIcons"
        color="#F16365"
        size={30}
        containerStyle={{position: 'absolute', bottom: 0, alignSelf: 'center'}}
        onPress={() => {
          if (isSearching) {
            searchBar.current.hide();
            setIsSearching(false);
          } else {
            searchBar.current.show();
            setIsSearching(true);
          }
        }}
      />
      <SearchBar
        ref={searchBar}
        data={movies}
        handleSearch={handleSearchResults}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  iconSearch: {
    color: '#F16365',
    backgroundColor: '#F16365',
  },
});

export default MovieListScreen;
