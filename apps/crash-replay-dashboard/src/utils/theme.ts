/*
 * @Author: Hong.Zhang
 * @Date: 2023-11-10 15:05:19
 * @Description:
 */
import { COLOR_VALUE_TYPE, DEFAULT_COLOR_PLATE } from '@/constants/theme';

export function getCssVariable(color: COLOR_VALUE_TYPE) {
  const root = document.documentElement;
  return (
    getComputedStyle(root).getPropertyValue(`--color-${color}`) ||
    DEFAULT_COLOR_PLATE[color]
  );
}

export function setCssVariable(color: COLOR_VALUE_TYPE, value: string) {
  const root = document.documentElement;
  root.style.setProperty(`--color-${color}`, value);
}

export const setDefaultColorPlateToRoot = () => {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(DEFAULT_COLOR_PLATE)) {
    root.style.setProperty(`--color-${key}`, value);
  }
};
