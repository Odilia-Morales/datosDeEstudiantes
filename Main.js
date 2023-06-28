import arregloStudents from './data/students.js';
const setGroup = (Student, group) => {
    const groups = {
        5: "Grupo A",
        4: "Grupo B",
        3: "Grupo C",
        2: "Grupo D",
        1: "Sin asignar",
    };

    const validGroup = groups[group];
    if (validGroup) {
        return {
            ...Student,
            group: validGroup
        };
    } else {
       // si el estudiante aun no tiene un grupo, se le asigna  "Nuevo"
       return {
        ...Student,
        group: "Desconocido"
       }; 
    };
};

const handleFormSubmit = (event) => {
    event.preventDefault ();

const alumno = {
    name: form.name.value,
    familyName: form.familyName.value,
    age: Number(form.age.value),
    clasification: form.clasification.value

};

if (validateAlumno(alumno)) {
  arregloStudents.push(setGroup(alumno, 1));
  updateStudentList();
  console.log(arregloStudents);
} else {
alert("Hay campos vacios, verificarlo");
event.stopPropagation();
}
};

const handleChangeGroup = () => {

const index = prompt('ingrese el indice de los estudiantes:','');
const Student = arregloStudents[index];
if (Student) {
    const newGroup = prompt('Ingrese el nuevo grupo:', '');
    if (newGroup >= 1 && newGroup <= 5) {
        arregloStudents[index] = setGroup(Student, Number(newGroup));

        updateStudentList();
            console.log(arregloStudents);
        } else {
            alert('Grupo inválido');
        }
    } else {
        alert('Índice inválido');
    }
};

const handleEditStudent = (event) => {
    const index = event.target.dataset.index;
    const Student = arregloStudents[index];
    const newName = prompt('Ingrese el nuevo nombre:', Student.name);
    const newFamilyName = prompt('Ingrese el nuevo apellido:', Student.familyName);
    const newAge = prompt('Ingrese la nueva edad:', Student.age);
    const newClasification = prompt('Ingrese la nueva clasificacion:', Student.clasification);
    
    if (newName && newFamilyName && newAge && newClasification) {
        arregloStudents[index] = {
            ...Student,
            name: newName,
            familyName: newFamilyName,
            age: Number(newAge),
            clasification: newClasification
        };

        updateStudentList();
        console.log(arregloStudents);
        }
};

const handleDeleteStudent = (event) => {
  const index = event.target.dataset.index;
  arregloStudents.splice(index, 1);

  updateStudentList();
  console.log(arregloStudents);
};

  const handleSortStudents = () => {
    selectionSort(arregloStudents);
    updateStudentList();
  };

  const handleFilterStudents = () => {
    const filterValue = StudentNameFilter.value.toLowerCase().trim();
    const filteredStudents = arregloStudents.filter((Student) =>
    Student.name.toLowerCase().includes(filterValue)
);

updateStudentList(filteredStudents);
};

const selectionSort = (array) => {
    const length = array.length;
    for (let i = 0; i < length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < length; j++) {
            if (array[j].name < array[minIndex].name) {
                minIndex = j;
    
        }
    }
    if (minIndex !== i) {
        swap(array, i, minIndex);
    }
}

};

const swap = (array, index1, index2) => {
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
};

const updateStudentList = (filteredStudents = arregloStudents) => {
    const StudentList = document.querySelector('#StudentList');
    StudentList.innerHTML = '';

    filteredStudents.forEach((Student, index) => {
        const row = `
        <tr>
            <td>${Student.name}</td>
            <td>${Student.familyName}</td>
            <td>${Student.age}</td>
            <td>${Student.clasification}</td>
            <td>${Student.group}</td>
            <td>
            <button type="button" class="btn btn-warning editBtn" data-index="${index}">Editar</button>
            <button type="button" class="btn btn-danger deleteBtn" data-index="${index}">Eliminar</button>  
            </td>
        </tr>
        `;

        StudentList.innerHTML += row;
    });

    const editButtons = document.querySelectorAll('.editBtn');
    const deleteButtons = document.querySelectorAll('.deleteBtn');

    editButtons.forEach((button) => {
        button.addEventListener('click', handleEditStudent);
    });

    deleteButtons.forEach((button) => {
        button.addEventListener('click', handleDeleteStudent);
    });
};

const validateAlumno = ({ name = "", familyName = "", age = 0, clasification = "" }) => name !== "" && familyName !== "" && age !== 0 && clasification !== ""; 
updateStudentList();

const form = document.querySelector('#alumnoRegistry');

form.addEventListener('submit', handleFormSubmit)


const changeGroupBtn = document.querySelector('#changeGroupBtn');
changeGroupBtn.addEventListener('click', handleChangeGroup);

const sortButton = document.querySelector('#orderButton');
sortButton.addEventListener('click', handleSortStudents);

const StudentNameFilter = document.querySelector('#StudentNameFilter');
StudentNameFilter.addEventListener('input', handleFilterStudents);






