import {Alert, Platform} from 'react-native';
import {notify} from '../MessageUtils';

describe('notify', () => {
  const message = 'Test message';

  jest.mock('react-native', () => {
    const originalModule = jest.requireActual('react-native');
    return {
      ...originalModule,
      ToastAndroid: {
        show: jest.fn(),
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should show an Alert on iOS', () => {
    Platform.OS = 'ios';
    const alertMock = jest.spyOn(Alert, 'alert');

    notify(message);

    expect(alertMock).toHaveBeenCalledWith('Better', message);
  });
});
