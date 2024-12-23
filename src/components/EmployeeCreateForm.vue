<template>
  <div class="modalBackground">
    <div class="modal">
      <h1>Add Employee</h1>

      <form @submit.prevent="handleSubmit">
        <div class="form">
          <label>Name: </label>
          <input type="text" v-model="name" required />

          <label>Email: </label>
          <input type="email" v-model="email" required />

          <label>Position</label>
          <input type="text" v-model="position" required />

          <label>Salary</label>
          <input type="number" v-model="salary" required />

          <label>Experience</label>
          <input type="number" v-model="yearsOfExperience" />

          <label>Performace Rating</label>
          <input type="number" v-model="performanceRating" />

          <label>Department name</label>
          <select v-model="selectedDepartmentID">
            <option
              v-for="department in departments"
              :key="department.id"
              :value="department.id"
            >
              {{ department.name }}
            </option>
          </select>

          <label>Manager id</label>
          <select v-model="selectedManagerID">
            <option
              v-for="employee in employees"
              :key="employee.id"
              :value="employee.id"
            >
              {{ employee.id }}
            </option>
          </select>
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
import { onMounted, ref } from "vue";

import fetchDepartments from "@/composables/fetchDepartments";
import fetchEmployees from "@/composables/fetchEmployees";

export default {
  emits: ["close"],
  setup(_, { emit }) {
    const name = ref("");
    const id = ref(0);
    const salary = ref(0);
    const email = ref("");
    const position = ref("");
    const yearsOfExperience = ref(0);
    const performanceRating = ref(0);

    const departments = ref([]);
    const employees = ref([]);

    const selectedDepartmentID = ref(-1);
    const selectedManagerID = ref(-1);

    const handleSubmit = async () => {
      try {
        const response = await fetch("http://localhost:8080/employee", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.value,
            id: id.value,
            salary: salary.value,
            email: email.value,
            position: position.value,
            yearsOfExperience: yearsOfExperience.value,
            performanceRating: performanceRating.value,
            department: departments.value.find(
              (department) => department.id === selectedDepartmentID.value
            ),
            manager: employees.value.find(
              (employee) => employee.id === selectedManagerID.value
            ),
          }),
        });

        if (response.ok) {
          alert("Employee created successfully");
          emit("close");
        } else {
          const errorMessage = await response.text();
          alert(errorMessage);
        }
      } catch (error) {
        console.error("Error: ", error);
        alert(error.message);
        emit("close");
      }
    };

    onMounted(async () => {
      try {
        const { fetchedDepartments, departmentError, loadDep } =
          fetchDepartments();
        await loadDep();

        if (departmentError.value) {
          throw new Error(departmentError.message);
        }

        departments.value = fetchedDepartments.value;
        const { fetchedEmployees, employeeError, loadEmp } = fetchEmployees();
        await loadEmp();

        if (employeeError.value) {
          throw new Error(employeeError.message);
        }

        employees.value = fetchedEmployees.value;
      } catch (error) {
        alert(error.message);
      }

      console.log(employees.value);
      console.log(departments.value);
    });

    return {
      handleSubmit,
      name,
      id,
      salary,
      email,
      position,
      yearsOfExperience,
      performanceRating,
      departments,
      employees,
      selectedDepartmentID,
      selectedManagerID,
    };
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