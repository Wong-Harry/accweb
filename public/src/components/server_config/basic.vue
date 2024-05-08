<template>
    <collapsible :title="$t('title')" with-import="true" import-filename="configuration.json" @load="setData">
        <div class="server-settings-container two-columns">
            <field type="number" :label="$t('udp_label')" v-model="udpPort"></field>
            <field type="number" :label="$t('tcp_label')" v-model="tcpPort"></field>
        </div>
        <div class="server-settings-container two-columns">
            <field type="number" :label="$t('maxconnections_label')" v-model="maxConnections"></field>
            <field :label="$t('publicip_label')" v-model="publicIP"></field>
        </div>
        <checkbox :label="$t('registertolobby_label')" v-model="registerToLobby"></checkbox>
        <checkbox :label="$t('landiscovery_label')" v-model="lanDiscovery"></checkbox>
    </collapsible>
</template>

<script>
import collapsible from "../collapsible.vue";
import field from "../field.vue";
import checkbox from "../checkbox.vue";

export default {
    components: {collapsible, field, checkbox},
    data() {
        return {
            udpPort: 9600,
            tcpPort: 9600,
            maxConnections: 10,
            registerToLobby: true,
            lanDiscovery: false,
            publicIP: ""
        };
    },
    methods: {
        setData(data) {
            this.udpPort = data.udpPort;
            this.tcpPort = data.tcpPort;
            this.maxConnections = data.maxConnections;
            this.registerToLobby = data.registerToLobby;
            this.lanDiscovery = data.lanDiscovery;
            this.publicIP = data.publicIP;
        },
        getData() {
            return {
                udpPort: parseInt(this.udpPort),
                tcpPort: parseInt(this.tcpPort),
                maxConnections: parseInt(this.maxConnections),
                registerToLobby: this.registerToLobby ? 1 : 0,
                lanDiscovery: this.lanDiscovery ? 1 : 0,
                publicIP: this.publicIP
            };
        }
    }
}
</script>

<i18n>
{
    "en": {
        "landiscovery_label": "LAN Discovery",
        "maxconnections_label": "Max. connections",
        "publicip_label": "Public IP",
        "registertolobby_label": "Register to lobby",
        "tcp_label": "TCP port",
        "title": "Basic configuration",
        "udp_label": "UDP port"
    },
    "zh": {
        "landiscovery_label": "局域网发现",
        "maxconnections_label": "最大连接数",
        "publicip_label": "公共 IP",
        "registertolobby_label": "注册大厅",
        "tcp_label": "TCP 端口",
        "title": "基本配置",
        "udp_label": "UDP 端口"
    }
}
</i18n>
