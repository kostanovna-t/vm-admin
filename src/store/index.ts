import { configureStore } from '@reduxjs/toolkit';
import vmsReducer from './slices/vmSlice';

export const store = configureStore({
  reducer: {
    vms: vmsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;