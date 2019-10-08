<template>
	<div>
		<tech-list :list="$options.daily">
			<template>
				What I know and use <span class="accent-color">daily</span>:
			</template>
		</tech-list>
		<tech-list :list="$options.using">
			<template>
				What I use but not <span class="accent-color">that</span> proficient in:
			</template>
		</tech-list>
	</div>
</template>

<script>
import { daily, using } from '../utils/data.js';
import TechList from './TechList';

export default {
	daily,
	using,
	components: {
		TechList
	}
};
</script>

<style lang="postcss"></style>
