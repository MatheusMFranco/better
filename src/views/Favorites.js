import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';
import { ListItem } from '@rneui/themed';

import GameContext from '../context/GameContext';

const Favorites = () => {

  const { state, dispatch } = useContext(GameContext);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (item) => {
    dispatch({
      type: 'deleteGame',
      payload: item,
    });
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(item)) {
        return prevSelected.filter((selectedItem) => selectedItem !== item);
      } else {
        return [...prevSelected, item];
      }
    });
  };

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.CheckBox
        iconType="ionicon"
        checkedIcon="checkbox-outline"
        uncheckedIcon="square-outline"
        checked={selectedItems.includes(item)}
        onPress={() => handleSelect(item)}
      />
      <ListItem.Content>
        <ListItem.Title>{item}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={state.data}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});

export default Favorites;
