<template>
  <q-layout>
    <q-header class="text-center" elevated style="background-color: black">
      <h4 class="q-py-md">SQL Code Converter</h4>
    </q-header>
    <inputComponent />
    <table-component />
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';
import inputComponent from '../components/inputComponent.vue';
import tableComponent from '../components/tableComponent.vue';
export default defineComponent({
  name: 'IndexPage',
  components: { inputComponent, tableComponent },
});
</script>
