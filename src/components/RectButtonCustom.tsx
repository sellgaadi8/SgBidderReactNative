import React from 'react';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';

const RectButtonCustom: React.FC<RectButtonProps> = ({
  // @ts-ignore
  children,
  ...props
}) => {
  return (
    // @ts-ignore
    <RectButton rippleColor="#CCC" {...props}>
      {children}
    </RectButton>
  );
};

export default RectButtonCustom;
