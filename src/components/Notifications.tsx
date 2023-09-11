import React, {useState} from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RectButtonCustom from './RectButtonCustom';
import CustomText from './CustomText';
import {formatDate, truncateString} from '../utils/helper';
import {NotificationProps} from '../types/propTypes';

export default function Notifications({
  data: {title, message, click_to_action, created_at, btn_label},
}: NotificationProps) {
  const [read, setRead] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  function onCollapsed() {
    setCollapsed(c => !c);
    if (!read) {
      setRead(1);
    }
  }
  function onClickCta() {
    console.log('alled');
  }

  return (
    <View style={styles.notification}>
      <RectButtonCustom
        onPress={onCollapsed}
        style={[styles.row, styles.touchable, !read && styles.unread]}>
        <View style={styles.row}>{!read && <View style={styles.dot} />}</View>
        <View style={styles.content}>
          <CustomText color="#4B4B4B" lineHeight={19} fontFamily="Roboto-Bold">
            {title}
          </CustomText>
          <CustomText fontSize={14} color="#4B4B4B" lineHeight={20}>
            {truncateString(message, collapsed ? undefined : 42)}
          </CustomText>
          {click_to_action !== '' && collapsed && (
            <TouchableOpacity onPress={() => onClickCta()}>
              <CustomText
                color="Primary"
                lineHeight={19}
                fontFamily="Roboto-Bold"
                style={styles.cta}>
                {btn_label}
              </CustomText>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.timeContainer}>
          <CustomText
            fontSize={12}
            lineHeight={20}
            color="rgba(75, 75, 75, 0.5)">
            {formatDate(created_at, true, 'DD MM, YYYY')}
          </CustomText>
        </View>
      </RectButtonCustom>
    </View>
  );
}

const styles = EStyleSheet.create({
  notification: {
    borderBottomColor: 'rgba(112, 112, 112, 0.3)',
    borderBottomWidth: 1,
  },
  touchable: {
    paddingVertical: '2rem',
    paddingHorizontal: '1rem',
    backgroundColor: '#FFF',
    alignItems: 'flex-start',
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  dot: {
    backgroundColor: '#20936A',
    height: '0.8rem',
    width: '0.8rem',
    borderRadius: '5rem',
    marginTop: '1rem',
  },
  content: {marginStart: '1rem', marginEnd: 'auto', width: '75%'},
  timeContainer: {
    marginTop: '-1rem',
  },
  cta: {
    marginTop: '1rem',
    alignSelf: 'flex-start',
  },
  unread: {backgroundColor: '#F3F8F5'},
});
