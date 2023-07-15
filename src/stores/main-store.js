import { defineStore } from "pinia";
import collectionList from "./collections";
import { Notify } from "quasar";

export const useMainStore = defineStore("counter", {
  state: () => ({
    selectedData: [],
  }),
  actions: {
    getSingleOrAll(item, collection) {
      if (typeof item == "string") {
        const selected_collection = collectionList[collection];
        let mappedArr = [];
        if (selected_collection) {
          if (item == "*") {
            this.selectedData = selected_collection;
          } else {
            mappedArr = selected_collection
              .map((x) => {
                if (x[item]) {
                  let returnedObj = {};
                  returnedObj[item] = x[item];
                  return returnedObj;
                }
              })
              .filter((y) => {
                return y != undefined;
              });
            this.selectedData = mappedArr;
            if (this.selectedData.length < 1) {
              Notify.create({
                message: "No records found for given parameters",
                color: "red",
              });
            }
          }
        } else {
          Notify.create({
            message: "A collection of this name does not exist",
            color: "red",
          });
        }
      } else {
        this.getMultipleItemTypes(item, collection);
      }
    },
    // Separate function to get items if there are multiple keys
    getMultipleItemTypes(items, collection) {
      const selected_collection = collectionList[collection];
      if (!selected_collection) {
        Notify.create({
          message: "No collection found with these parameters",
          color: "red",
        });
        this.selectedData = [];
        return;
      }
      let mappedArr = selected_collection
        .map((x) => {
          let item = {};
          items.forEach((y) => {
            if (x[y]) {
              item[y] = x[y];
            }
          });
          if (Object.keys(item).length > 0) {
            return item;
          }
        })
        .filter((x) => {
          return x != undefined;
        });
      console.log(mappedArr);
      this.selectedData = mappedArr;
      if (this.selectedData.length < 1) {
        Notify.create({
          message: "No records found with these parameters",
          color: "red",
        });
        this.selectedData = [];
        return;
      } else {
        let errList = [];
        items.forEach((x) => {
          if (!this.selectedData[0][x]) {
            errList.push(x);
          }
        });
        if (errList.length > 0) {
          Notify.create({
            message: `The following keys were not found in this collection: ${errList.join(
              ", "
            )}`,
            color: "yellow",
            textColor: "black",
          });
        }
      }
    },
    getTopResults(num, params, collection) {
      var items = params.split(",");
      if (items.includes("from")) {
        Notify.create({
          message: "jj",
          color: "red",
        });
        return;
      }
      if (!collectionList[collection]) {
        Notify.create({
          message: "No collection found with these parameters",
          color: "red",
        });
        this.selectedData = [];
        return;
      } else {
        let mappedArr = [];
        var selected_collection = [...collectionList[collection]];
        if (selected_collection) {
          if (items.includes("*")) {
            this.selectedData = selected_collection;
          } else {
            selected_collection.slice(0, parseInt(num)).forEach((x, i) => {
              let returnedObj = {};
              items.forEach((item) => {
                debugger;
                if (x[item.toString().trim()] != undefined) {
                  returnedObj[item.toString().trim()] =
                    x[item.toString().trim()];
                }
              });

              mappedArr.push(returnedObj);
            });

            this.selectedData = mappedArr;
            debugger;
            console.log(this.selectedData);
            if (this.selectedData.length < 1) {
              Notify.create({
                message: "No records found for given parameters",
                color: "red",
              });
            }
            return;
          }
        } else {
          Notify.create({
            message: "A collection of this name does not exist",
            color: "red",
          });
          return;
        }
        if (selected_collection.length >= num) {
          selected_collection.length = num;
        } else {
          Notify.create({
            message: `There are only ${selected_collection.length} records in this collection`,
          });
        }

        this.selectedData = selected_collection;
      }
    },
  },
});
