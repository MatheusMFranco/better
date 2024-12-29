import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Favorites: {action: 'daily' | 'specials'};
};

export type FavoritesNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Favorites'
>;
export type FavoritesRouteProp = RouteProp<RootStackParamList, 'Favorites'>;
