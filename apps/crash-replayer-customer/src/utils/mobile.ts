/*
 * @Author: Hong.Zhang
 * @Date: 2023-11-10 18:48:21
 * @Description:
 */
import MobileDetect from 'mobile-detect';

const md = new MobileDetect(navigator.userAgent);

export const isMobile = md.mobile() !== null;
