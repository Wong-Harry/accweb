<template>
    <div class="box">
        <h2>{{$t(resolveSessionType(session.sessionType))}}</h2>
        <div class="server-settings-container four-columns">
            <field type="number" :label="$t('hourofday_label')" v-model="session.hourOfDay"></field>
            <field type="number" :label="$t('dayofweekend_label')" v-model="session.dayOfWeekend"></field>
            <field type="number" :label="$t('sessiondurationminutes_label')" v-model="session.sessionDurationMinutes"></field>
            <field type="number" :label="$t('timemultiplier_label')" v-model="session.timeMultiplier"></field>
        </div>
        <selection :label="$t('type_label')" :options="types" v-model="session.sessionType"></selection>
        <button v-on:click="$emit('remove', session.index)"><i class="fas fa-ban"></i> {{$t("remove_button")}}</button>
    </div>
</template>

<script>
import field from "../field.vue";
import selection from "../selection.vue";

export default {
    components: {field, selection},
    props: ["session"],
    data() {
    	  return {
            types: [
                {value: "P", label: "Practice"},
                {value: "Q", label: "Qualifying"},
                {value: "R", label: "Race"}
            ]
    	  };
    },
    methods: {
        resolveSessionType(key) {
            const type = this.types.find(type => type.value === key);

            if (type === undefined) {
                return key;
            }

            return type.label;
        }
    }
}
</script>

<i18n>
{
    "en": {
        "Practice": "Practice",
        "Qualifying": "Qualifying",
        "Race": "Race",
        "dayofweekend_label": "Day of weekend",
        "hourofday_label": "Hour of day",
        "remove_button": "Remove session",
        "sessiondurationminutes_label": "Session duration minutes",
        "timemultiplier_label": "Time multiplier",
        "type_label": "Type"
    },
    "zh": {
        "Practice": "周末的哪一天",
        "Qualifying": "一天中的小时",
        "Race": "练习赛",
        "dayofweekend_label": "排位赛",
        "hourofday_label": "正赛",
        "remove_button": "删除比赛",
        "sessiondurationminutes_label": "比赛持续时间（分钟）",
        "timemultiplier_label": "时间速率",
        "type_label": "类型"
    }
}
</i18n>
