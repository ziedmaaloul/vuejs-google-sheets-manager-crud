<template>
	<div class="box">
		<b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
		<p class="title is-4">Edit Row</p>

		<b-button type="is-warning is-light">
			<i class="fa fa-arrow-left" aria-hidden="true"></i>
			<router-link to="/vuejs-google-sheets-manager-crud" class="btn btn-sm mr-1 btn-outline-secondary">
				Back
			</router-link>
		</b-button>
		<main role="main" class="col-md-12 ml-sm-auto col-lg-12 pt-3 px-4">
			<div class="container">


				<div class="col-md-12 order-md-1">


					<form @submit.prevent="editRow">
						<div class="row">
							<b-field label="First Name" horizontal>
								<b-input v-model="firstname" class="form-control" id="firstname"
									placeholder="First Name" required></b-input>
							</b-field>


							<b-field label="Last Name" horizontal>
								<b-input v-model="lastname" class="form-control" id="lastname" placeholder="Last Name"
									required></b-input>
							</b-field>

							<b-field label="Personal title" horizontal>
								<b-select v-model="gender" id="activity" required>
									<option value="Male" selected="selected">Male</option>
									<option value="Female">Female</option>
								</b-select>
							</b-field>

							<b-field label="E-mail" horizontal>
								<b-input v-model="email" class="form-control" id="email" required></b-input>
							</b-field>

							<div class="center">
								<button data-v-764c55d7="" type="submit"
									class="button button is-primary submit"><span>Edit</span></button>
							</div>

						</div>
					</form>
				</div>


			</div>

		</main>

	</div>
</template>

<script>
const { GoogleSpreadsheet } = require('google-spreadsheet');
import { config } from "@/config/config"
const creds = require('@/config/client_secret.json');
import { ToastProgrammatic as Toast } from 'buefy'
export default {
	name: "Edit",
	data() {
		return {
			id: null,
			rows: [],
			firstname: '',
			lastname: '',
			gender: '',
			email: '',
			isLoading: true,
			message: '',
		}
	},
	mounted() {
		this.id = this.$route.params.id;
	},
	methods: {

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
			this.firstname = rows[this.id].firstname;
			this.lastname = rows[this.id].lastname;
			this.gender = rows[this.id].gender;
			this.email = rows[this.id].email;
			this.isLoading = false;
		},
		async editRow() {
			this.isLoading = true;

			const doc = new GoogleSpreadsheet(config.sheetId);
			await doc.useServiceAccountAuth(creds);
			await doc.loadInfo();
			const sheet = doc.sheetsByIndex[0];
			const rows = await sheet.getRows({
				offset: 1
			})

			this.rows = rows;

			this.rows[this.id].firstname = this.firstname;
			this.rows[this.id].lastname = this.lastname;
			this.rows[this.id].email = this.email;
			this.rows[this.id].gender = this.gender;
			this.rows[this.id].save();
			this.isLoading = false;
			Toast.open(this.firstname + "-" + this.lastname + " Updated !");
		}
	},
	created() {
		this.id = this.$route.params.id;
		this.accessSpreadSheet();
	}
}
</script>

<style scoped>
.center {
	margin: auto;
	text-align: center;
}
</style>
