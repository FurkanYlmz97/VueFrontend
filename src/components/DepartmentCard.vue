<template>
  <div class="DepartmentCardlet">
    <h1>{{ title }}</h1>

    <ul>
      <li>
        Department ID: <b>{{ ID }}</b>
      </li>
      <li>
        Max Salary: <b>{{ maxSalary }}</b>
      </li>
    </ul>

    <ul>
      <button
        class="buttonUpdate"
        @click="$emit('update', { name: title, id: ID, maxSalary: maxSalary })"
      >
        Update
      </button>
      <button class="buttonDelete" @click="$emit('delete', ID)">Delete</button>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["title", "ID", "maxSalary"],
  setup() {
    return {};
  },
};
</script>

<style>
.DepartmentCardlet {
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