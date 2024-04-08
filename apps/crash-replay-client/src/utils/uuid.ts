/*
 * @Author: Hong.Zhang
 * @Date: 2024-04-07 17:26:34
 * @Description:
 */
import { v4 as uuidV4 } from 'uuid';

const KEY_UUID = 'uuid';

export const getUUID = () => {
  return localStorage.getItem(KEY_UUID) ?? '';
};

export const setUUID = (uuid: string) => {
  localStorage.setItem(KEY_UUID, uuid ?? '');
};

export const generateUUID = () => {
  return uuidV4();
};
