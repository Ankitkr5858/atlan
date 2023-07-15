<template>
  <q-page-container>
    <div class="q-px-lg" v-if="sqlResult.length > 0">
      <q-table :rows="sqlResult" rounded dark row-key="name" />
    </div>
    <div class="text-center" v-else>No Records Available.</div>
  </q-page-container>
</template>

<script>
import { defineComponent } from "vue";

// Getting and initializing store
import { useMainStore } from "../stores/main-store.js";
const mainStore = useMainStore();

export default defineComponent({
  computed: {
    sqlResult() {
      if (mainStore?.selectedData) {
        console.log(mainStore.selectedData);
        return mainStore.selectedData;
      } else {
        return [];
      }
    },
  },
});
</script>

<style></style>
