<script setup lang="ts">
import FileList from '../components/FileList.vue'
import UserManagement from '../components/UserManagement.vue'
</script>

<template>
	<main>
		<section id="content">
			<div id="file-list">
				<FileList />
			</div>
			<div id="user-management">
				<UserManagement />
			</div>
		</section>
	</main>
</template>

<style scoped>
main {
	padding-top: 64px;
}

#content {
	padding: 32px;
	width: 100vw;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;

}

#file-list {
	width: 450px;
	height: 100%;
	margin-right: 32px;
}

#user-management {
	flex: 1;
}</style>
