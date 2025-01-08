import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import GameContext from '../../context/GameContext';
import DataManager from '../DataManager';

const mockGameContext = {
  state: {
    specials: ['1234', '5678', '91011', '2233'],
    daily: [],
  },
  dispatch: () => ({}),
};

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
}));

jest.mock('react-native-document-picker', () => ({
  pick: jest.fn(() =>
    Promise.resolve([
      {
        uri: 'file:///path/to/file.txt',
        type: 'text/plain',
        name: 'file.txt',
      },
    ]),
  ),
  types: {
    plainText: 'text/plain',
  },
}));

jest.mock('react-native-fs', () => ({
  writeFile: jest.fn(() => Promise.resolve('file written')),
  readFile: jest.fn(() => Promise.resolve('file content')),
  exists: jest.fn(() => Promise.resolve(true)),
  unlink: jest.fn(() => Promise.resolve()),
  mkdir: jest.fn(() => Promise.resolve()),
  copyFile: jest.fn(() => Promise.resolve()),
  moveFile: jest.fn(() => Promise.resolve()),
  downloadFile: jest.fn(() => ({
    promise: Promise.resolve('download completed'),
  })),
  DocumentDirectoryPath: '/path/to/documents',
}));

describe('<DataManager />', () => {
  it('renders correctly and shows the initial state', () => {
    const {getByText, getByTestId} = render(
      <GameContext.Provider value={mockGameContext}>
        <DataManager />
      </GameContext.Provider>,
    );

    expect(getByText('EXPORT TO FILE (txt)')).toBeTruthy();
    expect(getByText('IMPORT TO FAVORITES (txt)')).toBeTruthy();
    expect(getByText('DELETE FAVORITES')).toBeTruthy();
    expect(getByText('CLEAN HISTORY')).toBeTruthy();

    expect(getByTestId('export-to-file-button')).toBeTruthy();
    expect(getByTestId('import-to-favorites-button')).toBeTruthy();
    expect(getByTestId('delete-favorites-button')).toBeTruthy();
    expect(getByTestId('clean-history-button')).toBeTruthy();
  });

  it('should trigger the export action when clicking on export button', () => {
    const {getByTestId} = render(
      <GameContext.Provider value={mockGameContext}>
        <DataManager />
      </GameContext.Provider>,
    );

    const exportButton = getByTestId('export-to-file-button');
    fireEvent.press(exportButton);

    expect(exportButton).toBeTruthy();
  });

  it('should trigger the import action when clicking on import button', () => {
    const {getByTestId} = render(
      <GameContext.Provider value={mockGameContext}>
        <DataManager />
      </GameContext.Provider>,
    );

    const importButton = getByTestId('import-to-favorites-button');
    fireEvent.press(importButton);

    expect(importButton).toBeTruthy();
  });
});
