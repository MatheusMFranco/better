import React, {useContext, useState} from 'react';
import {SafeAreaView, StyleSheet, FlatList, View} from 'react-native';
import {Button, Text, Input} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

import GameContext from '../context/GameContext';
import {GameContextProps} from '../props/GameContextProps';
import {ValidGame} from '../models/ValidGame';
import {gameRegex} from '../components/regex/GameRegex';
import {MAX_AMOUNT} from '../components/constants/MinAndMax';

const Checker = () => {
  const MIN_PRICE_AMOUNT = 4;
  const MAX_SIZE = 5;

  const [game, setGame] = useState<string>('');
  const [minPriceAmount, setMinPriceAmount] =
    useState<number>(MIN_PRICE_AMOUNT);
  const [validGames, setValidGames] = useState<ValidGame[]>([]);
  const [showResult, setShowResult] = useState(false);
  const {state} = useContext<GameContextProps>(GameContext);

  const isInvalid = !gameRegex.test(game.replaceAll(' ', ''));

  const updateAmount = (size: string) => setMinPriceAmount(+size);

  const splitIntoPairs = (str: string): string[] => {
    const cleanedStr = str.replace(/\D/g, '');
    return cleanedStr.match(/.{2}/g) || [];
  };

  const checkValidGames = () => {
    const result: ValidGame[] = state.specials
      .map(gameItem => {
        const winningNumbers = splitIntoPairs(game);
        const gameNumbers = splitIntoPairs(gameItem);
        const matches = gameNumbers.filter(num =>
          winningNumbers.includes(num),
        ).length;

        if (matches >= minPriceAmount) {
          return {game: gameItem, matches};
        }
        return null;
      })
      .filter(item => item !== null) as ValidGame[];
    setValidGames(result);
  };

  const verify = () => {
    checkValidGames();
    setShowResult(true);
  };

  return (
    <SafeAreaView style={style.Checker}>
      <Text h4 style={style.Container}>
        Minimum Quantitys:
      </Text>
      <Input
        testID="price-input"
        style={[style.Input, style.Container]}
        keyboardType="numeric"
        value={`${minPriceAmount}`}
        onChangeText={updateAmount}
        errorStyle={style.Input}
        errorMessage={
          minPriceAmount <= 0 ? `The value must be greater than zero` : ''
        }
      />
      <Text h4 style={style.Container}>
        Enter the winning game:
      </Text>
      <Input
        testID="game-input"
        style={[style.Input, style.Container]}
        onChangeText={setGame}
        errorStyle={style.Input}
        errorMessage={
          game.length >= MAX_AMOUNT && isInvalid ? `Insert a valid game` : ''
        }
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
          <Text h4 style={style.ListHeader}>
            Valid Games with Matches
          </Text>
          <FlatList
            data={validGames.slice(0, MAX_SIZE)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}: {item: ValidGame}) => (
              <Text style={style.GameItem}>
                {splitIntoPairs(item.game).join(', ')} | Matches: {item.matches}
              </Text>
            )}
          />
          {validGames.length > MAX_SIZE && (
            <Text>
              Showing first {MAX_SIZE} games. Total: {validGames.length}
            </Text>
          )}
        </View>
      ) : (
        showResult && (
          <Text style={style.NoMatchesMessage}>
            No game with 4 or more matches found.
          </Text>
        )
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  Checker: {
    flexGrow: 1,
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 10,
    fontWeight: 'bold',
  },
  GameItem: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
  },
  NoMatchesMessage: {
    fontSize: 16,
    marginTop: 20,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default Checker;
