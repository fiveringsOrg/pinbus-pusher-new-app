/* eslint-disable import/no-anonymous-default-export */
import React, { FC } from 'react';
import { Button , ConfigProvider} from 'antd';
import 'antd/dist/reset.css';
import './App.css';

const App: FC = () => (
  <div className="App">
    <Button type="primary">Button</Button>
  </div>
);

export default () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00b96b',
      },
    }}
  >
    <App />
  </ConfigProvider>
);