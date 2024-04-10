/*
 * @Author: Hong.Zhang
 * @Date: 2023-11-09 14:11:29
 * @Description:
 */
import { defineConfig } from '@umijs/max';
import { SERVER_API_HOST } from 'crash-replayer-constants';

export default defineConfig({
  define: {
    API_HOST: SERVER_API_HOST,
    ENV: 'production',
  },
});
