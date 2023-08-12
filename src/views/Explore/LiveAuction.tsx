/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList, ListRenderItemInfo} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {onGetVehicleList} from '../../redux/ducks/vehicleList';
import {useAppSelector} from '../../utils/hook';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';
import VehicleCard from '../../components/VehicleCard';

export default function LiveAuction({navigation}: ExploreProps) {
  const dispatch = useDispatch<any>();
  const selectVehicleList = useAppSelector(state => state.vechicleList);
  const [vehicleData, setVehicleData] = useState<Vehicle[]>();
  const [remainingTime, setRemainingTime] = useState(7200); // 2 hours in seconds

  useEffect(() => {
    dispatch(onGetVehicleList('in_auction', '', '', ''));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (selectVehicleList.called) {
      const {data, error} = selectVehicleList;
      if (!error && data) {
        setVehicleData(data);
      }
    }
  }, [selectVehicleList]);

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  function onClickEdit() {
    navigation.navigate('AddVehicle', {from: 'edit'});
  }

  function renderItem({item}: ListRenderItemInfo<Vehicle>) {
    return (
      <VehicleCard
        data={item}
        onPressEdit={() => onClickEdit()}
        onPressView={() =>
          navigation.navigate('VehicleDetail', {
            title: item.model,
            vehicleId: item.uuid,
          })
        }
        formatTime={formatTime(remainingTime)}
      />
    );
  }

  return (
    <Box>
      {vehicleData?.length !== 0 ? (
        <>
          {/* {loading && <Loader />} */}

          <Box style={styles.flat}>
            <FlatList
              data={vehicleData}
              renderItem={renderItem}
              contentContainerStyle={styles.flatList}
            />
          </Box>
        </>
      ) : (
        <Box style={styles.noData}>
          <CustomText
            fontFamily="Roboto-Medium"
            color="#111111"
            fontSize={20}
            lineHeight={28}>
            No Vehicle Found
          </CustomText>
        </Box>
      )}
    </Box>
  );
}

const styles = EStyleSheet.create({
  flat: {
    marginBottom: '20rem',
  },
  flatList: {
    padding: '2rem',
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
