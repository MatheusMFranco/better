import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ListItem, Button, Text } from '@rneui/themed';

import GameContext from '../context/GameContext';
import { DailyItem } from '../models/GameState.model';
import { FavoritesRouteProp } from '../props/FavoritesProps';
import { GameContextProps } from '../props/GameContextProps';
import { notify } from '../utils/MessageUtils';

const Favorites: React.FC = () => {
  const { state, dispatch } = useContext<GameContextProps>(GameContext);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const route = useRoute<FavoritesRouteProp>();
  const navigation = useNavigation();
  const { action } = route.params;

  const loadMoreData = () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      setPage(prevPage => prevPage + 1);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (action === 'specials') {
      navigation.setOptions({
        title: 'Specials',
        headerRight: () => selectedItems.length ? (
          <Button
            color="secondary"
            icon={<Ionicons name="trash-bin-outline" size={15} color="white" />}
            onPress={() => {
              Alert.alert(
                'Confirm Deletion',
                `Are you sure you want to delete ${selectedItems.length} item(s)?`,
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Delete',
                    onPress: () => {
                      dispatch({
                        type: 'deleteGame',
                        payload: selectedItems,
                      });
                      setSelectedItems([]);
                      notify('Items deleted successfully!');
                    },
                    style: 'destructive',
                  },
                ],
                { cancelable: true }
              );
            }}
            title={'+' + selectedItems.length}
          />
        ) : <></>,
      });
    } else if (action === 'daily') {
      navigation.setOptions({ title: 'History' });
    }
  }, [action, navigation, selectedItems, dispatch]);

  const handleSelect = (item: string) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(item)) {
        return prevSelected.filter((selectedItem) => selectedItem !== item);
      } else {
        return [...prevSelected, item];
      }
    });
  };

  const renderItem = ({ item }: { item: string | DailyItem }) => {
    let formatted = `${item}`;
    if (action === 'daily' && (item as DailyItem)?.numbers) {
      const registerDate = Intl.DateTimeFormat('pt-BR').format((item as DailyItem)?.registerDate);
      formatted = `${registerDate} - ${(item as DailyItem)?.numbers}`;
    }
    return (
      <ListItem bottomDivider>
        {action === 'specials' && (
          <ListItem.CheckBox
            iconType="ionicon"
            checkedIcon="checkbox-outline"
            uncheckedIcon="square-outline"
            checked={selectedItems.includes(formatted)}
            onPress={() => handleSelect(formatted)}
          />
        )}
        <ListItem.Content>
          <ListItem.Title>{formatted}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  const dataToShow = action === 'daily' ? state.daily.slice(0, itemsPerPage * page) : state.specials.slice(0, itemsPerPage * page);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dataToShow}
        renderItem={renderItem}
        keyExtractor={(_, index) => `${index}`}
        ListEmptyComponent={
          <Text h4 style={styles.emptyMessage}>
            {action === 'daily'
              ? 'All the games created or generated will appear here.'
              : 'The games saved as favorites will appear here.'}
          </Text>
        }
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && dataToShow.length ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyMessage: {
    padding: 10,
    textAlign: 'center',
  },
});

export default Favorites;
