<template>
  <div v-if="loading">Loading...</div>

  <DepartmentCreateForm
    v-else-if="createFormOpen"
    @close="closeCreateForm"
  ></DepartmentCreateForm>

  <DepartmentUpdateForm
    v-else-if="updateFormOpen"
    @close="closeUpdateForm"
    :name="updateFormInfo.name"
    :id="updateFormInfo.id"
    :maxSalary="updateFormInfo.maxSalary"
  >
  </DepartmentUpdateForm>

  <div v-else>
    <div className="buttons">
      <button className="buttons-update" @click="fetchDepartments">
        Update List
      </button>
      <button className="buttons-add" @click="openCreateForm">
        Add Department
      </button>
    </div>

    <DepartmentCard
      v-for="department in departments"
      :key="department.id"
      :title="department.name"
      :maxSalary="department.maxSalary"
      :ID="department.id"
      @update="openUpdateForm"
      @delete="deleteDepartment"
    />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import DepartmentCard from "../components/DepartmentCard.vue";
import DepartmentCreateForm from "../components/DepartmentCreateForm.vue";
import DepartmentUpdateForm from "@/components/DepartmentUpdateForm.vue";

export default {
  components: { DepartmentCard, DepartmentCreateForm, DepartmentUpdateForm },
  setup() {
    const departments = ref([]);
    const loading = ref(false);
    const createFormOpen = ref(false);
    const updateFormOpen = ref(false);
    const updateFormInfo = ref({ name: "", id: 0, maxSalary: 0 });

    const fetchDepartments = async () => {
      try {
        loading.value = true;
        const response = await fetch("http://localhost:8080/department");
        departments.value = await response.json();
        loading.value = false;
      } catch (error) {
        console.error("Error fetching departments:", error.message);
        loading.value = false;
      }
    };

    const deleteDepartment = async (id) => {
      try {
        const response = await fetch(`http://localhost:8080/department/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchDepartments();
          alert("Department deleted successfully.");
        } else {
          alert("Failed to delete the department.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting the department.");
      }
    };

    const openCreateForm = () => {
      createFormOpen.value = true;
    };

    const closeCreateForm = () => {
      createFormOpen.value = false;
      fetchDepartments();
    };

    const openUpdateForm = (info) => {
      updateFormOpen.value = true;
      updateFormInfo.value.name = info.name;
      updateFormInfo.value.id = info.id;
      updateFormInfo.value.maxSalary = info.maxSalary;
    };

    const closeUpdateForm = () => {
      updateFormOpen.value = false;
      fetchDepartments();
    };

    onMounted(() => {
      fetchDepartments();
    });

    return {
      departments,
      loading,
      fetchDepartments,
      openCreateForm,
      closeCreateForm,
      openUpdateForm,
      closeUpdateForm,
      deleteDepartment,
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