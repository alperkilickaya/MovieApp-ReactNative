import React, {useState} from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {searchMovie} from '../services/services';
import Card from '../components/Card';
import Error from '../components/Error';

const Search = ({navigation}) => {
  const [text, setText] = useState('');
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState(false);

  const onSubmit = query => {
    searchMovie(query)
      .then(data => {
        setSearchResults(data);
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
            placeholder={'Search Movies'}
          />
        </View>
        <TouchableOpacity onPress={() => onSubmit(text)}>
          <Icon name={'search-outline'} color={'#000'} size={35} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchItems}>
        {searchResults && searchResults.length > 0 && (
          <FlatList
            numColumns={3}
            data={searchResults}
            renderItem={({item}) => (
              <Card navigation={navigation} item={item} />
            )}
            keyExtractor={item => item.id}
          />
        )}
        {searchResults && searchResults.length == 0 && (
          <View>
            <Text>No results matching your criteria.</Text>
            <Text>Try different keywords.</Text>
          </View>
        )}
        {!searchResults && (
          <View>
            <Text>Type something to start searching.</Text>
          </View>
        )}
        {error && <Error />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    padding: 10,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
  },
  searchItems: {
    padding: 5,
  },
});

export default Search;
