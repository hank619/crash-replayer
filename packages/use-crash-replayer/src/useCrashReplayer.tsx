/*
 * @Author: Hong.Zhang
 * @Date: 2024-04-10 16:30:06
 * @Description:
 */
import { useEffect } from 'react';
import { pack, record } from 'rrweb';

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

export const useCrashReplayer = (
  url: string,
  browserId: string,
  customerId: string = ''
) => {
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
    const onError = (errorEvent: ErrorEvent) => {
      if (reporting) {
        return;
      }
      reporting = true;
      const preQueueIndex = (queueIndex + 1) % 2;
      const concatEvents = events[preQueueIndex].concat(events[queueIndex]);

      const concatEventsString = JSON.stringify(concatEvents);
      console.log('🚀 ~ onError ~ concatEventsString:', concatEventsString);
      const body = JSON.stringify({
        error: errorEvent.message,
        source: errorEvent.filename,
        lineno: errorEvent.lineno,
        colno: errorEvent.colno,
        browserId: browserId,
        customerId: customerId,
        events: concatEventsString,
      });
      console.log('🚀 ~ onError ~ body:', body);
      console.log('🚀 ~ onError ~ url:', url);
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      })
        .then((res) => {
          if (!res.ok) {
            console.log('🚀 ~ useEffect Network response was not ok');
          }
          return res.json();
        })
        .catch((err) => {
          console.log('🚀 ~ useEffect ~ err:', err);
        })
        .finally(() => {
          reporting = false;
        });
      return true;
    };

    window.addEventListener('error', onError);

    return () => {
      stopFn?.();
      window.removeEventListener('error', onError);
    };
  }, []);
};
