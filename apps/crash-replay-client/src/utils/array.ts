/*
 * @Author: Hong.Zhang
 * @Date: 2023-11-13 14:51:15
 * @Description:
 */
export const toArray = (
  param: null | string | (string | null)[],
): Array<any> => {
  if (param === null || param === undefined) return [];
  if (param instanceof Array) return param.filter(item => item);
  return [param];
};
