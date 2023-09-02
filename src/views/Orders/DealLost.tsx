/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList, ListRenderItemInfo} from 'react-native';
import React, {useEffect, useState} from 'react';
import Box from '../../components/Box';
import VehicleCard from '../../components/VehicleCard';
import EStyleSheet from 'react-native-extended-stylesheet';
import {DealLostProps} from '../../types/propTypes';

export default function DealLost({navigation, route}: DealLostProps) {
  const [vehicleData, setVehicleData] = useState<Vehicle[]>();

  useEffect(() => {
    setVehicleData(route.params.data);
  }, []);

  function renderItem({item}: ListRenderItemInfo<Vehicle>) {
    return (
      <VehicleCard
        data={item}
        onPressView={() =>
          navigation.navigate('VehicleDetail', {
            title: item.model,
            vehicleId: item.uuid,
            auctionValue: item.auction_value
              ? item.auction_value
              : item.ocb_value,
            isOrder: true,
          })
        }
        isDealLost={true}
      />
    );
  }

  return (
    <Box style={styles.container}>
      <Box style={styles.flat}>
        <FlatList
          data={vehicleData}
          renderItem={renderItem}
          contentContainerStyle={styles.flatList}
        />
      </Box>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  flat: {
    // marginBottom: '2rem',
  },
  flatList: {
    padding: '2rem',
  },
});
