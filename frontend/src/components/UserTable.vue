<template>
  <table class="table table-responsive">
    <thead>
      <tr>
        <th scope="col">Firstname</th>
        <th scope="col">Lastname</th>
        <th scope="col">Email</th>
        <th scope="col" width="100">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in userData" :key="user._id">
        <td>{{ user.firstname }}</td>
        <td>{{ user.lastname }}</td>
        <td>{{ user.email }}</td>
        <td width="100">
          <button class="btn btn-transparent" @click="editUser(user._id)">
						<i class="fas fa-pen"></i>
					</button>
          <button class="btn btn-transparent" @click="deleteUser(user._id)">
						<i class="fas fa-trash" style="color:red"></i>
					</button>
        </td>
      </tr>
    </tbody>
  </table>
	<UserForm v-if="isModalOpen" :isOpen="isModalOpen" :user="user" :mode="'edit'" @close="isModalOpen = false" @userChange="userChange"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserForm from './UserForm.vue';
import User from '../models/User';

export default defineComponent({
	components: {
		UserForm
	},
	props: ['userData'],
	data() {
		return {
			isModalOpen: false,
			user: null
		}
	},
  methods: {
    editUser(userId: string) {
      //this.$emit('edit-user', user);
			this.isModalOpen = true;
			this.user = this.userData.find(f => f._id === userId)
    },
    deleteUser(userId: string) {
      this.$emit('deleteUser', userId);
    },
		closeModal() {
			this.isModalOpen = false;
		},
		userChange(data: {mode: 'add' | 'edit', user: User}){
			if(data.mode == 'edit'){
				this.$emit('tableChange', data)
			}
		}
  }
});

</script>
<style scoped>

</style>
