/*
 * @Author: Hong.Zhang
 * @Date: 2023-12-01 13:16:22
 * @Description: 
 */
import { CURRENCY } from "@/constants/currency";

export const formatPrice = (
  price: string | number | undefined | null,
  withCurrency?: boolean,
): string => {
  if (price === null || price === undefined) return '-';
  if (typeof price === 'number' && isNaN(price)) return '-';
  const numParts = price.toString().split('.');
  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const number = numParts.join('.');
  return `${number}${withCurrency ? CURRENCY : ''}`;
};
