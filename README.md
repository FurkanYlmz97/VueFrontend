# Welcome to the Frontend Business API

Welcome to the Frontend of Business API, where it allows you to manage departments and employees within an organization.

To explore and interact with the API, after building and running the containers inside this repo, go to repo JavaSpringBootBackend and run the containers there with docker-compose as well.

**Business Rules for Departments:**
- A department can only be deleted if it exists. When deleting a department, all employees in that department will be disassociated from it (their department will be set to null).
- When increasing the maximum salary for a department, the new salary limit is added to the current maximum salary.

**Business Rules for Employees:**
- An employee can only be assigned to a department if their salary does not exceed the department's maximum salary.
- An employee can only be promoted if their new salary does not exceed the department's maximum salary and they have at least 2 years of experience.
- When an employee is deleted, they will be disassociated from their department, and any employees they manage will no longer have them as a manager.
- When adding an employee, if they have a department or manager not already existing in the database, they will be automatically created and saved.
