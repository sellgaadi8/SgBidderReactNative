import React, {useMemo} from 'react';
import {View, ViewProps} from 'react-native';

export default function Box({
  children,
  mv,
  justifyContent,
  alignItems,
  alignSelf,
  flexDirection,
  pv,
  ph,
  ...props
}: BoxProps & ViewProps) {
  const height = useMemo(() => {
    return props.height;
  }, [props.height]);

  return (
    <View
      style={[
        {
          height,
          marginVertical: mv,
          justifyContent,
          alignItems,
          alignSelf,
          flexDirection,
          paddingVertical: pv,
          paddingHorizontal: ph,
        },
        props.style,
      ]}
      {...props}>
      {children}
    </View>
  );
}
