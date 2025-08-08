import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockVMs } from '../mockData';
import type { VMState } from '../types';

export const fetchAllVMs = createAsyncThunk(
  'vms/fetchAllVMs',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const shouldFail = Math.random() < 0.1;
      if (shouldFail) {
        throw new Error('Failed to fetch VMs from server');
      }
      
      const serverVMs = mockVMs.map(vm => ({
        ...vm,
        cpu: vm.cpu + Math.floor(Math.random() * 10) - 5,
        memory: vm.memory + Math.floor(Math.random() * 10) - 5,
        uptime: vm.uptime,
        alerts: vm.alerts
      }));
      
      return serverVMs;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }
);

interface VMsState {
  vms: VMState[];
  isLoading: boolean;
  error: string | null;
}

const initialState: VMsState = {
  vms: [],
  isLoading: false,
  error: null
};

const vmSlice = createSlice({
  name: 'vms',
  initialState,
  reducers: {
    addVM: (state, action: PayloadAction<Omit<VMState, 'id' | 'state' | 'uptime' | 'alerts'>>) => {
      const newVM: VMState = {
        id: `vm-${Date.now()}`,
        state: 'stopped',
        uptime: '0d',
        alerts: [],
        ...action.payload
      };
      state.vms.push(newVM);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVMs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllVMs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vms = action.payload;
        state.error = null;
      })
      .addCase(fetchAllVMs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addVM,
  setLoading,
  setError,
} = vmSlice.actions;

export default vmSlice.reducer;

export const selectAllVMs = (state: { vms: VMsState }) :VMState[]=> state.vms.vms;
export const selectVMById = (state: { vms: VMsState }, id: string) :VMState | undefined => 
  state.vms.vms.find(vm => vm.id === id);
export const selectIsLoading = (state: { vms: VMsState }) :boolean => state.vms.isLoading;
export const selectError = (state: { vms: VMsState }) :string | null => state.vms.error;
