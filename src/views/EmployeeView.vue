<template>
  <div v-if="loading">Loading...</div>

  <EmployeeCreateForm
    v-else-if="createFormOpen"
    @close="closeCreateForm"
  ></EmployeeCreateForm>

  <EmployeeUpdateForm
    v-else-if="updateFormOpen"
    @close="closeUpdateForm"
    :employee="updateFormInfo"
  >
  </EmployeeUpdateForm>

  <div v-else>
    <div className="buttons">
      <button className="buttons-update" @click="fetchEmployees">
        Update List
      </button>
      <button className="buttons-add" @click="openCreateForm">
        Add Employee
      </button>
    </div>

    <EmployeeCard
      v-for="employee in employees"
      :key="employee.id"
      :name="employee.name"
      :id="employee.id"
      :email="employee.email"
      :position="employee.position"
      :salary="employee.salary"
      :yearsOfExperience="employee.yearsOfExperience"
      :department="employee.department?.name"
      :manager="employee.manager?.id"
      @update="openUpdateForm"
      @delete="deleteEmployee"
    />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import EmployeeCard from "../components/EmployeeCard.vue";
import EmployeeCreateForm from "../components/EmployeeCreateForm.vue";
import EmployeeUpdateForm from "@/components/EmployeeUpdateForm.vue";

export default {
  components: { EmployeeCard, EmployeeCreateForm, EmployeeUpdateForm },
  setup() {
    const employees = ref([]);
    const loading = ref(false);
    const createFormOpen = ref(false);
    const updateFormOpen = ref(false);
    const updateFormInfo = ref(null);

    const fetchEmployees = async () => {
      try {
        loading.value = true;
        const response = await fetch("http://localhost:8080/employee");
        employees.value = await response.json();
        loading.value = false;
      } catch (error) {
        console.error("Error fetching employees:", error.message);
        loading.value = false;
      }
    };

    const deleteEmployee = async (id) => {
      try {
        const response = await fetch(`http://localhost:8080/employee/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchEmployees();
          alert("Employee deleted successfully.");
        } else {
          alert("Failed to delete the employee.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting the employee.");
      }
    };

    const openCreateForm = () => {
      createFormOpen.value = true;
    };

    const closeCreateForm = () => {
      createFormOpen.value = false;
      fetchEmployees();
    };

    const openUpdateForm = (id) => {
      updateFormOpen.value = true;
      updateFormInfo.value = employees.value.find(
        (employee) => employee.id === id
      );
    };

    const closeUpdateForm = () => {
      updateFormOpen.value = false;
      fetchEmployees();
    };

    onMounted(() => {
      fetchEmployees();
    });

    return {
      employees,
      loading,
      fetchEmployees,
      openCreateForm,
      closeCreateForm,
      openUpdateForm,
      closeUpdateForm,
      deleteEmployee,
      createFormOpen,
      updateFormOpen,
      updateFormInfo,
    };
  },
};
</script>

<style>
.buttons-update {
  background-color: #636bfe;
  color: #ffffff;
  font-weight: bold;
  border-radius: 10px;
  margin: 20px;
  font-size: x-large;
  padding: 10px;
}

.buttons-add {
  background-color: #54b854;
  color: #ffffff;
  font-weight: bold;
  border-radius: 10px;
  margin: 20px;
  font-size: x-large;
  padding: 10px;
}
</style>