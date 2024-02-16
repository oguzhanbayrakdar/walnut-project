import type User from '@/models/User';
import { reactive } from 'vue'

/**
 * We use this to pass data between UserManagement and FileList components
 */
export const csvDataStore = reactive({
  data: [] as User[],
  setData(something: User[]) {
    this.data = something;
  },
})
