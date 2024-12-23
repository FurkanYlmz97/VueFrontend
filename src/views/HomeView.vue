<template>
  <div class="intro-page">
    <p>
      This project serves as a demonstration tool that enables the management of
      departments and employees within an organization. The backend is powered
      by Java Spring Boot, while the frontend utilizes Vue.js.
    </p>

    <p>
      The navigation bar above features three pages, and the user interface is
      intentionally designed to be straightforward for easy testing. Feel free
      to explore!
    </p>

    <h2>Available API Endpoints</h2>
    <p>
      In the
      <a
        href="http://localhost:8080/swagger-ui/index.html#/"
        class="swagger-link"
        >Swagger UI</a
      >, you will see a list of available endpoints categorized by controllers.
      Here are the key methods you can try out:
    </p>

    <h3>1. DepartmentController:</h3>
    <ul>
      <li>
        <strong>POST /department:</strong> Add a new department by providing the
        department's details in the request body.
      </li>
      <li>
        <strong>GET /department:</strong> Retrieve a list of all departments.
      </li>
      <li>
        <strong>GET /department/id:</strong> Get details of a specific
        department by its ID.
      </li>
      <li>
        <strong>PUT /department/id:</strong> Update the details of an existing
        department by its ID.
      </li>
      <li>
        <strong>DELETE /department/id:</strong> Delete a department by its ID.
        When a department is deleted, all employees associated with that
        department will have their department set to null.
      </li>
      <li>
        <strong>PATCH /department/id/increase-max-salary:</strong> Increase the
        maximum salary limit for a department.
      </li>
    </ul>

    <h3>Business Rules for Departments:</h3>
    <ol>
      <li>A department can only be deleted if it exists.</li>
      <li>
        When increasing the maximum salary for a department, the new salary
        limit is added to the current maximum salary.
      </li>
    </ol>

    <h3>2. EmployeeController:</h3>
    <ul>
      <li>
        <strong>POST /employee:</strong> Add a new employee by providing their
        details.
      </li>
      <li><strong>GET /employee:</strong> Retrieve a list of all employees.</li>
      <li>
        <strong>GET /employee/id:</strong> Get details of a specific employee.
      </li>
      <li>
        <strong>GET /employee/by-department</strong> Retrieve a list of
        employees within a specific department.
      </li>
      <li><strong>PUT /employee/id:</strong> Update employee details.</li>
      <li><strong>DELETE /employee/id:</strong> Delete an employee by ID.</li>
      <li><strong>PATCH /employee/id/promote:</strong> Promote an employee.</li>
      <li>
        <strong>PATCH /employee/employeeId/assign:</strong> Assign an employee
        to a department.
      </li>
      <li>
        <strong>PATCH /employee/employeeId/experience:</strong> Increase the
        experience of an employee by a specified number of years.
      </li>
    </ul>

    <h3>Business Rules for Employees:</h3>
    <ol>
      <li>
        An employee can only be assigned if their salary doesn't exceed the
        department's limit.
      </li>
      <li>
        Employees can be promoted if their salary doesn't exceed the
        department's maximum.
      </li>
      <li>
        When an employee is deleted, they are removed from the department.
      </li>
    </ol>

    <p>
      In the Swagger UI, you can expand each endpoint to view its details, fill
      in the necessary information, and execute it using the
      <span class="execute-button">Execute</span> button.
    </p>
    <p>
      Please provide valid data when testing the endpoints. Happy exploring!
    </p>
  </div>
</template>


<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
};
</script>

<style scoped>
.intro-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  color: #333;
}

.intro-page p {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.intro-page h2 {
  font-size: 1.8rem;
  margin-top: 30px;
  margin-bottom: 10px;
  color: #4a90e2;
}

.intro-page h3 {
  font-size: 1.4rem;
  margin-top: 20px;
  color: #333;
}

.intro-page ul {
  margin-left: 20px;
  margin-bottom: 20px;
}

.intro-page ul li {
  margin-bottom: 10px;
  font-size: 1rem;
}

.intro-page strong {
  color: #333;
  font-weight: bold;
}

.swagger-link {
  color: #4a90e2;
  text-decoration: none;
  font-weight: bold;
}

.swagger-link:hover {
  text-decoration: underline;
}

.execute-button {
  font-weight: bold;
  color: #fff;
  background-color: #4990e2;
  padding: 5px 10px;
  border-radius: 4px;
}

.execute-button:hover {
  background-color: #4990e27b;
}

@media (max-width: 768px) {
  .intro-page {
    padding: 15px;
    margin: 20px;
  }

  .intro-page h2 {
    font-size: 1.6rem;
  }

  .intro-page h3 {
    font-size: 1.2rem;
  }

  .swagger-link {
    font-size: 1rem;
  }
}
</style>
