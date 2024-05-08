<template>
	<layout small="true">
		<div class="title">
			<h1>{{$t("title")}}</h1>
		</div>
		<p>{{$t("message")}}</p>
	</layout>
</template>

<script>
import {layout, end} from "../components";

export default {
	components: {layout, end}
}
</script>

<i18n>
{
    "en": {
        "message": "Page not found.",
        "title": "#404"
    },
    "zh": {
        "message": "找不到网页。",
        "title": "#404"
    }
}
</i18n>
