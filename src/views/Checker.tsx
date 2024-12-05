import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
} from 'react-native';
import { Button, Text, Input } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { GameState } from '../models/GameState.model';
import GameContext from '../context/GameContext';

interface ValidGame {
  game: string;
  matches: number;
}
interface GameContextProps {
  state: GameState;
  dispatch: React.Dispatch<any>;
}

const Checker = () => {
  const [game, setGame] = useState<string>('');
  const [validGames, setValidGames] = useState<ValidGame[]>([]);
  const [showResult, setShowResult] = useState(false);
  const { state } = useContext<GameContextProps>(GameContext);

  const isInvalid = !/^(?!.*\b(\d{2})\b.*\b\1\b)(0[1-9]|[1-5][0-9]|60)([,]?(0[1-9]|[1-5][0-9]|60)){5,11}$/.test(game.replaceAll(' ', ''));

  const splitIntoPairs = (str: string): string[] => {
    const cleanedStr = str.replace(/\D/g, '');
    return cleanedStr.match(/.{2}/g) || [];
  };

  const checkValidGames = () => {
    const result: ValidGame[] = state.specials.map(gameItem => {
      const winningNumbers = splitIntoPairs(game);
      const gameNumbers = splitIntoPairs(gameItem);
      const matches = gameNumbers.filter(num => winningNumbers.includes(num)).length;

      if (matches >= 4) {
        return { game: gameItem, matches };
      }
      return null;
    }).filter(item => item !== null) as ValidGame[];
    setValidGames(result);
  };

  const verify = () => {
    checkValidGames();
    setShowResult(true);
  };

  return (
    <SafeAreaView style={style.Checker}>
      <Text h4 style={style.Container}>
        Enter the winning game:
      </Text>
      <Input
        style={[style.Input, style.Container]}
        onChangeText={setGame}
        errorStyle={style.Input}
        errorMessage={game.length >= 12 && isInvalid ? `Insert a valid game` : ''}
      />
      <Button
        title="CHECK YOUR GAME"
        color="secondary"
        icon={<Ionicons name="search-circle-outline" size={24} color="white" />}
        onPress={verify}
        disabled={isInvalid}
        containerStyle={style.Action}
      />

      {validGames.length > 0 ? (
        <View style={style.FlatListContainer}>
          <Text h4 style={style.ListHeader}>Valid Games with Matches</Text>
          <FlatList
            data={validGames}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }: { item: ValidGame }) => (
              <Text style={style.GameItem}>
                {splitIntoPairs(item.game).join(', ')} | Matches: {item.matches}
              </Text>
            )}
          />
        </View>
      ) : showResult && (
        <Text style={style.NoMatchesMessage}>No game with 4 or more matches found.</Text>
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  Checker: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    textAlign: 'justify',
  },
  Container: {
    margin: 10,
  },
  Input: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  Action: {
    width: '80%',
  },
  FlatListContainer: {
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  ListHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  GameItem: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
  },
  NoMatchesMessage: {
    fontSize: 16,
    color: 'red',
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default Checker;
