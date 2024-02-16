<template>
	<div class="header">
		<h3>Files</h3>
	</div>
	<hr class="mt-4">
	<div class="mt-2">
		<div>
			<h5>New File</h5>
		</div>
		<div class="input-group">
			<input type="file" class="form-control" id="file" accept=".csv, .txt" aria-describedby="file" aria-label="Upload"
				@change="handleFileUpload">
			<button class="btn btn-outline-secondary" type="button" @click="uploadFile" id="inputGroupFileAddon04">Yükle</button>
		</div>
	</div>
	<div class="mt-4">
		<h5>File List</h5>
		<ul class="list-group">
			<li class="list-group-item d-flex align-items-center" v-for="file in fileList" :key="file._id">
				<i class="fas fa-file-alt fa-2x"></i>
				<div style="margin-left:16px">{{ file.originalName }}</div>
			</li>
		</ul>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import FileService from '../services/FileService';
import { csvDataStore } from '../stores/csvDataStore'

export default defineComponent({
	data(){
		return {
			fileList: []
		}
	},
	methods: {
		handleFileUpload(event: Event) {
			const target = event.target as HTMLInputElement;
			this.selectedFile = target.files && target.files[0];
		},
		async uploadFile() {
			if (!this.selectedFile) {
				console.error('Selected file is undefined or null');
				return;
			}
			const response = await FileService.uploadFile(this.selectedFile);
			csvDataStore.setData(response.data.csvData)
			// Pushes incoming file data to array.
			this.fileList.unshift(response.data.uploadedFile)
		},
		// Gets File Collection
		async getFileList(){
			const response = await FileService.getFiles();
			this.fileList = response.data;
		}
	},
	mounted(){
		this.getFileList();
	}
})
</script>