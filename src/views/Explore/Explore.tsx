import {Pressable, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Box from '../../components/Box';
import colors from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TopTabs from '../../components/TopTabs';
import LiveAuction from './LiveAuction';
import OCB from './OCB';
import CustomText from '../../components/CustomText';

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
        <Box flexDirection="row" alignItems="center" justifyContent="center">
          <Box style={styles.inputContainer}>
            <CustomText
              color="#FFFFFF"
              fontFamily="Roboto-Medium"
              fontSize={22}
              lineHeight={28}>
              Welcome !
            </CustomText>
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
    padding: 15,
  },
  bell: {
    position: 'absolute',
    right: 25,
  },
  search: {
    position: 'absolute',
    right: 20,
  },
});
