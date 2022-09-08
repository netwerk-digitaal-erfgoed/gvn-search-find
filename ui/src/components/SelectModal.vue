<template>
	<div v-if="isVisible" class="modal-wrapper">
		<div class="modal-overlay"></div>
		<div class="modal-body">
			{{ isVisible }}
			<template
				v-for="(location, key) in locations"
        :key="key"
			>
				<button
					:class="{'selected': location.label === selected}"
				>
					{{ location.label }}
				</button>
				<template
					v-for="(sub, index) in location.sub"
					:key="index"
				>
					<button				
						@click="selectOption($event, sub)"
						class="subs"
						:class="{'selected': sub.label === selected}"
					>
						{{ sub.label }}
					</button>
					<template
						v-if="sub.label === selected"
					>
						<button
							v-for="subsub in sub.sub"
							:key="subsub"			
							:class="{'selected': subsub === selected}"
						>
							{{ subsub }}
						</button>
					</template>
				</template>
			</template>			
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	
	const props = defineProps({
    isVisible: Boolean
  });

	const locations = ref({
		'nederland': {
      label: 'Nederland',
      sub: [
        {
          label: 'Zuid-Holland',
					sub: [ 'Den Haag', 'Rotterdam', 'Schiedam' ]
        },
				{
          label: 'Noord-Holland',
					sub: [ 'Alkmaar', 'Den Helder', 'Haarlem', 'Amsterdam' ]
        },
				{
          label: 'Drenthe',
					sub: [ 'Assen', 'Emmen', 'Veenhuizen' ]
        }
      ]
    }
	});

	let selected = ref('Nederland');

	function selectOption(event: { preventDefault: () => void; }, sub: { label: string; }) {
    event.preventDefault();
    selected.value = sub.label;
  } 

</script>

<style scoped>
	.modal-wrapper {
		position: fixed;
		top: 0;
		left: 0;
	}

	.modal-overlay {
		background-color: rgba(0, 0, 0, 0.6);
		height: 100vw;
		width: 100vw;
		position: fixed;
		z-index: 0;	
	}
	.modal-body {
		background: #fff;
		position: absolute;
		top: calc(50vh - 150px);
		left: 25vw;
		width: 50vw;
		height: 300px;
		z-index: 1;
		padding: 2rem;
	}

	button {
		background: var(--color-button);
    font-size: 1rem;
    border: 0;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    text-transform: uppercase;
    margin-right: 1rem;
		margin-bottom: 1rem;
    cursor: pointer;
    box-shadow: 5px 10px #888888;
	}

	button.selected {
		background: #000;
		color: #fff;
	}

	button:not(.selected):hover {
    transition: box-shadow 0.2s;
    box-shadow: 5px 5px #888888;
  }

  button:not(.selected):hover {
    transform: scale(0.98);
    box-shadow: 5px 5px #888888;
  }
</style>