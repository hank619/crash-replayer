/*
 * @Author: Hong.Zhang
 * @Date: 2023-11-10 16:28:17
 * @Description:
 */
import { COLOR_VALUE_TYPE } from '@/constants/theme';
import React from 'react';

interface ChangeTheme {
  changeTheme: (color: COLOR_VALUE_TYPE, value: string) => void;
}
export const ThemContext = React.createContext<ChangeTheme | undefined>(
  undefined,
);
