const PROFFESION = document.getElementById('profession') 
const EXTRA_OPTIONS = document.getElementById('extraSelects')
const REGISTRATION_BUTTON = document.getElementById('registerBtn')
const FORM = document.getElementById('registrationForm')
const REGISTERED_CONTAINER = document.getElementById('registerd')

class Person {
    constructor(name, surname, dateOfBirth, cityOfLiving){
        this.name = name
        this.surname = surname
        this.dateOfBirth = dateOfBirth
        this.cityOfLiving = cityOfLiving
    }
}
class Driver extends Person{
    constructor(name, surname, dateOfBirth, cityOfLiving, carBrand, carModel, drivingExperience, licenseCategory, salary){
        super(name, surname, dateOfBirth, cityOfLiving)
        this.carBrand = carBrand
        this.carModel = carModel
        this.drivingExperience = drivingExperience
        this.licenseCategory = licenseCategory
        this.salary = salary
    }
}
class Doctor extends Person{
    constructor(name,surname, dateOfBirth, cityOfLiving, yearsOfExperience, specialization, university, educationDegree, salary){
        super(name, surname, dateOfBirth, cityOfLiving)
        this.yearsOfExperience = yearsOfExperience
        this.specialization = specialization
        this.university = university
        this.educationDegree = educationDegree
        this.salary = salary
    }   
}
class Teacher extends Person{
    constructor(name,surname, dateOfBirth, cityOfLiving, yearsOfExperience, schoolName, schoolEducationDegree, subject, salary){
        super(name, surname, dateOfBirth, cityOfLiving)
        this.yearsOfExperience = yearsOfExperience
        this.schoolName = schoolName
        this.schoolEducationDegree = schoolEducationDegree
        this.subject = subject
        this.salary = salary
    }   
}
class SalesPerson extends Person{
    constructor(name, surname, dateOfBirth, cityOfLiving, shopName, yearsInSales, salesTarget, salary){
        super(name, surname, dateOfBirth, cityOfLiving)
        this.shopName = shopName
        this.yearsInSales = yearsInSales
        this.salesTarget = salesTarget
        this.salary = salary
    }   
}

function showError(input, message) {
    input.classList.add("error");
    let errorMsg = input.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains("error-message")) {
        errorMsg.textContent = message;
    } else {
        errorMsg = document.createElement("div");
        errorMsg.classList.add("error-message");
        errorMsg.textContent = message;
        input.insertAdjacentElement("afterend", errorMsg);
    }
}
function clearError(input) {
    input.classList.remove("error");
    let errorMsg = input.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains("error-message")) {
        errorMsg.remove();
    }
}

function validateFields() {
    let isValid = true;
    const NAME = document.getElementById('firstName');
    const SURNAME = document.getElementById('lastName');
    const CITY = document.getElementById('city');
    const DOB = document.getElementById('DoB');
    const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ'-]+$/u;

    if (!nameRegex.test(NAME.value.trim()) || NAME.value.trim().length < 2) {
        showError(NAME, "Мінімум 2 букви, без цифр.");
        isValid = false;
    } else clearError(NAME);

    if (!nameRegex.test(SURNAME.value.trim()) || SURNAME.value.trim().length < 2) {
        showError(SURNAME, "Мінімум 2 букви, без цифр.");
        isValid = false;
    } else clearError(SURNAME);

    if (!nameRegex.test(CITY.value.trim()) || CITY.value.trim().length < 2) {
        showError(CITY, "Некоректна назва міста.");
        isValid = false;
    } else clearError(CITY);

    if (!DOB.value) {
        showError(DOB, "Оберіть дату народження.");
        isValid = false;
    } else clearError(DOB);

    const SALARY = document.getElementById('salary');
    if (SALARY && (isNaN(SALARY.value) || SALARY.value <= 0)) {
        showError(SALARY, "Зарплата має бути більше 0.");
        isValid = false;
    } else if (SALARY) clearError(SALARY);

    const EXP = document.getElementById('yearsOfExperience') || document.getElementById('drivingExperience') || document.getElementById('yearsInSales');
    if (EXP && (isNaN(EXP.value) || EXP.value < 0)) {
        showError(EXP, "Досвід не може бути від’ємним.");
        isValid = false;
    } else if (EXP) clearError(EXP);

    return isValid;
}

function saveToLocalStorage(person){
    let data = JSON.parse(localStorage.getItem("users")) || []
    data.push(person)
    localStorage.setItem("users", JSON.stringify(data))
}
function loadFromLocalStorage(){
    let data = JSON.parse(localStorage.getItem("users")) || []
    data.forEach(person => displayBlocks(person))
}

function fieldCreate(labelText, inputID, type='text'){
    const LABEL = document.createElement('label')
    LABEL.setAttribute('for', inputID)
    LABEL.textContent = labelText
    const INPUT = document.createElement('input')
    INPUT.type = type
    INPUT.id = inputID
    INPUT.required = true
    return [ LABEL, INPUT ]
}

function createFieldsForProfession(profession){
    EXTRA_OPTIONS.innerHTML = ''
    if (!profession) return

    const H4 = document.createElement('h4')
    H4.textContent = 'Додаткові поля для заповнення'
    EXTRA_OPTIONS.appendChild(H4)

    const DIV = document.createElement('div')
    DIV.classList.add('form-group', 'extras')

    let fields = []
    switch(profession) {
        case "Driver":
            fields = [
                ["Назва авто:", "carBrand", "text"],
                ["Модель авто:", "carModel", "text"],
                ["Досвід водіння (років):", "drivingExperience", "number"],
                ["Категорія прав:", "licenseCategory", "text"],
                ["Зарплата:", "salary", "number"]
            ];
            break;
        case "Doctor":
            fields = [
                ["Роки досвіду:", "yearsOfExperience", "number"],
                ["Спеціалізація:", "specialization", "text"],
                ["Університет:", "university", "text"],
                ["Ступінь освіти:", "educationDegree", "text"],
                ["Зарплата:", "salary", "number"]
            ];
            break;
        case "Teacher":
            fields = [
                ["Роки досвіду:", "yearsOfExperience", "number"],
                ["Назва школи:", "schoolName", "text"],
                ["Школа:", "schoolEducationDegree", "text"],
                ["Предмет викладання:", "subject", "text"],
                ["Зарплата:", "salary", "number"]
            ];
            break;
        case "SalesPerson":
            fields = [
                ["Назва магазину:", "shopName", "text"],
                ["Роки у торгівлі:", "yearsInSales", "number"],
                ["Ціль продажів:", "salesTarget", "text"],
                ["Зарплата:", "salary", "number"]
            ];
            break;
    }

    fields.forEach(([labelText, id, type]) =>{
        const [lbl, input] = fieldCreate(labelText, id, type)
        DIV.appendChild(lbl)
        DIV.appendChild(input)
    })

    EXTRA_OPTIONS.appendChild(DIV)
}

PROFFESION.addEventListener('change', () =>{
    createFieldsForProfession(PROFFESION.value)
})

REGISTRATION_BUTTON.addEventListener('click', (e) => {
    e.preventDefault()
    if (!validateFields()) return;

    const NAME = document.getElementById('firstName').value.trim()
    const SURNAME = document.getElementById('lastName').value.trim()
    const DOB = document.getElementById('DoB').value
    const CITY = document.getElementById('city').value.trim()
    const profession = PROFFESION.value

    let personOBJ
    switch(profession) {
        case "Driver":
            personOBJ = new Driver(NAME, SURNAME, DOB, CITY,
                document.getElementById('carBrand').value,
                document.getElementById('carModel').value,
                document.getElementById('drivingExperience').value,
                document.getElementById('licenseCategory').value,
                document.getElementById('salary').value )
            break;
        case "Doctor":
            personOBJ = new Doctor(NAME, SURNAME, DOB, CITY,
                document.getElementById('yearsOfExperience').value,
                document.getElementById('specialization').value,
                document.getElementById('university').value,
                document.getElementById('educationDegree').value,
                document.getElementById('salary').value )
            break;
        case "Teacher":
            personOBJ = new Teacher(NAME, SURNAME, DOB, CITY,
                document.getElementById('yearsOfExperience').value,
                document.getElementById('schoolName').value,
                document.getElementById('schoolEducationDegree').value,
                document.getElementById('subject').value,
                document.getElementById('salary').value )
            break;
        case "SalesPerson":
            personOBJ = new SalesPerson(NAME, SURNAME, DOB, CITY,
                document.getElementById('shopName').value,
                document.getElementById('yearsInSales').value,
                document.getElementById('salesTarget').value,
                document.getElementById('salary').value )
            break;
        default:
            return
    }

    personOBJ.profession = profession

    displayBlocks(personOBJ)
    saveToLocalStorage(personOBJ)
    FORM.reset()
    EXTRA_OPTIONS.innerHTML = ''
})

function displayBlocks(personOBJ){
    const USERDIV = document.createElement('div')
    USERDIV.classList.add('windowRegistered')

    const fields = [
        ["Ім'я", personOBJ.name],
        ["Прізвище", personOBJ.surname],
        ["Дата народження", personOBJ.dateOfBirth],
        ["Місто", personOBJ.cityOfLiving],
        ["Професія", personOBJ.profession]
    ]

    if (personOBJ.carBrand) {
        fields.push(["Назва авто", personOBJ.carBrand])
        fields.push(["Модель авто", personOBJ.carModel])
        fields.push(["Стаж водіння", personOBJ.drivingExperience])
        fields.push(["Категорія прав", personOBJ.licenseCategory])
        fields.push(["Зарплата", personOBJ.salary])
    }
    if (personOBJ.specialization) {
        fields.push(["Роки досвіду", personOBJ.yearsOfExperience])
        fields.push(["Спеціалізація", personOBJ.specialization])
        fields.push(["Університет", personOBJ.university])
        fields.push(["Ступінь освіти", personOBJ.educationDegree])
        fields.push(["Зарплата", personOBJ.salary])
    }
    if (personOBJ.subject) {
        fields.push(["Роки досвіду", personOBJ.yearsOfExperience])
        fields.push(["Назва школи", personOBJ.schoolName])
        fields.push(["Школа", personOBJ.schoolEducationDegree])
        fields.push(["Предмет викладання", personOBJ.subject])
        fields.push(["Зарплата", personOBJ.salary])
    }
    if (personOBJ.shopName) {
        fields.push(["Назва магазину", personOBJ.shopName])
        fields.push(["Роки у торгівлі", personOBJ.yearsInSales])
        fields.push(["Ціль продажів", personOBJ.salesTarget])
        fields.push(["Зарплата", personOBJ.salary])
    }

    fields.forEach(([label, value]) => {
        const p = document.createElement('p')
        p.textContent = `${label}: ${value}`
        USERDIV.appendChild(p)
    })

    REGISTERED_CONTAINER.appendChild(USERDIV)
}

window.addEventListener("DOMContentLoaded", loadFromLocalStorage)
