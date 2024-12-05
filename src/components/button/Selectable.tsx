import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableHighlight,
} from 'react-native';

import styles from './Button.style';

interface SelectableButtonProps {
  onClick: () => void;
  label: string;
  disabled: boolean;
  list: string[];
}

const SelectableButton: React.FC<SelectableButtonProps> = ({ onClick, label, disabled, list }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleButton = () => {
    if (!disabled) {
      setIsActive(prevState => !prevState);
      onClick();
    } else if (list.includes(label)) {
      setIsActive(prevState => !prevState);
    }
  };

  useEffect(() => {
    if (list.includes(label)) {
      setIsActive(true);
    }
  }, [list, label]);

  return (
    <TouchableHighlight
      onPress={toggleButton}
      style={[
        styles.button,
        isActive ? styles.activeButton : styles.inactiveButton,
      ]}
    >
      <Text style={isActive ? styles.activeText : styles.inactiveText}>
        {label}
      </Text>
    </TouchableHighlight>
  );
};

export default SelectableButton;
