/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {OrderChartProps} from '../../types/propTypes';
import {getCarStatusDetail} from '../../redux/ducks/getStatus';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {useAppSelector} from '../../utils/hook';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../utils/colors';
import {formatDate} from '../../utils/helper';
import PrimaryButton from '../../components/PrimaryButton';

export default function OrderChart({route, navigation}: OrderChartProps) {
  const dispatch = useDispatch<any>();
  const selectStatus = useAppSelector(state => state.getStatus);
  const [status, setStatus] = useState<Status[]>([]);

  const data = route.params.vehicleData;

  useEffect(() => {
    dispatch(getCarStatusDetail(data.uuid));
  }, []);

  function getStatus(key: string) {
    switch (key) {
      case 'in_negotiation':
        return 'Auction won';
      case 'out_for_delivery':
        return 'Out for delivery';
      case 'payment_done':
        return 'Payment Done';
      case 'deal_won':
        return 'Deal won';
      case 'out_for_delivery':
        return 'Out for delivery';
      case 'delivered':
        return 'Delivered';
      case 'rc_transfered':
        return 'RC Transfered';
      default:
        break;
    }
  }

  useEffect(() => {
    if (selectStatus.called) {
      const {data} = selectStatus;
      if (data) {
        setStatus(data);
      }
    }
  }, [selectStatus]);

  function onViewDetails() {
    navigation.navigate('VehicleDetail', {
      title: data.model,
      vehicleId: data.uuid,
      auctionValue: data.auction_value ? data.auction_value : data.ocb_value,
      isOrder: true,
    });
  }
  return (
    <Box style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box style={styles.header}>
          <Box style={styles.imageCon}>
            {data.images.length !== 0 && (
              <Image
                source={{uri: data.images[1]}}
                style={{height: 55, width: 55, borderRadius: 5}}
              />
            )}
            <Box ph={'5%'}>
              <CustomText
                fontSize={16}
                lineHeight={24}
                color="#1C1B1F"
                fontFamily="Roboto-Bold">
                {data.mfg_year} {data.make}
              </CustomText>

              <CustomText
                fontSize={16}
                lineHeight={24}
                color="#33A02C"
                fontFamily="Roboto-Bold">
                Rs.
                {data.vehicle_status === 'in_negotiation' ||
                data.vehicle_status === 'auction_over'
                  ? data.my_bid_price
                  : data.accepted_price}
              </CustomText>
            </Box>
          </Box>

          <Box style={styles.button}>
            <PrimaryButton
              labelStyle={{fontSize: 10, fontFamily: 'Roboto-Regular'}}
              label="View Details"
              onPress={onViewDetails}
            />
          </Box>
        </Box>
        <Box pv={'5%'}>
          <View style={styles.line} />
          {status.map((el, index) => {
            return (
              <Box
                flexDirection="row"
                alignItems="center"
                key={index.toString()}
                pv="5%">
                <Box style={styles.bg}>
                  <Icon
                    name={
                      el.created_at !== null
                        ? 'checkbox-marked-circle'
                        : 'checkbox-blank-circle-outline'
                    }
                    color={
                      el.created_at !== null
                        ? colors.green
                        : 'rgba(17, 17, 17, 0.5)'
                    }
                    size={20}
                  />
                </Box>
                <Box>
                  <CustomText
                    fontSize={16}
                    lineHeight={24}
                    color="#1C1B1F"
                    fontFamily="Roboto-Bold"
                    style={{left: 20}}>
                    {getStatus(el.status)}
                  </CustomText>
                  {el.created_at !== null && (
                    <CustomText
                      fontSize={14}
                      lineHeight={24}
                      color="#1C1B1F"
                      fontFamily="Roboto-Regular"
                      style={{left: 20}}>
                      {formatDate(el.created_at, false, 'DD MM, YYYY')}
                    </CustomText>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  line: {
    position: 'absolute',
    height: '90%',
    width: 1.5,
    backgroundColor: 'rgba(17, 17, 17, 0.5)',
    flexDirection: 'column',
    left: 15,
    top: 50,
  },
  bg: {
    height: 30,
    width: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'rgba(239, 194, 79, 0.12)',
  },
  button: {
    alignSelf: 'center',
    marginLeft: 'auto',
    right: 20,
    bottom: 10,
  },
  imageCon: {
    padding: 20,
    flexDirection: 'row',
  },
});
