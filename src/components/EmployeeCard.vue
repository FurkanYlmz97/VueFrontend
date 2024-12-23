<template>
  <div class="EmployeeCardlet">
    <h1>{{ name }}</h1>

    <ul>
      <li>
        Employee id: <b>{{ id }}</b>
      </li>
      <li>
        Email: <b>{{ email }}</b>
      </li>
      <li>
        Position: <b>{{ position }}</b>
      </li>
      <li>
        Salary: <b>{{ salary }} $</b>
      </li>
      <li>
        Experience: <b>{{ yearsOfExperience }} years</b>
      </li>
      <li v-if="department">
        Department: <b>{{ department }}</b>
      </li>
      <li v-if="manager">
        Manager id: <b>{{ manager }}</b>
      </li>
    </ul>

    <ul>
      <button class="buttonUpdate" @click="$emit('update', id)">Update</button>
      <button class="buttonDelete" @click="$emit('delete', id)">Delete</button>
    </ul>
  </div>
</template>

<script>
export default {
  props: [
    "name",
    "id",
    "email",
    "position",
    "salary",
    "yearsOfExperience",
    "department",
    "manager",
  ],
  setup() {
    return {};
  },
};
</script>

<style>
.EmployeeCardlet {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background-color: #cccccc;
  border-radius: 40px;
  margin: 20px;
  padding: 20px;
  width: auto;
  /* This ensures the element only takes the space it needs */
  max-width: fit-content;
  /* Allows it to shrink to fit content */
}

ul {
  list-style-type: none;
  /* Removes the bullet points */
  padding: 10px;
  /* Removes default padding (optional) */
  margin: 0;
  /* Removes default margin (optional) */
}

.buttonUpdate {
  background-color: #636bfe;
  color: #ffffff;
  font-weight: bold;
  border-radius: 5px;
  margin: 3px;
  font-size: small;
  padding: 3px;
}

.buttonDelete {
  background-color: #b85454;
  color: #ffffff;
  font-weight: bold;
  border-radius: 5px;
  margin: 3px;
  font-size: small;
  padding: 3px;
}
</style>