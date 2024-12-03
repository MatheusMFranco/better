import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';
import { ListItem } from '@rneui/themed';

import GameContext from '../context/GameContext';
import { DailyItem, GameState } from '../models/GameState.model';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FavoritesRouteProp } from '../props/FavoritesProps';

interface GameContextProps {
  state: GameState;
  dispatch: React.Dispatch<any>;
}

const Favorites: React.FC = () => {
  const { state, dispatch } = useContext<GameContextProps>(GameContext);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const route = useRoute<FavoritesRouteProp>();
  const navigation = useNavigation();
  const { action } = route.params;

  useEffect(() => {
    if (action === 'specials') {
      navigation.setOptions({ title: 'Specials' });
    } else if (action === 'daily') {
      navigation.setOptions({ title: 'History' });
    }
  }, [action, navigation]);  

  const handleSelect = (item: string) => {
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

  const renderItem = ({ item }: { item: string | DailyItem }) => {
    let formatted = '';
    if (action === 'daily' && (item as DailyItem)?.numbers) {
      const registerDate = Intl.DateTimeFormat('pt-BR').format((item as DailyItem)?.registerDate);
      formatted = `${registerDate} - ${(item as DailyItem)?.numbers}`;
    } else {
      formatted = `${item}`;
    }
    return (
      <ListItem bottomDivider>
        {action === 'specials' && (<ListItem.CheckBox
          iconType="ionicon"
          checkedIcon="checkbox-outline"
          uncheckedIcon="square-outline"
          checked={selectedItems.includes(formatted)}
          onPress={() => handleSelect(formatted)}
        />)}
        <ListItem.Content>
          <ListItem.Title>{formatted}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={action === 'daily' ? state.daily : state.specials}
        renderItem={renderItem}
        keyExtractor={(_, index) => `${index}`}
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
