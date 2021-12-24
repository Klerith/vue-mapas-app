<template>
 
    <MapView />

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePlacesStore } from '@/composables';

import MapView from '@/components/mapview/MapView.vue';

export default defineComponent({
  name: 'Home',
  components: { MapView },
  setup() {

    usePlacesStore();
  
  }
});
</script>
