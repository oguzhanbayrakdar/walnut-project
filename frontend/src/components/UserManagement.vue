<template>
	<div class="wrapper">
		<div class="w-100 d-flex justify-content-between">
			<h3>User Management</h3>
			<button class="btn btn-primary" @click="openModal">Add User</button>
		</div>
		<hr class="w-100">
		<div class="w-100">
			<UserTable :userData="users" @deleteUser="deleteUser" @tableChange="userChange" />
		</div>
	</div>
	<UserForm v-if="isModalOpen" :isOpen="isModalOpen" @close="isModalOpen = false" @userChange="userChange" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserTable from './UserTable.vue';
import UserForm from './UserForm.vue';
import UserService from '../services/UserService';
import User from '../models/User';
import { csvDataStore } from '../stores/csvDataStore'

export default defineComponent({
	components: {
		UserTable,
		UserForm,
	},
	data() {
		return {
			users: [],
			isModalOpen: false,
			csvDataStore
		}
	},
	methods: {
		async fetchUsers() {
			try {
				// Make API call using Axios with async/await
				const response = await UserService.getUsers();
				// Update users data with fetched data
				this.users = response.data;
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		},
		async deleteUserFromDb(userId: string) {
			try {
				await UserService.delete(userId)
			} catch (error) {
				console.error('Error deleting user:', error);
			}
		},
		openModal() {
			this.isModalOpen = true;
		},
		closeModal() {
			this.isModalOpen = false;
		},
		deleteUser(userId: string) {
			// Remove user from DB
			this.deleteUserFromDb(userId);
			// Remove user from UI
			const index = this.users.findIndex(f => f._id === userId);
			this.users.splice(index, 1)
		},
		userChange(data: { mode: 'add' | 'edit', user: User }) {
			// If the mod is edit, finds and changes the user's properties with the new ones.
			// Otherwise pushes data to beginning of the array
			if (data.mode === 'edit') {
				const index = this.users.findIndex(u => u._id === data.user._id);
				if (index !== -1) {
					this.users[index] = { ...this.users[index], ...data.user };
				}
			} else {
				this.users.unshift(data.user)
			}
		}
	},
	mounted() {
		this.fetchUsers();
	},
	watch: {
		// Watches if there is any incoming data from FileList component.
		'csvDataStore.data'(newData: User[], oldData: any) {
			this.users.unshift(...newData);
		}
	}
})
</script>
<style scoped>
.wrapper {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}
</style>