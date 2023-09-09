import React from 'react';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';
import Notifications from '../../components/Notifications';

export default function Notification() {
  return (
    <Box style={styles.container}>
      <Notifications
        data={{
          btn_label: 'Click Me',
          click_action: 'Hello',
          created_at: '12/10/2002',
          message: 'Hello RIshabh Jain',
          title: 'Bidder APP',
        }}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
});
