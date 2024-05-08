<template>
    <div class="server">
        <div>
            <div class="name">
                {{server.name}}
                <span v-if="is_ro">
                    <i class="fas fa-tv" v-if="server.pid" v-on:click="live" :title="$t('view_live')"></i>
                </span>
                <span v-if="!ro">
                    <i class="fas fa-cog" v-on:click="edit" :title="$t('change_config')"></i>
                    <i class="fas fa-terminal" v-on:click="logs" :title="$t('view_logs')"></i>
                    <i class="fas fa-copy" v-on:click="copyConfig" v-if="is_admin" :title="$t('copy_config')"></i>
                    <i class="fas fa-file-download" v-on:click="exportConfig" :title="$t('export_config')"></i>
                    <i class="fas fa-trash" v-on:click="deleteServer" v-if="is_admin" :title="$t('delete_server')"></i>
                </span>
            </div>
            <div class="info">
                <span v-if="server.pid">PID: {{server.pid}}</span>
                UDP: {{server.udpPort}} &bull;
                TCP: {{server.tcpPort}} &bull;
                {{$t("track")}}: {{server.track}}
                <span v-if="!ro">&bull; {{$t("configuration_directory")}}: {{server.id}}</span>
            </div>
            <div class="info state" v-if="server.pid">
                <b>{{$t("state")}}: </b>{{$t(server.serverState)}} &bull;
                <b>{{$t("number_of_drivers")}}: </b>{{formattedServerClientCount}} &bull;
                <b>{{$t("session")}}: </b>
                <span v-if="server.sessionType">{{server.sessionType}} ({{server.sessionPhase}}) - {{server.sessionRemaining}} min(s)</span>
                <span v-else>{{$t('not_detected')}}</span>
            </div>
        </div>
        <button class="start" v-on:click="start" v-if="is_mod && !ro && !server.pid">{{$t("start_server")}}</button>
        <button class="stop" v-on:click="stop" v-if="is_mod && !ro && server.pid">{{$t("stop_server")}}</button>
        <div class="online" v-if="ro && server.pid">{{$t("running")}}</div>
        <div class="offline" v-if="ro && !server.pid">{{$t("offline")}}</div>
    </div>
</template>

<style>
.state {
    margin-top: 10px;
}

.state b {
    color: #505050;
}
</style>

<script>
import axios from "axios";

export default {
    props: ["server", "ro"],
    computed: {
        formattedServerClientCount: function () {
            return this.server.serverState === 'not_registered' ? '-' : this.server.nrClients;
        }
    },
    methods: {
        edit() {
            this.$router.push(`/server?id=${this.server.id}`);
        },
        logs() {
            this.$router.push(`/logs?id=${this.server.id}`);
        },
        live() {
            this.$router.push(`/live?id=${this.server.id}`);
        },
        copyConfig() {
            axios.post(`/api/instance/${this.server.id}/clone`)
            .then(() => {
                this.$emit("copied");
            })
            .catch(e => {
                this.$store.commit("toast", this.$t("copy_server_error"))
            });
        },
        exportConfig() {
            let link = document.createElement("a");
            link.setAttribute("type", "hidden");
            link.href = `/api/instance/${this.server.id}/export?token=${this.$store.state.auth.token}`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        },
        deleteServer() {
            axios.delete(`/api/instance/${this.server.id}`)
            .then(() => {
                this.$emit("deleted");
            })
            .catch(e => {
                this.$store.commit("toast", this.$t("delete_server_error"))
            });
        },
        start() {
            axios.post(`/api/instance/${this.server.id}/start`)
            .then(() => {
                this.$emit("started");
            })
            .catch(e => {
                this.$store.commit("toast", this.$t("start_server_error", {error: e.response.data.error}))
            });
        },
        stop() {
            axios.post(`/api/instance/${this.server.id}/stop`)
            .then(() => {
                this.$emit("stopped");
            })
            .catch(e => {
                this.$store.commit("toast", this.$t("stop_server_error", {error: e.response.data.error}))
            });
        }
    }
}
</script>

<i18n>
{
    "en": {
        "change_config": "Change config",
        "configuration_directory": "Config dir",
        "copy_config": "Copy config",
        "copy_server_error": "Error copying server configuration.",
        "delete_server": "Delete server",
        "delete_server_error": "Error deleting server configuration.",
        "export_config": "Export config",
        "not_detected": "Not detected",
        "not_registered": "Waiting for events",
        "number_of_drivers": "Drivers",
        "offline": "Offline",
        "online": "Online",
        "running": "Running",
        "session": "Session",
        "start_server": "Start",
        "start_server_error": "Error starting server, please check the logs. ERROR: {error}",
        "starting": "Starting",
        "state": "State",
        "stop_server": "Stop",
        "stop_server_error": "Error stopping server. ERROR: {error}",
        "track": "Track",
        "view_live": "View live",
        "view_logs": "View logs"
    },
    "zh": {
        "change_config": "更改配置",
        "configuration_directory": "配置目录",
        "copy_config": "复制配置",
        "copy_server_error": "复制服务器配置时出错。",
        "delete_server": "删除服务器",
        "delete_server_error": "删除服务器配置时出错。",
        "export_config": "导出配置",
        "not_detected": "没有检测到",
        "not_registered": "等待事件",
        "number_of_drivers": "车手数量",
        "offline": "离线",
        "online": "在线",
        "running": "运行中",
        "session": "比赛",
        "start_server": "开始",
        "start_server_error": "启动服务器时出错，请检查日志。错误： {error}",
        "starting": "开始",
        "state": "状态",
        "stop_server": "停止",
        "stop_server_error": "停止服务器时出错。错误： {error}",
        "track": "赛道",
        "view_live": "查看直播",
        "view_logs": "查看日志"
    }
}
</i18n>
