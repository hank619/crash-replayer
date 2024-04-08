import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  antd: {},
  model: {},
  initialState: {},
  request: {
    dataField: '',
  },
  routes: routes,
  npmClient: 'pnpm',
  plugins: ['@umijs/max-plugin-openapi'],
  openAPI: {
    requestLibPath: "import { request } from '@umijs/max'",
    schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.jso',
    mock: false,
    projectName: 'bizApi',
  },
  tailwindcss: {},
  postcssLoader: {
    plugins: ['tailwindcss', 'autoprefixer'],
  },
  locale: {
    default: 'en-US',
  },
  hash: true,
  // https://umijs.org/docs/api/config#icon-%E9%9B%86%E4%BD%BF%E7%94%A8
  icons: { autoInstall: {} },
  outputPath: 'build'
});
