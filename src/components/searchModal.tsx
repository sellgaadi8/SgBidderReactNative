import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Input from './Input';
import colors from '../utils/colors';
import CustomText from './CustomText';
import {FlatList, ListRenderItemInfo, Pressable} from 'react-native';
import Box from './Box';
import PrimaryButton from './PrimaryButton';

export default function SearchModal({
  placeholder,
  data,
  onPressSelecteItem,
  dataType,
  query,
  onChangeText,
  onPressDone,
  showDone = false,
}: SearchModalProps) {
  function renderItem({item}: ListRenderItemInfo<string>) {
    return (
      <Pressable
        style={styles.body}
        onPress={() => onPressSelecteItem(item, dataType)}>
        <CustomText color="White">{item}</CustomText>
      </Pressable>
    );
  }

  return (
    <>
      <Input
        placeholder={placeholder}
        value={query}
        onChangeText={onChangeText}
      />
      <FlatList
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        data={data}
      />
      {showDone && (
        <Box style={styles.button}>
          <PrimaryButton label="Done" onPress={onPressDone} />
        </Box>
      )}
    </>
  );
}

const styles = EStyleSheet.create({
  body: {
    paddingVertical: '1rem',
    paddingHorizontal: '2rem',
  },
  button: {
    width: '100%',
    backgroundColor: colors.primary,
    padding: '1rem',
  },
});
