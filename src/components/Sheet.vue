<template>
	<div>
		<b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
		<div class="row-list">
			<div class="b-table">
				<div class="table-wrapper has-mobile-cards">
					<table class="table">
						<thead>
							<tr>
								<th draggable="false" class="" style="width: 40px;">
									<div class="th-wrap is-numeric"><span class="is-relative"> Index </span></div>
								</th>
								<th draggable="false" class="">
									<div class="th-wrap"><span class="is-relative"> First Name </span></div>
								</th>
								<th draggable="false" class="">
									<div class="th-wrap"><span class="is-relative"> Last Name </span></div>
								</th>
								<th draggable="false" class="">
									<div class="th-wrap"><span class="is-relative"> E-mail </span></div>
								</th>
								<th draggable="false" class="">
									<div class="th-wrap"><span class="is-relative"> Gender </span></div>
								</th>
								<th draggable="false" class="">
									<div class="th-wrap"><span class="is-relative">  </span></div>
								</th>
								<th draggable="false" class="">
									<div class="th-wrap"><span class="is-relative">  </span></div>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr draggable="false" class="" v-for="(row, index) in rows" v-bind:row="row" :key="index">
								<td data-label="ID" class="has-text-right"><span>{{ row.id }}</span></td>
								<td data-label="First Name" class=""><span>{{row.firstname}}</span></td>
								<td data-label="Last Name" class=""><span>{{row.lastname}}</span></td>
								<td data-label="E-mail"><span>{{row.email}}</span></td>
								<td data-label="Gender" class=""><span>{{row.gender}}</span></td>
								<td><router-link :to="'/vuejs-google-sheets-manager-crud/edit/' + index" class="button is-light"><i class="fa fa-pencil" aria-hidden="true"></i> <span class="margin-left">Edit</span></router-link></td>
								<td><b-button type="is-danger" v-on:click="deleteRow(index)"><i class="fa fa-trash" aria-hidden="true"></i> <span class="margin-left">Delete</span></b-button></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
 




<script>
const { GoogleSpreadsheet } = require('google-spreadsheet');
import {config} from "@/config/config" 
const creds = require('@/config/client_secret.json');
import { ToastProgrammatic as Toast } from 'buefy'
export default {
	name: "Sheet",
	components: {
	},
	props: ["sheet"],
	data() {
		return {
			rows: [],
			isLoading: true,
		}
	},
	methods: {
		async deleteRow(index){
			this.isLoading = true;
			this.rows[index].delete();
			Toast.open("Row deleted !");
			this.accessSpreadSheet();
		},
		async accessSpreadSheet() {
			this.isLoading = true;
			const doc = new GoogleSpreadsheet(config.sheetId);
			await doc.useServiceAccountAuth(creds);
			await doc.loadInfo();
			const sheet = doc.sheetsByIndex[0];
			const rows = await sheet.getRows({
				offset: 1
			})

			this.rows = rows;
			this.isLoading = false;
		}
	},
	created() {
		this.accessSpreadSheet();
	}

}
</script>

<style scoped>
.margin-left{
	margin-left: 7px;
}
</style>