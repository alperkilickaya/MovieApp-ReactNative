import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovies,
  getDocumentaryMovies,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';

const dimensions = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [moviesImages, setMoviesImages] = useState([]);
  const [moviesIDs, setMoviesIDs] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);
  const [documentaryMovies, setDocumentaryMovies] = useState([]);

  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getPopularMovies(),
      getUpcomingMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getDocumentaryMovies(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          documantaryMoviesData,
        ]) => {
          const moviesImagesArray = [];
          const moviesIDArray = [];
          //console.log(upcomingMoviesData);
          upcomingMoviesData.forEach(movie => {
            console.log(movie);
            moviesImagesArray.push(
              'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            );
            moviesIDArray.push(movie.id);
          });
          setMoviesImages(moviesImagesArray);
          setMoviesIDs(moviesIDArray);
          setPopularMovies(popularMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setDocumentaryMovies(documantaryMoviesData);
        },
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });

    // getUpcomingMovies()
    // .then(movies => {
    //     const moviesImagesArray = [];
    //     movies.forEach(movie=>{
    //         moviesImagesArray.push('https://image.tmdb.org/t/p/w500'+movie.poster_path);
    //     })
    //     setMoviesImages(moviesImagesArray);
    //   })
    //   .catch(err => {
    //     setError(err);
    //   });

    // getPopularMovies()
    // .then(movies => {
    //     setPopularMovies(movies)
    // })
    // .catch(err => {
    //   setError(err);
    // });

    // getPopularTv()
    // .then(movies => {
    //   setPopularTv(movies)
    // })
    // .catch(err => {
    //   setError(err);
    // });

    // getFamilyMovies()
    // .then(movies => {
    //   setFamilyMovies(movies)
    // })
    // .catch(err => {
    //   setError(err);
    // });

    // getDocumentaryMovies()
    // .then(movies => {
    //   setDocumentaryMovies(movies)
    // })
    // .catch(err => {
    //   setError(err);
    // });
  }, []);

  console.log(moviesIDs);
  return (
    <>
      {loaded && !error && (
        <ScrollView>
          {moviesImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={moviesImages}
                sliderBoxHeight={dimensions.height / 2}
                autoplay={false}
                circleLoop={true}
                dotStyle={styles.sliderStyle}
                resizeMode="contain"
                onCurrentImagePressed={index =>
                  navigation.navigate('Detail', {movieID: moviesIDs[index]})
                }
              />
            </View>
          )}
          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies}
              />
            </View>
          )}
          {/* {popularTv && (
        <View style={styles.carousel}>
          <List navigation={navigation} title='Popular TV Shows' content={popularTv} />
        </View>  
        )} */}
          {familyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Family Movies"
                content={familyMovies}
              />
            </View>
          )}
          {documentaryMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Documentary Movies"
                content={documentaryMovies}
              />
            </View>
          )}
        </ScrollView>
      )}

      {!loaded && <ActivityIndicator size="large" />}
      {error && <Error />}
    </>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
