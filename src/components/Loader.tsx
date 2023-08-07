import React from 'react';
import {ActivityIndicator, Dimensions, Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {contentCenter} from '../utils/styles';
import colors from './../utils/colors';

const {height, width} = Dimensions.get('screen');

export default function Loader({status}: LoaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ActivityIndicator size="small" color={colors.secondary} />
        {status && <Text style={styles.status}>{status}</Text>}
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {
    ...EStyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0 ,0, 0.5)',
    ...contentCenter,
    zIndex: 10,
  },
  status: {
    color: 'black',
  },
  card: {
    backgroundColor: colors.White,
    paddingHorizontal: '2rem',
    paddingVertical: '1rem',
    borderRadius: '1rem',
  },
  image: {height: height * 0.1, width: width * 0.2, alignSelf: 'center'},
});
