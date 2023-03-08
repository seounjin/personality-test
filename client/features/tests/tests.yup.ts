import * as yup from 'yup';

yup.addMethod(yup.array, 'unique', function (mapper = (a) => a, message) {
  return this.test('unique', message, function (list) {
    return list.length === new Set(list.map(mapper)).size;
  });
});

declare module 'yup' {
  interface ArraySchema<T, C> {
    unique(mapper: (a: C) => C[keyof C], message?: string): ArraySchema<T>;
  }
}

export default yup;
