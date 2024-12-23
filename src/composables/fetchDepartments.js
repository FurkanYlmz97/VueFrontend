import { ref } from "vue";


const fetchDepartments = () => {

    const fetchedDepartments = ref([])
    const departmentError = ref(null)

    const loadDep = async () => {

        try {
            const response = await fetch("http://localhost:8080/department");
            fetchedDepartments.value = await response.json();
        } catch (err) {
            departmentError.value = err
        }
    }

    return { fetchedDepartments, departmentError, loadDep }
};

export default fetchDepartments