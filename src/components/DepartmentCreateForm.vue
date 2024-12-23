<template>
  <div class="modalBackground">
    <div class="modal">
      <h1>Add Department</h1>

      <form @submit.prevent="handleSubmit">
        <div class="form">
          <label>Department Name: </label>
          <input type="text" v-model="name" required />

          <label>Department ID</label>
          <input type="number" v-model="id" required />

          <label>Department Max Salary</label>
          <input type="number" v-model="maxSalary" required />
        </div>

        <div class="buttons">
          <button type="submit" class="addButton">Add</button>
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
  setup(_, { emit }) {
    const name = ref("");
    const id = ref(0);
    const maxSalary = ref(0);

    const handleSubmit = async () => {
      try {
        const response = await fetch("http://localhost:8080/department", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.value,
            id: id.value,
            maxSalary: maxSalary.value,
          }),
        });

        if (response.ok) {
          alert("Department created successfully");
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
.modalBackground {
  width: 100vw;
  height: 100vh;
  background-color: rgb(212, 212, 212);
  /* position: fixed; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  margin-top: -400px;
  /* Adjust the modal slightly higher */
  width: 500px;
  /* height: 500px; */
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px;
}

.form label {
  font-size: medium;
  margin: 5px;
}

.form input {
  font-size: medium;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
}

.addButton {
  background-color: #4ebc4d;
  color: #ffffff;
  font-weight: bold;
  border-radius: 5px;
  margin: 5px;
  font-size: medium;
  padding: 5px;
}

.cancelButton {
  background-color: #b85454;
  color: #ffffff;
  font-weight: bold;
  border-radius: 5px;
  margin: 5px;
  font-size: medium;
  padding: 5px;
}
</style>