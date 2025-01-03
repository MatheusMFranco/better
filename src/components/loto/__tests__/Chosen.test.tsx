import React from 'react';
import {render} from '@testing-library/react-native';
import {ThemeProvider} from '@rneui/themed';

import Chosen from '../Chosen';

test('should render Chosen button', () => {
  render(
    <ThemeProvider>
      <Chosen chosen="01" />
    </ThemeProvider>,
  );
});
