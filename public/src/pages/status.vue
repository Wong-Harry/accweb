<template>
	<layout>
		<div class="title">
			<h1>{{$t("title")}}</h1>
			<div class="menu">
				<button v-on:click="loadServer(true)"><i class="fas fa-sync"></i> {{$t("refresh")}}</button>
			</div>
		</div>
		<server v-for="s in server" :key="server.id" :server="s" ro="true"></server>
	</layout>
</template>

<script>
import axios from "axios";
import {layout, server, end} from "../components";

export default {
	components: {layout, server, end},
	data() {
		return {
			server: []
		};
	},
	mounted() {
		this.refreshList();
	},
	methods: {
		loadServer(refresh) {
			let timeout = 0;

			if(refresh) {
				this.server = [];
				timeout = 100;
			}

			setTimeout(() => {
				axios.get("/api/status")
				.then(r => {
					this.server = r.data;
				})
				.catch(() => {
					this.$store.commit("toast", this.$t("receive_server_list_error"))
				});
			}, timeout);
		},
		refreshList() {
			this.loadServer();
			setTimeout(() => {
				this.refreshList();
			}, 5000);
		}
	}
}
</script>

<i18n>
{
    "en": {
        "receive_server_list_error": "Error receiving server list.",
        "refresh": "Refresh",
        "title": "Server Status"
    },
    "zh": {
        "receive_server_list_error": "接收服务器列表错误。",
        "refresh": "刷新",
        "title": "服务状态"
    }
}
</i18n>
