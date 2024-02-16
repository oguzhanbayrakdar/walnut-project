<!-- UserForm.vue -->
<template>
	<div class="modal-wrapper" v-if="isOpen">
		<div class="custom-modal">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" v-if="mode == 'add'">Add New User</h5>
						<h5 class="modal-title" v-if="mode !== 'add'">Edit User</h5>
						<button type="button" class="btn btn-transparent close" @click="closeModal">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<hr>
					<div class="modal-body">
						<form @submit.prevent="saveUser">
							<div class="form-group mb-2">
								<label for="firstname">Firstname</label>
								<input type="text" id="firstname" class="form-control" v-model="firstname" placeholder="Firstname">
							</div>
							<div class="form-group mb-2">
								<label for="lastname">Lastname</label>
								<input type="text" id="lastname" class="form-control" v-model="lastname" placeholder="Lastname">
							</div>
							<div class="form-group mb-2">
								<label for="email">Email address</label>
								<input type="email" id="email" class="form-control" v-model="email" placeholder="Email">
							</div>
						</form>
					</div>
					<hr>
					<div class="modal-footer">
						<button class="btn btn-success btn-sm" type="submit" @click="saveUser">Save User</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import User from '../models/User';
import UserService from '../services/UserService'

export default defineComponent({
	props: {
		user: {
			type: Object,
			required: false
		},
		isOpen: {
			type: Boolean,
			required: true
		},
		mode: {
			// add or edit mode
			type: String,
			required: false,
			default: 'add'
		}
	},
	data() {
		return {
			id: this.user ? this.user._id : undefined,
			firstname: this.user ? this.user.firstname : '',
			lastname: this.user ? this.user.lastname : '',
			email: this.user ? this.user.email : '',
			isModalOpen: false
		};
	},
	methods: {
		/**
		 * Gets data from modal and if the modal mode is 'edit', updates user otherwise creates new user.
		 * After that emits an event to UserManagement component
		 */
		async saveUser() {
			const modalUser = new User({
				firstname: this.firstname,
				lastname: this.lastname,
				email: this.email
			})
			if (this.mode == 'add') {
				const response = await UserService.create(modalUser);
			} else {
				modalUser._id = this.id
				await UserService.update(modalUser)
			}

			this.$emit('userChange', {
				mode: this.mode,
				user: modalUser
			})
			this.closeModal();

			this.firstname = '';
			this.lastname = '';
			this.email = '';
		},
		closeModal() {
			this.$emit('close');
		}
	}
});
</script>
<style scoped>
.modal-wrapper {
	z-index: 999;
	position: absolute;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.275)
}

.custom-modal {
	width: 450px;
	position: absolute;
	left: 50%;
	top: 25%;
	z-index: 999;
	transform: translate(-50%, 0%);
	background-color: rgb(245, 245, 245);
	padding: 16px;
	border-radius: 8px;
}
</style>