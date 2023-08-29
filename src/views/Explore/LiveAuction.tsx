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
import Filter from '../../components/Filter';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {onPlaceVehicleBid} from '../../redux/ducks/placebid';
import Snackbar from 'react-native-snackbar';
import {container} from '../../utils/styles';
import Loader from '../../components/Loader';
import BidWindow from '../../components/BidWindow';
import {onGlobalChange} from '../../redux/ducks/global';
import {CarFilterType, ExploreProps} from '../../types/propTypes';
const {width} = Dimensions.get('window');

const Amounts = [
  {label: '5000', value: 5000},
  {label: '10,000', value: '10000'},
  {label: '2,00,000', value: '200000'},
];

export default function LiveAuction({navigation}: ExploreProps) {
  const dispatch = useDispatch<any>();
  const selectVehicleList = useAppSelector(state => state.vechicleList);
  const [vehicleData, setVehicleData] = useState<Vehicle[]>();
  const [showFilter, setShowFilter] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [id, setId] = useState('');
  const [amount, setAmount] = useState('');
  const [filter, setFilter] = useState<CarFilterType>({
    modal: '',
    vehicleType: '',
  });
  const [loading, setLoading] = useState(false);
  const [vehicleDetail, setVehicleDetail] = useState<Vehicle>();

  const selectOnBid = useAppSelector(state => state.placebid);

  useEffect(() => {
    setLoading(true);
    dispatch(onGetVehicleList('in_auction', '', ''));
  }, []);

  useEffect(() => {
    if (selectVehicleList.called) {
      setLoading(false);
      const {data, error} = selectVehicleList;
      if (!error && data) {
        setVehicleData(data);
        if (data[0].highest_bid) {
          setAmount(data[0].highest_bid.replace(/,/g, ''));
        }
      }
    }
  }, [selectVehicleList]);

  function onPlaceBid(el: Vehicle) {
    setId(el.uuid);
    setShowBidModal(true);
    setVehicleDetail(el);
    dispatch(onGlobalChange({showBottomTabs: false}));
  }

  function onClosedFilter() {
    setShowFilter(false);
  }

  function applyFilter(selectedFilters: CarFilterType) {
    setFilter(selectedFilters);
    setLoading(true);
    dispatch(
      onGetVehicleList(
        'in_auction',
        selectedFilters.modal,
        selectedFilters.vehicleType,
      ),
    );
    setShowFilter(false);
  }

  function renderItem({item}: ListRenderItemInfo<Vehicle>) {
    return (
      <VehicleCard
        data={item}
        onPlaceBid={() => onPlaceBid(item)}
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
      />
    );
  }

  function onCloseBidModal() {
    setShowBidModal(false);
    dispatch(onGlobalChange({showBottomTabs: true}));
  }

  function onSubmitBid() {
    if (+amount > 1000) {
      dispatch(onPlaceVehicleBid(id, amount));
    } else {
      Snackbar.show({
        text: 'Please enter a valid bid amount',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }

  useEffect(() => {
    if (selectOnBid.called) {
      setLoading(false);
      const {message, success} = selectOnBid;
      if (success) {
        setShowBidModal(false);
        setAmount('');
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        Snackbar.show({
          text: 'Your Bid is Lower than the last placed bid.',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
  }, [selectOnBid]);

  function onPlus() {
    let temp = 1000 + Number(amount);
    setAmount(temp.toString());
  }

  function onMinus() {
    if (+amount >= 0) {
      let temp = Number(amount) - 1000;
      setAmount(temp.toString());
    }
    if (+amount < 1000) {
      setAmount('0');
    }
  }

  function onAddAmount(value: number) {
    setAmount(value.toString());
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
      <Modal
        isOpen={showBidModal}
        onClosed={onCloseBidModal}
        style={styles.modal}
        position="top">
        <BidWindow
          data={vehicleDetail}
          onClose={onCloseBidModal}
          onMinus={onMinus}
          onPlaceBid={onSubmitBid}
          onPlus={onPlus}
          value={amount}
          onChangeText={setAmount}
          amounts={Amounts}
          onAddAmount={onAddAmount}
        />
      </Modal>
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
  bid: {
    padding: '2rem',
  },
});
