/* eslint-disable react-hooks/exhaustive-deps */
import {Dimensions, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StatusList} from '../utils/constant';
import Box from './Box';
import CustomDropdown from './CustomDropdown';
import CustomText from './CustomText';
import Input from './Input';
import PrimaryButton from './PrimaryButton';
import Modal from 'react-native-modalbox';
import SearchModal from './searchModal';
import {useDispatch} from 'react-redux';
import {getModelList} from '../redux/ducks/getModal';
import {useAppSelector} from '../utils/hook';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../utils/colors';
import Loader from './Loader';
import {getMakeList} from '../redux/ducks/getMake';
import {CarFilterType, FilterProps, ModalType} from '../types/propTypes';
const {width, height} = Dimensions.get('window');

export default function Filter({
  onClosedFilter,
  onApplyFilter,
  filter,
}: FilterProps) {
  const [make, setMake] = useState('');
  const [makeData, setMakeData] = useState<string[]>([]);
  const [modelData, setModelData] = useState<string[]>([]);
  const [modalData, setModalData] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dataType, setDataType] = useState<ModalType>('Make');
  const [modalPlaceholder, setModalPlaceholder] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const selectModel = useAppSelector(state => state.getModal);
  const selectMake = useAppSelector(state => state.getMake);
  const dispatch = useDispatch<any>();
  const [tempFilter, setTempFilter] = useState<CarFilterType>({
    ...filter,
  });
  const {modal, vehicleType} = tempFilter;

  useEffect(() => {
    dispatch(getMakeList());
  }, []);

  function onPressSelecteItem(data: string, modalType: ModalType) {
    switch (modalType) {
      case 'Make':
        setMake(data);
        setLoading(true);
        dispatch(getModelList(data));
        const _tempFilterModal = {...tempFilter};
        _tempFilterModal.modal = '';
        setTempFilter(_tempFilterModal);
        break;
      case 'Model':
        const _tempFilter = {...tempFilter};
        _tempFilter.modal = data;
        setTempFilter(_tempFilter);
        break;
    }
    setShowModal(false);
  }

  function discardFilter() {
    setMake('');
    setTempFilter({modal: '', vehicleType: ''});
  }

  function onVtypeChange(value: string) {
    const _tempFilter = {...tempFilter};
    _tempFilter.vehicleType = value;
    setTempFilter(_tempFilter);
  }

  function onOpenModal(modalType: ModalType) {
    switch (modalType) {
      case 'Make':
        setModalPlaceholder('Search Make...');
        setModalData(makeData);
        setDataType('Make');
        break;
      case 'Model':
        setModalPlaceholder('Search Model...');
        setModalData(modelData);
        setDataType('Model');
        break;
    }
    setShowModal(true);
  }

  function onCloseMakeModal() {
    setShowModal(false);
  }

  function onChangeQuery(value: string) {
    const lowerCaseQuery = value.toLowerCase();

    let filteredModalData = modalData.filter(el => {
      const lowerCaseEl = el.toLowerCase();
      return lowerCaseEl.includes(lowerCaseQuery);
    });

    if (lowerCaseQuery === '') {
      filteredModalData = modelData;
    }
    setModalData(filteredModalData);
    setSearchQuery(value);
  }

  useEffect(() => {
    if (selectModel.called) {
      setLoading(false);
      const {error, data} = selectModel;
      if (!error && data) {
        setModelData(data);
      }
    }
    if (selectMake.called) {
      setLoading(false);
      const {error, data} = selectMake;
      if (!error && data) {
        setMakeData(data);
      }
    }
  }, [selectModel, selectMake]);

  function onModalChange(value: string) {
    const _tempFilter = {...tempFilter};
    _tempFilter.modal = value;
    setTempFilter(_tempFilter);
  }

  function onApply() {
    onApplyFilter({...tempFilter});
  }

  return (
    <>
      <Box>
        {loading && <Loader />}
        <Box alignItems="center" justifyContent="center" pv={'3%'}>
          <CustomText
            fontFamily="Roboto-Bold"
            color="#111111"
            fontSize={22}
            lineHeight={28}>
            Filter
          </CustomText>
          <Pressable style={styles.close} onPress={onClosedFilter}>
            <Icon name="close" size={25} color="#201A1B" />
          </Pressable>
        </Box>
        <Box ph={'4%'}>
          <CustomDropdown
            values={StatusList}
            onValueChange={onVtypeChange}
            selectedValue={vehicleType}
          />
        </Box>
        <Pressable onPress={() => onOpenModal('Make')} style={styles.makeInput}>
          <Input
            label="Make"
            value={make}
            onChangeText={setMake}
            noMargin
            editable={false}
          />
        </Pressable>
        <Pressable
          onPress={() => onOpenModal('Model')}
          style={styles.makeInput}>
          <Input
            label="Model"
            value={modal}
            onChangeText={onModalChange}
            noMargin
            editable={false}
          />
        </Pressable>

        <Box style={styles.buttonContainer}>
          <Box width={'45%'}>
            <PrimaryButton
              label="Discard"
              onPress={discardFilter}
              varient="Secondary"
            />
          </Box>
          <Box width={'45%'}>
            <PrimaryButton label="Apply" onPress={onApply} />
          </Box>
        </Box>
      </Box>
      <Modal
        isOpen={showModal}
        onClosed={onCloseMakeModal}
        style={styles.modelData}
        backButtonClose={true}
        backdrop={true}>
        <SearchModal
          placeholder={modalPlaceholder}
          data={modalData}
          onPressSelecteItem={onPressSelecteItem}
          dataType={dataType}
          query={searchQuery}
          onChangeText={onChangeQuery}
          onPressDone={() => console.log('test')}
        />
      </Modal>
    </>
  );
}

const styles = EStyleSheet.create({
  modelData: {
    backgroundColor: colors.primary,
    height: height * 0.7,
    width,
    paddingHorizontal: 0.3,
    borderRadius: 3,
    zIndex: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
  endIcon: {
    backgroundColor: colors.secondaryLight,
    padding: 5,
    borderRadius: 20,
    position: 'absolute',
    right: 10,
    top: 10,
  },

  makeInput: {paddingHorizontal: 15},
  close: {
    position: 'absolute',
    right: 10,
  },
});
