import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.scss';

import { App } from './app';
import { setupStore } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const store = setupStore();

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
