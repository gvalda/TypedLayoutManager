import { AppDispatch } from '@/app/store';
import { useDispatch as useDispatchRedux } from 'react-redux';

export const useDispatch: () => AppDispatch = useDispatchRedux;
