<template>
  <div class="modalBackground">
    <div class="modal">
      <h1>Add Employee</h1>

      <form @submit.prevent="handleSubmit">
        <div class="form">
          <label>Name: </label>
          <input type="text" v-model="employee.name" />

          <label>Email: </label>
          <input type="email" v-model="employee.email" readonly />

          <label>Position</label>
          <input type="text" v-model="employee.position" />

          <label>Salary</label>
          <input type="number" v-model="employee.salary" />

          <label>Experience</label>
          <input type="number" v-model="employee.yearsOfExperience" />

          <label>Department name</label>
          <select v-model="selectedDepartmentId">
            <option value="-1">None</option>
            <option
              v-for="department in departments"
              :key="department.id"
              :value="department.id"
            >
              {{ department.name }}
            </option>
          </select>

          <label>Manager id</label>
          <select v-model="selectedManagerId">
            <option value="-1">None</option>
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
          <button type="submit" class="addButton">Update</button>
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
  props: ["employee"],

  setup(props, { emit }) {
    const employee = ref(props.employee);

    const departments = ref([]);
    const employees = ref([]);

    const selectedDepartmentId = ref(employee.value.department?.id);
    const selectedManagerId = ref(employee.value.manager?.id);

    const handleSubmit = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/employee/${employee.value.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: employee.value.name,
              id: employee.value.id,
              salary: employee.value.salary,
              email: employee.value.email,
              position: employee.value.position,
              yearsOfExperience: employee.value.yearsOfExperience,
              performanceRating: employee.value?.performanceRating,
              department: departments.value.find(
                (department) => department.id === selectedDepartmentId.value
              ),
              manager: employees.value.find(
                (employee) => employee.id === selectedManagerId.value
              ),
            }),
          }
        );

        if (response.ok) {
          alert("Employee updated successfully");
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
      employee,
      departments,
      employees,
      selectedDepartmentId,
      selectedManagerId,
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