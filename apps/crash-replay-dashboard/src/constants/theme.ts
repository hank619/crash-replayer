/*
 * @Author: Hong.Zhang
 * @Date: 2023-11-09 16:34:37
 * @Description:
 */
export const COLORS = {
  // brand
  primary: 'primary',
  //functional
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
  // neutral
  black: 'black',
  gray: 'gray',
  white: 'white',
} as const;

type COLOR_TYPE = typeof COLORS;
export type COLOR_VALUE_TYPE = COLOR_TYPE[keyof COLOR_TYPE];

export const DEFAULT_COLOR_PLATE: Record<COLOR_VALUE_TYPE, string> = {
  [COLORS.primary]: '#5858ff',
  [COLORS.success]: '#2ed573',
  [COLORS.error]: '#f52209',
  [COLORS.warning]: '#cf8909',
  [COLORS.info]: '#1e90ff',
  [COLORS.black]: '#212121',
  [COLORS.gray]: '#eeeeee',
  [COLORS.white]: '#ffffff',
};
