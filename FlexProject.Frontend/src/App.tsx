import { store } from '@/app/store';
import { router } from '@/router';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { RouterProvider } from '@tanstack/react-router';
import React from 'react';
import { Provider } from 'react-redux';

export function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <MantineProvider>
          <RouterProvider router={router} />
        </MantineProvider>
      </Provider>
    </React.StrictMode>
  );
}
