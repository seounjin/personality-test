import imageCompression from 'browser-image-compression';
import { ALLOWED_EXTENSIONS, IMAGE_DOMAIN, MAX_FILE_SIZE } from './tests.const';
import { CompressedResult } from './tests.types';

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

export const appendBase64ImagesToFormData = async (
  formData,
  thumbnailImageBase64Data,
  imageBase64DataArray,
) => {
  if (thumbnailImageBase64Data) {
    const thumbnailImageFile = await base64ToFile(
      thumbnailImageBase64Data,
      `thumbnail_0`,
    );
    formData.append(`image`, thumbnailImageFile);
  }

  await Promise.all(
    imageBase64DataArray.map(async (imageData, index) => {
      if (!imageData) return null;
      const imageFile = await base64ToFile(imageData, `result_${index}`);
      formData.append(`image`, imageFile);
    }),
  );
  return formData;
};

export const objectToFormData = (obj, formData) => {
  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, JSON.stringify(value));
  });
  return formData;
};

export const isImageFile = (fileName: string): boolean => {
  const fileExtension = fileName.split('.').pop()?.toLowerCase();
  return ALLOWED_EXTENSIONS.includes(fileExtension ?? '');
};

export const validateImageFile = (file: File) => {
  if (!file) return false;

  if (!isImageFile(file.name)) {
    alert('허용되지 않은 파일 형식입니다.');
    return false;
  }

  if (file.size > MAX_FILE_SIZE) {
    alert('최대 이미지 용량은 2mb입니다.');
    return false;
  }
  return true;
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
