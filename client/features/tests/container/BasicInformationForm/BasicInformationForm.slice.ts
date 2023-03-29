import { createSlice } from '@reduxjs/toolkit';
import { IMAGE_HOLDER_PATH } from '../../tests.const';
import { BasicFormSliceInitialState } from './BasicInformationForm.type';

const initialState: BasicFormSliceInitialState = {
  title: '',
  subTitle: '',
  explain: '',
  thumbnailImgUrl: '',
  imageData: '',
  isChangeImage: false,
  isOpenCancleButton: false,
};

const basicFormSlice = createSlice({
  name: 'basicForm',
  initialState,
  reducers: {
    setBasicInformationForm: (state, action) => {
      state.title = action.payload.title;
      state.subTitle = action.payload.subTitle;
      state.explain = action.payload.explain;
    },
    setBasicInformationItems: (state, action) => {
      const {
        basicInformationItems: { title, subTitle, explain },
        thumbnailImgUrl,
      } = action.payload.data;
      state.title = title;
      state.subTitle = subTitle;
      state.explain = explain;
      state.thumbnailImgUrl = thumbnailImgUrl
        ? thumbnailImgUrl
        : IMAGE_HOLDER_PATH;
      state.isOpenCancleButton = thumbnailImgUrl ? true : false;
    },

    setImageInformation: (state, action) => {
      state.thumbnailImgUrl = action.payload.thumbnailImgUrl;
      state.imageData = action.payload.imageData;
      state.isChangeImage = true;
      state.isOpenCancleButton = true;
    },

    setResetChangeImage: (state) => {
      state.isChangeImage = false;
      state.thumbnailImgUrl = IMAGE_HOLDER_PATH;
      state.imageData = '';
      state.isOpenCancleButton = false;
    },
  },
});

export const {
  setBasicInformationForm,
  setBasicInformationItems,
  setImageInformation,
  setResetChangeImage,
} = basicFormSlice.actions;

export default basicFormSlice.reducer;
