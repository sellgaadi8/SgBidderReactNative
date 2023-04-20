import React, {useMemo} from 'react';
import {View, ViewProps} from 'react-native';

export default function Box({
  children,
  mv,
  justifyContent,
  alignItems,
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
