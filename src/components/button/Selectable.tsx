import React, {useEffect, useState} from 'react';
import {Text, TouchableHighlight} from 'react-native';

import {SelectableButtonProps} from '../../props/SelectableButtonProps';
import styles from './Button.style';

const SelectableButton: React.FC<SelectableButtonProps> = ({
  onClick,
  label,
  disabled,
  list,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleButton = () => {
    if (!disabled || list.includes(label)) {
      setIsActive(prevState => !prevState);
      if (!disabled) {
        onClick();
      }
    }
  };

  useEffect(() => setIsActive(list.includes(label)), [list, label]);

  const buttonStyle = isActive ? styles.activeButton : styles.inactiveButton;
  const textStyle = isActive ? styles.activeText : styles.inactiveText;

  return (
    <TouchableHighlight
      onPress={toggleButton}
      style={[styles.button, buttonStyle]}>
      <Text style={textStyle}>{label}</Text>
    </TouchableHighlight>
  );
};

export default SelectableButton;
