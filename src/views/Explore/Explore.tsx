import {Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Box from '../../components/Box';
import Input from '../../components/Input';
import colors from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TopTabs from '../../components/TopTabs';
import LiveAuction from './LiveAuction';
import OCB from './OCB';

export default function Explore(props: ExploreProps) {
  const tabs = [
    {title: 'LIVE AUCTION', onPress: () => onChangeTab(0)},
    {title: 'OCB', onPress: () => onChangeTab(1)},
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  function onChangeTab(index: number) {
    setActiveIndex(index);
  }

  return (
    <Box style={styles.container}>
      <Box style={styles.header}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <Box style={styles.inputContainer}>
            <Input
              placeholder="make , model , year, fuel type .."
              input={styles.input}
              renderEndIcon={() => {
                return (
                  <View style={styles.search}>
                    <MaterialIcons name="search" size={25} color="#FFFFFF" />
                  </View>
                );
              }}
            />
          </Box>
          <Pressable style={styles.bell}>
            <Icon name="bell-outline" size={25} color="#FFFFFF" />
          </Pressable>
        </Box>
        <TopTabs tabs={tabs} activeIndex={activeIndex} />
      </Box>
      {activeIndex === 0 ? <LiveAuction {...props} /> : <OCB {...props} />}
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  input: {
    borderColor: '#FFFFFF',
  },
  header: {
    backgroundColor: colors.primary,
    // padding: 20,
  },
  inputContainer: {
    width: '85%',
    padding: 15,
    top: 10,
  },
  bell: {
    right: 25,
  },
  search: {
    position: 'absolute',
    right: 20,
  },
});
