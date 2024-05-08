<template>
    <collapsible :title="$t('title')" with-import="true" import-filename="bop.json" @load="setData">
        <entry v-for="entry in entries"
            :key="entry.index"
            :entry="entry"
            v-on:remove="removeEntry"></entry>
        <button v-on:click="addEntry">{{$t("add_entry_button")}}</button>
        <button v-on:click="clearEntries">{{$t("clear_entries_button")}}</button>
    </collapsible>
</template>

<script>
import collapsible from "../collapsible.vue";
import field from "../field.vue";
import selection from "../selection.vue";
import entry from "./bopsession.vue";

export default {
    components: {collapsible, field, selection, entry},
    data() {
    	return {
    		entryIndex: 0,
            entries: []
    	};
    },
    methods: {
        setData(data) {
            this.track = data.track;
            this.carModel = data.carModel;
            this.ballastKg = data.ballastKg;
            this.restrictor = data.restrictor;
            this.setEntryData(data.entries);
        },
        setEntryData(data) {
            for(let i = 0; i < data.length; i++) {
                this.entries.push({
                    index: this.entryIndex,
                    track: data[i].track,
                    carModel: data[i].carModel,
                    ballastKg: data[i].ballastKg,
                    restrictor: data[i].restrictor                    
                });
                this.entryIndex++;
            }
        },
    	getData() {
    		return {
				track: this.track,
				carModel: parseInt(this.carModel),
				ballastKg: parseInt(this.ballastKg),
				restrictor: parseInt(this.restrictor),				
                entries: this.getEntryData()
    		};
    	},
        getEntryData() {
            let entries = [];

            for(let i = 0; i < this.entries.length; i++) {
                entries.push({
                    track: this.entries[i].track,
                    carModel: parseInt(this.entries[i].carModel),
                    ballastKg: parseInt(this.entries[i].ballastKg),
					restrictor: parseInt(this.entries[i].restrictor)
                });
            }

            return entries;
        },
        addEntry() {
            this.entries.push({
                index: this.entryIndex,
                track: "",
                carModel: 99,
                ballastKg: 0,
                restrictor: 0
            });
            this.entryIndex++;
        },
        removeEntry(index) {
            index = parseInt(index);

            for(let i = 0; i < this.entries.length; i++) {
                if(this.entries[i].index === index) {
                    this.entries.splice(i, 1);
                    break;
                }
            }
        },
        toFloat(value) {
            if(typeof value === "string") {
                return parseFloat(value.replace(",", "."));
            }

            return value;
        },
        clearEntries(){
            if (!window.confirm(this.$t("confirm_clear_entries"))) {
                return;
            }
            while(this.entries.length > 0) {
                this.entries.splice(this.entries[this.entries.length - 1], 1);
            }
        }
    }
}
</script>

<i18n>
{
    "en": {
        "add_entry_button": "Add BOP",
        "ballast_label": "Ballast: 0 to 100kg max.",
        "carModel_label": "Car Model #",
        "clear_entries_button": "Clear all BOP",
        "confirm_clear_entries": "Do you really want to remove all BOP?",
        "restrictor_label": "Motor Restrictor: 0 to 20% max.",
        "title": "BOP Settings",
        "track_label": "Track"
    },
    "zh": {
        "add_entry_button": "添加 BOP",
        "ballast_label": "配重：（0 - 100kg）",
        "carModel_label": "汽车模型#",
        "clear_entries_button": "清除所有 BOP",
        "confirm_clear_entries": "您确实要删除所有 BOP 吗？",
        "restrictor_label": "发动机进气限制：最大 0 至 20%。",
        "title": "BOP 设置",
        "track_label": "赛道"
    }
}
</i18n>
