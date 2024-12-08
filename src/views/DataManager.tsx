import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Button, Dialog, Text } from '@rneui/themed';

import { GameContextProps } from '../props/GameContextProps';
import GameContext from '../context/GameContext';

const DataManager = () => {

  const FILE_NAME = 'better.txt'
  const { state, dispatch } = useContext<GameContextProps>(GameContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [modalType, setModalType] = useState('');

  const deleteWaning = (selection: 'history' | 'favorites') => {
    setModalType(selection);
    setOpenDialog(true);
  };

  const exportToFile = async () => {
    try {
      const filePath = `${RNFS.DownloadDirectoryPath}/${FILE_NAME}`;
      const fileContent = state.specials.join('\n');
      await RNFS.writeFile(filePath, fileContent, 'utf8');
      Alert.alert('Success', `File saved in: ${filePath}`);
    } catch (err) {
      Alert.alert('Error', 'Error saving file');
    }
  };

  const importFromFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.plainText],
      });

      const filePath = res[0].uri;
      const fileContent = await RNFS.readFile(filePath, 'utf8');
      const fileLines = fileContent.split('\n');
      dispatch({
        type: 'importToFavorites',
        payload: [...new Set(fileLines)],
      });
      Alert.alert('Success', 'Games imported to favorites!');
    } catch (err) {
      Alert.alert('Error', 'Error importing file');
    }
  };

  const cleanFavorites = () => {
    dispatch({
      type: 'removeAllSpecialsGame',
      payload: [],
    });
    setOpenDialog(false);
    Alert.alert('Success', 'The favorite list has been cleaned.');
  };

  const cleanHistory = () => {
    dispatch({
      type: 'removeAllDailyGame',
      payload: [],
    });
    setOpenDialog(false);
    Alert.alert('Success', 'The history list has been cleaned.');
  };

  const clean = () => modalType === 'history' ? cleanHistory() : cleanFavorites();

  return (
    <SafeAreaView style={styles.DataManager}>
      <View style={styles.Action}>
        <Button
          color="secondary"
          title=" EXPORT TO FILE (txt) "
          onPress={exportToFile}
          icon={<Ionicons name='create-outline' size={24} color='white' />}
        />
        <Button
          color="primary"
          title=" IMPORT TO FAVORITES (txt) "
          onPress={importFromFile}
          icon={<Ionicons name='reader-outline' size={24} color='white' />}
        />
      </View>
      <View style={styles.Action}>
        <Button
          color="secondary"
          title=" DELETE FAVORITES "
          onPress={() => deleteWaning('favorites')}
          icon={<Ionicons name='close-outline' size={24} color='white' />}
        />
        <Button
          color="primary"
          title=" CLEAN HISTORY"
          onPress={() => deleteWaning('history')}
          icon={<Ionicons name='close-circle-outline' size={24} color='white' />}
        />
      </View>
      <Dialog
        isVisible={openDialog}
        onBackdropPress={() => setOpenDialog(false)}>
        <Dialog.Title title="Warning"/>
        <Text>All the content will be erased, are you sure about that?</Text>
        <Dialog.Actions>
          <Dialog.Button title="YES, DO IT!" onPress={clean}/>
          <Dialog.Button title="NO" onPress={() => setOpenDialog(false)}/>
        </Dialog.Actions>
      </Dialog>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  DataManager: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container: {
    margin: 10,
  },
  Action: {
    marginTop: 20,
    width: '80%',
  },
});

export default DataManager;
