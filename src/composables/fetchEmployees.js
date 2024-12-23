import { ref } from "vue";


const fetchEmployees = () => {

    const fetchedEmployees = ref([])
    const employeeError = ref(null)

    const loadEmp = async () => {

        try {
            const response = await fetch("http://localhost:8080/employee");
            fetchedEmployees.value = await response.json();
        } catch (err) {
            employeeError.value = err
        }
    }

    return { fetchedEmployees, employeeError, loadEmp }
};

export default fetchEmployees