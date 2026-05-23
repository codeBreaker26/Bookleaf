import { useMemo } from 'react';
import api from '@api/axios';

export function useAxios() {
  return useMemo(() => api, []);
}
