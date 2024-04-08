/*
 * @Author: Hong.Zhang
 * @Date: 2024-04-03 11:40:49
 * @Description:
 */
import { request } from '@umijs/max';
import { useEffect } from 'react';
import { pack, record } from 'rrweb';
import { getUUID } from './uuid';

const sampling = {
  // 不录制鼠标移动事件
  // mousemove: false,
  // // 不录制鼠标交互事件
  // mouseInteraction: false,
  // // 设置滚动事件的触发频率
  // scroll: 1000, // 每 150ms 最多触发一次
  // // set the interval of media interaction event
  // media: 1000,
  // // 设置输入事件的录制时机
  // input: 'last', // 连续输入时，只录制最终值
};

const events: any = [[], []];
let queueIndex = 0;

export const useRrweb = () => {
  useEffect(() => {
    const stopFn = record({
      emit(event, isCheckout) {
        if (isCheckout) {
          queueIndex = (queueIndex + 1) % 2;
          events[queueIndex] = [];
        }
        events[queueIndex].push(event);
      },
      sampling: sampling,
      packFn: pack,
      checkoutEveryNms: 60 * 10000,
    });

    // prevent onerror trigger twice in dev mode
    let reporting = false;
    window.onerror = (
      error: Event | string,
      source?: string,
      lineno?: number,
      colno?: number,
    ) => {
      if (reporting) {
        return;
      }
      reporting = true;
      const preQueueIndex = (queueIndex + 1) % 2;
      const concatEvents = events[preQueueIndex].concat(events[queueIndex]);
      setTimeout(() => {
        reporting = false;
      }, 1000);

      request('/events', {
        method: 'POST',
        data: {
          error,
          source,
          lineno,
          colno,
          customerId: getUUID(),
          events: JSON.stringify(concatEvents),
        },
      })
        .catch((err) => {
          console.log('🚀 ~ useEffect ~ err:', err);
        })
        .finally(() => {
          reporting = false;
        });
      return true;
    };
    return () => {
      stopFn();
      window.onerror = null;
    };
  }, []);

  return null;
};
