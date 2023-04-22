import imageCompression from 'browser-image-compression';
import {
  TrueOrFalseTestResultFormItem,
  TrueOrFalseTestSelectFormItem,
} from './container/TrueOrFalseTestContainer/trueOrFalseTest.type';
import { ALLOWED_EXTENSIONS, IMAGE_DOMAIN } from './tests.const';
import { CompressedResult } from './tests.types';

const createArray = (items) => {
  return items.map(({ question, optionItems }, questionIndex) => {
    return optionItems.map(({ id, option }, optionIndex) => {
      return {
        qusetionNumber: questionIndex + 1,
        question: question,
        optionId: id,
        optionNumber: optionIndex + 1,
        option: option,
      };
    });
  });
};

const combination = (array, prefix = [], res = []) => {
  if (array.length === 0) {
    res.push(prefix);
    return;
  }

  for (let index = 0; index < array[0].length; index++) {
    const newPrefix = prefix.concat(array[0][index]);
    combination(array.slice(1), newPrefix, res);
  }

  return res;
};

export const createTrueOrFalseTestResultFormItems = (
  trueOrFalseTestSelectFormItems: TrueOrFalseTestSelectFormItem[],
  trueOrFalseTestResultFormItems: TrueOrFalseTestResultFormItem[] = [],
) => {
  const array = createArray(trueOrFalseTestSelectFormItems);

  const res = combination(array);

  return res.map((combNumberItem, index) => {
    return {
      selectedOptionNumber: combNumberItem.reduce(
        (num, { optionNumber }, index) => {
          return (num += optionNumber);
        },
        '',
      ),
      resultContent: trueOrFalseTestResultFormItems[index]
        ? trueOrFalseTestResultFormItems[index].resultContent
        : '',
      explanationContent: trueOrFalseTestResultFormItems[index]
        ? trueOrFalseTestResultFormItems[index].explanationContent
        : '',
      selectedOption: combNumberItem.map(
        ({ qusetionNumber, question, optionNumber, optionId, option }) => ({
          qusetionNumber: qusetionNumber,
          question: question,
          optionNumber: optionNumber,
          optionId: optionId,
          option: option,
        }),
      ),
    };
  });
};

export const setWeightedScoreDictionary = (data) =>
  data.reduce((dic, { resultContent }) => ({ ...dic, [resultContent]: 0 }), {});

export const actionImageCompress = async (
  file: File,
): Promise<CompressedResult> => {
  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);

    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const imageBase64Data = reader.result as string;
        resolve({ compressedFile, imageBase64Data });
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(compressedFile);
    });
  } catch (error) {
    console.log('이미지 업로드 에러');
    throw error;
  }
};

export const base64ToFile = async (dataURI, fileName) => {
  const response = await fetch(dataURI);
  const blob = await response.blob();
  const fileExtension = blob.type.split('/')[1];
  const fullFileName = `${fileName}.${fileExtension}`;
  return new File([blob], fullFileName, { type: blob.type });
};

export const objectToFormData = (obj, formData) =>
  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, JSON.stringify(value));
  });

export const isImageFile = (fileName: string): boolean => {
  const fileExtension = fileName.split('.').pop()?.toLowerCase();
  return ALLOWED_EXTENSIONS.includes(fileExtension ?? '');
};

export const isValidImageUrl = (imgSrc: string) => {
  return imgSrc.startsWith(IMAGE_DOMAIN);
};

export const parseS3Url = (s3Url: string) => {
  const regex = /^https:\/\/(.+?)\..+?\/(.+)$/;
  const match = s3Url.match(regex);

  return {
    bucketName: match[1],
    imagePath: match[2],
  };
};
