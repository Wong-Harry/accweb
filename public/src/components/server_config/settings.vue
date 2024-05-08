<template>
    <collapsible :title="$t('title')" with-import="true" import-filename="settings.json" @load="setDataFile">
        <div class="pwd">
            <label v-if="!passwordIsEmpty"> {{ $t('password_label') }} </label>
            <input v-if="!passwordIsEmpty" class="form-input" type="password" v-model="password" v-bind:autocomplete="'new-password'" :disabled="passwordIsEmpty">
            <checkbox :label="$t('password_empty_label')" v-model="passwordIsEmpty"></checkbox>
        </div>
        <div class="pwd">
            <label v-if="!adminPasswordIsEmpty"> {{ $t('adminpassword_label') }} </label>
            <input v-if="!adminPasswordIsEmpty" class="form-input" type="password" v-model="adminPassword" v-bind:autocomplete="'new-password'" :disabled="adminPasswordIsEmpty">
            <checkbox :label="$t('adminpassword_empty_label')" v-model="adminPasswordIsEmpty"></checkbox>
        </div>
        <div class="pwd">
            <label v-if="!spectatorPasswordIsEmpty"> {{ $t('spectatorpassword_empty_label') }} </label>
            <input v-if="!spectatorPasswordIsEmpty" class="form-input" type="password" v-model="spectatorPassword" v-bind:autocomplete="'new-password'" :disabled="spectatorPasswordIsEmpty">
            <checkbox :label="$t('spectatorpassword_empty_label')" v-model="spectatorPasswordIsEmpty"></checkbox>
        </div>
        <div class="server-settings-container three-columns" style="margin-top: 1.0rem;">
            <field type="number" :label="$t('trackmedalsrequirement_label')" v-model="trackMedalsRequirement"></field>
            <field type="number" :label="$t('safetyratingrequirement_label')" v-model="safetyRatingRequirement"></field>
            <field type="number" :label="$t('racecraftratingrequirement_label')" v-model="racecraftRatingRequirement"></field>
        </div>
        <div class="server-settings-container two-columns">
            <field type="number" :label="$t('maxcarslots_label')" v-model="maxCarSlots"></field>
            <field type="number" :label="$t('ignorePrematureDisconnects_label')" v-model="ignorePrematureDisconnects"></field>
        </div>
        <checkbox :label="$t('dumpleaderboards_label')" v-model="dumpLeaderboards"></checkbox>
        <checkbox :label="$t('isracelocked_label')" v-model="isRaceLocked"></checkbox>
        <checkbox :label="$t('randomizetrackwhenempty_label')" v-model="randomizeTrackWhenEmpty"></checkbox>
        <checkbox :label="$t('allowautodq_label')" v-model="allowAutoDQ"></checkbox>

        <div class="server-settings-group">
            <selection :label="$t('cargroup_label')" :options="carGroups" v-model="carGroup"></selection>
        </div>

        <div class="server-settings-group">
            <selection :label="$t('formationlaptype_label')" :options="formationLapTypes" v-model="formationLapType"></selection>
            <checkbox :label="$t('shortformationlap_label')" v-model="shortFormationLap"></checkbox>
        </div>

        <field type="text" :label="$t('centralentrylistpath_label')" v-model="centralEntryListPath"></field>
        <checkbox :label="$t('dumpentrylist_label')" v-model="dumpEntryList"></checkbox>
    </collapsible>
</template>

<script>
import collapsible from "../collapsible.vue";
import field from "../field.vue";
import selection from "../selection.vue";
import checkbox from "../checkbox.vue";

export default {
    components: {collapsible, field, selection, checkbox},
    data() {
        return {
            password: "",
            passwordIsEmpty: true,
            adminPassword: "",
            adminPasswordIsEmpty: true,
            spectatorPassword: "",
            spectatorPasswordIsEmpty: true,
            trackMedalsRequirement: 0,
            safetyRatingRequirement: -1,
            racecraftRatingRequirement: -1,
            ignorePrematureDisconnects: 1,
            dumpLeaderboards: false,
            isRaceLocked: false,
            randomizeTrackWhenEmpty: false,
            maxCarSlots: 30,
            centralEntryListPath: "",
            shortFormationLap: false,
            allowAutoDQ: false,
            dumpEntryList: false,
            formationLapTypes: [
                {value: 0, label: "Old with limiter"},
                {value: 1, label: "Free No Limiter"},
                {value: 3, label: "New Position control and UI"},
            ],
            formationLapType: 3,
            carGroups: [
                {value: "FreeForAll", label: "Mode FreeForAll"},
                {value: "GT2", label: "Mode GT2"},
                {value: "GT3", label: "Mode GT3"},
                {value: "GT4", label: "Mode GT4"},
                {value: "GTC", label: "Mode GTC"},
                {value: "TCX", label: "Mode TCX"},
            ],
            carGroup: "FreeForAll"
        };
    },
    methods: {
        setData(data) {
            this.password = data.password;
            this.passwordIsEmpty = data.passwordIsEmpty;
            this.adminPassword = data.adminPassword;
            this.adminPasswordIsEmpty = data.adminPasswordIsEmpty;
            this.spectatorPassword = data.spectatorPassword;
            this.spectatorPasswordIsEmpty = data.spectatorPasswordIsEmpty;
            this.trackMedalsRequirement = data.trackMedalsRequirement;
            this.safetyRatingRequirement = data.safetyRatingRequirement;
            this.racecraftRatingRequirement = data.racecraftRatingRequirement;
            this.ignorePrematureDisconnects = data.ignorePrematureDisconnects;
            this.dumpLeaderboards = data.dumpLeaderboards;
            this.isRaceLocked = data.isRaceLocked;
            this.randomizeTrackWhenEmpty = data.randomizeTrackWhenEmpty;
            this.maxCarSlots = data.maxCarSlots;
            this.centralEntryListPath = data.centralEntryListPath;
            this.shortFormationLap = data.shortFormationLap;
            this.allowAutoDQ = data.allowAutoDQ;
            this.dumpEntryList = data.dumpEntryList;
            this.formationLapType = data.formationLapType;
            this.carGroup = data.carGroup;
        },
        setDataFile(data) {
            data.passwordIsEmpty = data.password === "";
            data.adminPasswordIsEmpty = data.adminPassword === "";
            data.spectatorPasswordIsEmpty = data.spectatorPasswordIsEmpty === "";

            this.setData(data);
        },
        getData() {
            return {
                password: this.password,
                passwordIsEmpty: this.passwordIsEmpty,
                adminPassword: this.adminPassword,
                adminPasswordIsEmpty: this.adminPasswordIsEmpty,
                spectatorPassword: this.spectatorPassword,
                spectatorPasswordIsEmpty: this.spectatorPasswordIsEmpty,
                trackMedalsRequirement: parseInt(this.trackMedalsRequirement),
                safetyRatingRequirement: parseInt(this.safetyRatingRequirement),
                racecraftRatingRequirement: parseInt(this.racecraftRatingRequirement),
                ignorePrematureDisconnects: parseInt(this.ignorePrematureDisconnects),
                dumpLeaderboards: this.dumpLeaderboards ? 1 : 0,
                isRaceLocked: this.isRaceLocked ? 1 : 0,
                randomizeTrackWhenEmpty: this.randomizeTrackWhenEmpty ? 1 : 0,
                maxCarSlots: parseInt(this.maxCarSlots),
                centralEntryListPath: this.centralEntryListPath,
                shortFormationLap: this.shortFormationLap ? 1 : 0,
                allowAutoDQ: this.allowAutoDQ ? 1 : 0,
                dumpEntryList: this.dumpEntryList ? 1 : 0,
                formationLapType: parseInt(this.formationLapType),
                carGroup: this.carGroup
            };
        }
    }
}
</script>

<i18n>
{
    "en": {
        "adminpassword_empty_label": "Admin password is Empty",
        "adminpassword_label": "Admin password (leave empty to not update)",
        "allowautodq_label": "Allow Auto DQ",
        "cargroup_label": "Car Group",
        "centralentrylistpath_label": "Path to the central entrylist.json file - Do not put entrylist.json at the end of the path !",
        "dumpentrylist_label": "Dump Entry List",
        "dumpleaderboards_label": "Dump Leaderboards",
        "formationlaptype_label": "Formation Lap Type",
        "ignorePrematureDisconnects_label": "Ignore Premature Disconnects (set to 0 on Linux)",
        "isracelocked_label": "Is Race Locked",
        "maxcarslots_label": "Max Car Slots",
        "password_empty_label": "Password is Empty",
        "password_label": "Password (leave empty to not update)",
        "racecraftratingrequirement_label": "Racecraft Training Requirement (-1 - 99)",
        "randomizetrackwhenempty_label": "Randomize Track When Empty",
        "safetyratingrequirement_label": "Safety rating requirement (-1 - 99)",
        "shortformationlap_label": "Short Formation Lap",
        "spectatorpassword_empty_label": "Spectator password is Empty",
        "spectatorpassword_label": "Spectator Password (leave empty to not update)",
        "title": "Server settings",
        "trackmedalsrequirement_label": "Track medals requirement (-1 - 3)"
    },
    "zh": {
        "adminpassword_empty_label": "管理员密码为空",
        "adminpassword_label": "管理员密码（留空则不更新）",
        "allowautodq_label": "允许自动 DQ（取消资格）",
        "cargroup_label": "车组",
        "centralentrylistpath_label": "",
        "dumpentrylist_label": "",
        "dumpleaderboards_label": "",
        "formationlaptype_label": "编队圈类型",
        "ignorePrematureDisconnects_label": "忽略过早断开连接（在 Linux 上设置为 0）",
        "isracelocked_label": "比赛是否锁定",
        "maxcarslots_label": "最大车位数量",
        "password_empty_label": "密码为空",
        "password_label": "密码（留空则不更新）",
        "racecraftratingrequirement_label": "赛车训练要求 (-1 - 99)",
        "randomizetrackwhenempty_label": "",
        "safetyratingrequirement_label": "安全等级要求 (-1 - 99)",
        "shortformationlap_label": "短编队圈",
        "spectatorpassword_empty_label": "观众密码为空",
        "spectatorpassword_label": "观众密码（留空则不更新）",
        "title": "服务器设置",
        "trackmedalsrequirement_label": "赛道奖牌要求 (-1 - 3)"
    }
}
</i18n>
