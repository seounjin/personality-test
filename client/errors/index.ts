export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const getErrorMessage = (statusCode: number) => {
  switch (statusCode) {
    case 400:
      return '잘못된 요청입니다.';
    case 401:
      return '인증이 유효하지 않습니다.';
    case 403:
      return '접근할 수 없는 페이지 입니다.';
    case 404:
      return '찾을 수 없는 페이지 입니다.';
    default:
      return '죄송합니다. 잠시 후 다시 이용해 주세요.';
  }
};
