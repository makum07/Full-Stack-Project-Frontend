'use client';

import { Provider } from 'react-redux';
import store from './store'; // ✅ now it's correctly imported

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
