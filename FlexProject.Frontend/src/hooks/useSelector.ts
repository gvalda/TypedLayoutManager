import { RootState } from '@/app/store';
import { TypedUseSelectorHook, useSelector as useSelectorRedux } from 'react-redux';

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;
