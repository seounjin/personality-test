import { createSlice } from '@reduxjs/toolkit';
import { IMAGE_HOLDER_PATH } from '../../tests.const';
import { BasicFormSliceInitialState } from './BasicInformationForm.type';

const initialState: BasicFormSliceInitialState = {
  title: '',
  subTitle: '',
  explain: '',
  thumbnailImgUrl: IMAGE_HOLDER_PATH,
  imageData: '',
  thumbnailImageBase64Data: '',
};

const basicFormSlice = createSlice({
  name: 'basicForm',
  initialState,
  reducers: {
    setBasicInformationForm: (state, action) => {
      state.title = action.payload.title;
      state.subTitle = action.payload.subTitle;
      state.explain = action.payload.explain;
      state.thumbnailImgUrl = action.payload.thumbnailImgUrl;
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
    },
    setThumbnailImageBase64Data: (state, action) => {
      state.thumbnailImageBase64Data = action.payload.thumbnailImageBase64Data;
    },
  },
});

export const {
  setBasicInformationForm,
  setBasicInformationItems,
  setThumbnailImageBase64Data,
} = basicFormSlice.actions;

export default basicFormSlice.reducer;
