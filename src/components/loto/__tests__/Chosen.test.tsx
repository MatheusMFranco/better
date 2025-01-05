import React from 'react';
import {render} from '@testing-library/react-native';
import {ThemeProvider} from '@rneui/themed';
import Chosen from '../Chosen';

describe('Chosen component', () => {
  test('should render Chosen with the correct text', () => {
    const {getByText} = render(
      <ThemeProvider>
        <Chosen chosen="01" />
      </ThemeProvider>,
    );
    expect(getByText('01')).toBeTruthy();
  });
});
