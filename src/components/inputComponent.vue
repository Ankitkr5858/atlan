<template>
  <q-page-container class="q-pb-lg input-component">
    <div class="q-px-lg">
      <q-input
        label="Write Some SQL Code"
        label-color="black"
        class="q-mt-lg"
        color="black"
        type="text"
        filled
        v-model="code"
      />
    </div>
    <div class="flex justify-center q-mt-lg">
      <q-btn no-caps rounded color="black" @click="getResults">Run Code</q-btn>
    </div>
    <div class="flex justify-center q-mt-lg">
      <q-btn
        no-caps
        icon="help"
        color="secondary"
        @click="showDialog = true"
        flat
        >Help</q-btn
      >
    </div>
  </q-page-container>
  <q-dialog v-model="showDialog">
    <q-card>
      <q-card-section class="flex justify-center" style="font-size: 50px">
        <q-icon color="secondary" name="help"></q-icon>
      </q-card-section>
      <q-card-section class="q-px-lg">
        <div>
          <h4>Available Commands:</h4>
        </div>
        <div
          class="bg-grey q-px-lg q-py-lg q-mt-md"
          style="font-style: italic; color: #333"
        >
          <p>SELECT * FROM COLLECTION</p>
          <p>SELECT item FROM COLLECTION</p>
          <p>SELECT item1, item2 FROM COLLECTION</p>
          <p>SELECT TOP 10 FROM COLLECTION</p>
        </div>
      </q-card-section>
      <q-card-section class="q-px-lg">
        <div class="text-center">
          <span>
            These are the three avaialable collections, stored locally as JSON
            files and next to them are the different keys available in them.
            <br />
            <b>Have fun!</b>
          </span>
        </div>

        <div class="q-py-lg">
          <h6>TASKS:</h6>
          <span>userId, id, title, completed</span>
        </div>
        <div class="q-py-lg">
          <h6>POSTS:</h6>
          <span>userId, id, title, completed</span>
        </div>
        <div class="q-py-lg">
          <h6>COUNTRIES:</h6>
          <span>name, code</span>
        </div>
        <div class="q-py-lg">
          <h6>CITIES:</h6>
          <span>country, geonameid, name, subcountry</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Close" color="secondary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";

// Getting pinia store and initializing it
import { useMainStore } from "../stores/main-store.js";
const mainStore = useMainStore();

export default defineComponent({
  name: "inputComponent",
  data() {
    return {
      code: "",
      showDialog: false,
    };
  },
  methods: {
    getResults() {
      const code = this.code.split(" ").filter((x) => {
        return x != "";
      });

      if (this.code.toLowerCase().includes("top")) {
        const num = parseInt(code[2]);
        const params = this.code
          .split("top")[1]
          .split("from")[0]
          .substring(3, this.code.split("top")[1].split("from")[0].length - 1);

        const collection = code[code.length - 1].toLowerCase();
        mainStore.getTopResults(num, params, collection);
        return;
      }
      if (
        !this.code.toLowerCase().includes("select") &&
        !this.code.toLowerCase().includes("from")
      ) {
        this.$q.notify({
          message: "Please check your code format",
          color: "red",
        });
        return;
      }
      code.splice(code.length - 2, 1);
      code.splice(0, 1);
      var finalData = code.map((x) => {
        return x.replaceAll(",", "");
      });

      // Sending collection name and item name to store for function
      const collection = finalData[finalData.length - 1].toLowerCase();
      finalData.splice(finalData.length - 1, 1);
      if (finalData.length === 1) {
        finalData = finalData[0];
      }
      mainStore.getSingleOrAll(finalData, collection);
    },
  },
});
</script>
