/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {onGetVehicleList} from '../../redux/ducks/vehicleList';
import {useAppSelector} from '../../utils/hook';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';
import VehicleCard from '../../components/VehicleCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modalbox';
import Filter from '../../components/Filter';
import {onOCB} from '../../redux/ducks/oneClickBuy';
import Snackbar from 'react-native-snackbar';
import Loader from '../../components/Loader';
import {container} from '../../utils/styles';
import {CarFilterType, ExploreProps} from '../../types/propTypes';
const {width} = Dimensions.get('window');

export default function OCB({navigation}: ExploreProps) {
  const dispatch = useDispatch<any>();
  const selectVehicleList = useAppSelector(state => state.vechicleList);
  const [vehicleData, setVehicleData] = useState<Vehicle[]>();
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState<CarFilterType>({
    modal: '',
    vehicleType: '',
  });
  const [loading, setLoading] = useState(false);
  const selectOcb = useAppSelector(state => state.oneClickBuy);

  useEffect(() => {
    setLoading(true);
    dispatch(onGetVehicleList('one_click_buy', '', ''));
  }, []);

  useEffect(() => {
    if (selectVehicleList.called) {
      setLoading(false);
      const {data, error} = selectVehicleList;
      if (!error && data) {
        setVehicleData(data);
      }
    }
  }, [selectVehicleList]);

  function onClosedFilter() {
    setShowFilter(false);
  }

  function applyFilter(selectedFilters: CarFilterType) {
    setLoading(true);
    setFilter(selectedFilters);
    dispatch(
      onGetVehicleList(
        'one_click_buy',
        selectedFilters.modal,
        selectedFilters.vehicleType,
      ),
    );
    setShowFilter(false);
  }

  function onPlaceBid(vid: string) {
    setLoading(true);
    dispatch(onOCB(vid));
  }

  useEffect(() => {
    if (selectOcb.called) {
      setLoading(false);
      const {success, message} = selectOcb;
      if (success) {
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
        dispatch(onGetVehicleList('one_click_buy', '', ''));
      } else {
        Snackbar.show({
          text: message,
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
  }, [selectOcb]);

  function renderItem({item}: ListRenderItemInfo<Vehicle>) {
    return (
      <VehicleCard
        data={item}
        onPlaceBid={() => onPlaceBid(item.uuid)}
        onPressView={() =>
          navigation.navigate('VehicleDetail', {
            title: item.model,
            vehicleId: item.uuid,
            auctionValue: item.auction_value
              ? item.auction_value
              : item.ocb_value,
            isOrder: false,
          })
        }
      />
    );
  }

  return (
    <Box style={styles.container}>
      {loading && <Loader />}
      <Pressable
        style={styles.filter}
        onPress={() => setShowFilter(!showFilter)}>
        <CustomText
          fontFamily="Roboto-Medium"
          color="#201A1B"
          fontSize={14}
          lineHeight={16}>
          Filters
        </CustomText>
        <Icon
          name="filter-variant"
          size={20}
          color="#201A1B"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginLeft: 5}}
        />
      </Pressable>
      {vehicleData?.length !== 0 ? (
        <>
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
          <Icon name="car-off" size={35} color="#111111" />
        </Box>
      )}
      {showFilter && (
        <Modal
          isOpen={showFilter}
          onClosed={onClosedFilter}
          style={styles.modal}
          position="top">
          <Filter
            filter={{...filter}}
            onApplyFilter={applyFilter}
            onClosedFilter={onClosedFilter}
          />
        </Modal>
      )}
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    ...container,
  },
  flat: {
    marginBottom: '7rem',
  },
  flatList: {
    padding: '2rem',
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    height: 'auto',
    backgroundColor: '#FFFFFF',
    width: width * 0.9,
    borderRadius: 8,
  },
  filter: {
    marginLeft: 'auto',
    marginRight: 25,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
