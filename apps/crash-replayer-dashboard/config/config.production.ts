/*
 * @Author: Hong.Zhang
 * @Date: 2023-11-09 14:11:29
 * @Description:
 */
import { defineConfig } from '@umijs/max';
import ShredConstants from 'crash-replayer-shared-constants';

export default defineConfig({
  define: {
    API_HOST: ShredConstants.SERVER_API_HOST,
    ENV: 'production',
  },
});
