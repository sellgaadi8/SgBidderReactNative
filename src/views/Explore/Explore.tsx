/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  // BackHandler,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  RefreshControl,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Box from '../../components/Box';
import colors from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TopTabs from '../../components/TopTabs';
import CustomText from '../../components/CustomText';
import {CarFilterType, ExploreProps} from '../../types/propTypes';
import {useDispatch} from 'react-redux';
import {onGetVehicleList} from '../../redux/ducks/vehicleList';
import Snackbar from 'react-native-snackbar';
import {useAppSelector} from '../../utils/hook';
import Modal from 'react-native-modalbox';
import Filter from '../../components/Filter';
import BidWindow from '../../components/BidWindow';
import EStyleSheet from 'react-native-extended-stylesheet';
import {onGlobalChange} from '../../redux/ducks/global';
import {onPlaceVehicleBid} from '../../redux/ducks/placebid';
import VehicleCard from '../../components/VehicleCard';
import Loader from '../../components/Loader';
import {onOCB} from '../../redux/ducks/oneClickBuy';
import {contentCenter} from '../../utils/styles';
import GlobalContext from '../../contexts/GlobalContext';
const {width} = Dimensions.get('window');

export default function Explore({navigation}: ExploreProps) {
  const tabs = [
    {title: 'LIVE AUCTION', onPress: () => onChangeTab(0, 'in_auction')},
    {title: 'OCB', onPress: () => onChangeTab(1, 'one_click_buy')},
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState<CarFilterType>({
    modal: '',
    vehicleType: '',
    isBid: false,
  });
  const [amount, setAmount] = useState('');
  const [id, setId] = useState('');
  const [showBidModal, setShowBidModal] = useState(false);
  const [vehicleDetail, setVehicleDetail] = useState<Vehicle>();
  const selectOnBid = useAppSelector(state => state.placebid);
  const selectVehicleList = useAppSelector(state => state.vechicleList);
  const selectOcb = useAppSelector(state => state.oneClickBuy);
  const flatlistRef = useRef<FlatList>(null);
  const [activeStatus, setActiveStatus] = useState('in_auction');
  const [refreshing, setRefreshing] = useState(false);
  const [resetPagination, setResetPagination] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number | null>(null);
  const [enabelTab, setEnableTab] = useState(true);
  const {userName} = useContext(GlobalContext);

  useEffect(() => {
    navigation.addListener('focus', onFocus);
    return () => {
      navigation.removeListener('focus', onFocus);
    };
  }, []);

  function onFocus() {
    setLoading(true);
    getData();
    setResetPagination(true);
    setVehicleData([]);
  }

  function getData() {
    setEnableTab(false);
    dispatch(
      onGetVehicleList(
        activeStatus,
        filter.modal,
        filter.vehicleType,
        page,
        filter.isBid,
      ),
    );
  }

  function onChangeTab(index: number, status: string) {
    setPage(1);
    setResetPagination(true);
    setTotal(0);
    setVehicleData([]);
    // Set the active tab and status
    setActiveIndex(index);
    setActiveStatus(status);
    setLoading(true);
    dispatch(
      onGetVehicleList(
        status,
        filter.modal,
        filter.vehicleType,
        page,
        filter.isBid,
      ),
    );
  }

  useEffect(() => {
    if (selectVehicleList.called) {
      setEnableTab(true);
      setLoading(false);
      const {data, success} = selectVehicleList;
      if (!success) {
        setResetPagination(false);
        setLoading(false);
        setRefreshing(false);
      }
      if (
        data &&
        data.vehicle_list &&
        data.count &&
        vehicleData.length !== data.count
      ) {
        const list: Vehicle[] = resetPagination ? [] : [...vehicleData];
        data.vehicle_list.map(item => {
          return list.push({
            make: item.make,
            color: item.color,
            model: item.model,
            variant: item.variant,
            mfg_year: item.mfg_year,
            reg_date: item.reg_date,
            fuel_type: item.fuel_type,
            no_of_kms: item.no_of_kms,
            no_of_owners: item.no_of_owners,
            transmission: item.transmission,
            uuid: item.uuid,
            images: item.images,
            vehicle_status: item.vehicle_status,
            ocb_value: item.ocb_value,
            auction_value: item.auction_value,
            auction_ends_at: item.auction_ends_at,
            extra_info: item.extra_info,
            highest_bid: item.highest_bid,
          });
        });
        setVehicleData(list);
        setResetPagination(false);
        setLoading(false);
        setRefreshing(false);
        setTotal(data.count);
      }
    }
  }, [selectVehicleList]);

  function onPlaceBid(el: Vehicle) {
    if (activeIndex === 0) {
      setId(el.uuid);
      setShowBidModal(true);
      setVehicleDetail(el);
      dispatch(onGlobalChange({showBottomTabs: false}));
    } else {
      setLoading(true);
      setResetPagination(true);
      setRefreshing(true);
      setVehicleData([]);
      dispatch(onOCB(el.uuid));
    }
  }

  function onClosedFilter() {
    setShowFilter(false);
  }

  function applyFilter(selectedFilters: CarFilterType) {
    setEnableTab(false);
    setResetPagination(true);
    setFilter(selectedFilters);
    setLoading(true);
    setVehicleData([]);
    setShowFilter(false);
    dispatch(
      onGetVehicleList(
        'in_auction',
        selectedFilters.modal,
        selectedFilters.vehicleType,
        page,
        selectedFilters.isBid,
      ),
    );
    if (vehicleData && vehicleData.length !== 0) {
      flatlistRef?.current?.scrollToIndex({
        index: 0,
        animated: false,
      });
    }
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
            isOrder: false,
            status: item.vehicle_status,
            highetBid: item.highest_bid,
            data: item,
          })
        }
      />
    );
  }

  function onCloseBidModal() {
    setShowBidModal(false);
    dispatch(onGlobalChange({showBottomTabs: true}));
  }

  function onSubmitBid(value: string) {
    const result = (20 / 100) * Number(value);
    if (+amount >= result) {
      dispatch(onPlaceVehicleBid(id, amount));
    } else {
      Snackbar.show({
        text: `Bid amount should be greater then ${result}`,
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }

  useEffect(() => {
    if (selectOnBid.called) {
      setLoading(false);
      const {success, message} = selectOnBid;
      if (success) {
        setResetPagination(true);
        setShowBidModal(false);
        setRefreshing(true);
        setVehicleData([]);
        navigation.navigate('SuccessPage');
      } else {
        Snackbar.show({
          text: message,
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
    if (selectOcb.called) {
      setLoading(false);
      const {success, message} = selectOcb;
      if (success) {
        setResetPagination(true);
        getData();
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        Snackbar.show({
          text: message,
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
  }, [selectOnBid, selectOcb]);

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

  function onAddAmount(value: string) {
    setAmount(value.toString());
  }

  function onRefresh() {
    setLoading(true);
    setResetPagination(true);
    setRefreshing(true);
    setVehicleData([]);
    dispatch(
      onGetVehicleList(
        activeStatus,
        filter.modal,
        filter.vehicleType,
        page,
        filter.isBid,
      ),
    );
  }

  function onLoadMore() {
    if (total !== null && vehicleData.length < total) {
      const nextPage = page + 1;
      setLoading(true);
      setPage(nextPage);
      setEnableTab(false);
      dispatch(
        onGetVehicleList(
          activeStatus,
          filter.modal,
          filter.vehicleType,
          nextPage,
          false,
        ),
      );
    } else {
      setPage(1);
    }
  }

  return (
    <Box style={styles.container}>
      {loading && <Loader />}
      <Box style={styles.header}>
        <Box flexDirection="row" alignItems="center" justifyContent="center">
          <Box style={styles.inputContainer}>
            <CustomText
              color="#FFFFFF"
              fontFamily="Roboto-Medium"
              fontSize={22}
              lineHeight={28}>
              Welcome {userName}!
            </CustomText>
          </Box>
          <Pressable style={styles.bell}>
            <Icon name="bell-outline" size={25} color="#FFFFFF" />
          </Pressable>
        </Box>
        <TopTabs tabs={tabs} activeIndex={activeIndex} tabEnabled={enabelTab} />
      </Box>

      <Box flexDirection="row" ph={'6%'}>
        {filter.modal && (
          <Box style={styles.filterBox}>
            <CustomText
              fontFamily="Roboto-Medium"
              color="#FFFFFF"
              fontSize={12}
              lineHeight={18}>
              {filter.modal}
            </CustomText>
          </Box>
        )}
        {filter.vehicleType && (
          <Box style={[styles.filterBox, {left: 20}]}>
            <CustomText
              fontFamily="Roboto-Medium"
              color="#FFFFFF"
              fontSize={12}
              lineHeight={18}>
              {filter.vehicleType.replace(/_/g, ' ')}
            </CustomText>
          </Box>
        )}
        {filter.isBid && (
          <Box style={[styles.filterBox, {left: 20}]}>
            <CustomText
              fontFamily="Roboto-Medium"
              color="#FFFFFF"
              fontSize={12}
              lineHeight={18}>
              Bidded Vehicle
            </CustomText>
          </Box>
        )}
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
            style={{marginLeft: 5}}
          />
        </Pressable>
      </Box>

      {vehicleData?.length !== 0 ? (
        <>
          <Box style={styles.flat}>
            <FlatList
              data={vehicleData}
              renderItem={renderItem}
              contentContainerStyle={styles.flatList}
              ref={flatlistRef}
              removeClippedSubviews={true}
              onEndReached={!loading ? onLoadMore : null}
              onEndReachedThreshold={0.5}
              keyExtractor={(_, index) => index.toString()}
              refreshControl={
                <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              }
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
          position="center">
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
        position="center">
        <BidWindow
          data={vehicleDetail}
          onClose={onCloseBidModal}
          onMinus={onMinus}
          onPlaceBid={onSubmitBid}
          onPlus={onPlus}
          value={amount}
          onChangeText={setAmount}
          onAddAmount={onAddAmount}
        />
      </Modal>
    </Box>
  );
}

const styles = EStyleSheet.create({
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
  filterBox: {
    borderRadius: 20,
    padding: 5,
    backgroundColor: '#111111',
    ...contentCenter,
    marginTop: 10,
    paddingHorizontal: '1.5rem',
  },
});
