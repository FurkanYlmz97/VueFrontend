<template>
  <div class="modalBackground">
    <div class="modal">
      <h1>Add Department</h1>

      <form @submit.prevent="handleSubmit">
        <div class="form">
          <label>Department Name: </label>
          <input type="text" v-model="name" required />

          <label>Department ID</label>
          <input type="number" v-model="id" readonly />

          <label>Department Max Salary</label>
          <input type="number" v-model="maxSalary" required />
        </div>

        <div class="buttons">
          <button type="submit" class="addButton">Update</button>
          <button @click="$emit('close')" class="cancelButton">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  emits: ["close"],
  props: ["name", "id", "maxSalary"],
  setup(props, { emit }) {
    const name = ref(props.name);
    const id = ref(props.id);
    const maxSalary = ref(props.maxSalary);

    const handleSubmit = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/department/${id.value}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name.value,
              id: id.value,
              maxSalary: maxSalary.value,
            }),
          }
        );

        if (response.ok) {
          alert("Department updated successfully");
          emit("close");
        } else {
          const errorMessage = await response.text();
          alert(errorMessage);
        }
      } catch (error) {
        console.error("Error: ", error);
        alert("There was an error");
        emit("close");
      }
    };

    return { handleSubmit, name, id, maxSalary };
  },
};
</script>

<style>
</style>