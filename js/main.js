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

    const H4 = document.createElement('h4')
    H4.textContent = 'Додаткові поля для заповнення'
    EXTRA_OPTIONS.appendChild(H4)

    const DIV = document.createElement('div')
    DIV.classList.add('form-group', 'extras')

    let fields = []

    switch(profession) {
    case "Driver":
        fields = [
            ["Ім'я авто:", "carBrand", "text"],
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
            ["Школа (Junior, Middle, High School):", "schoolEducationDegree", "text"],
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
    case '':
        H4.remove()
        break
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

    const NAME = document.getElementById('firstName').value
    const SURNAME = document.getElementById('lastName').value
    const DOB = document.getElementById('DoB').value
    const CITY = document.getElementById('city').value
    const profession = PROFFESION.value

    let personOBJ
    
    switch(profession) {
        case "Driver":
            const carBrand = document.getElementById('carBrand').value
            const carModel = document.getElementById('carModel').value
            const drivingExperience = document.getElementById('drivingExperience').value
            const licenseCategory = document.getElementById('licenseCategory').value
            const salaryDriver = document.getElementById('salary').value
            personOBJ = new Driver(NAME, SURNAME, DOB, CITY, carBrand, carModel, drivingExperience, licenseCategory, salaryDriver)
            break;

        case "Doctor":
            const yearsOfExperienceDoctor = document.getElementById('yearsOfExperience').value
            const specialization = document.getElementById('specialization').value
            const university = document.getElementById('university').value
            const educationDegree = document.getElementById('educationDegree').value
            const salaryDoctor = document.getElementById('salary').value;
            personOBJ = new Doctor(NAME, SURNAME, DOB, CITY, yearsOfExperienceDoctor, specialization, university, educationDegree, salaryDoctor)
            break;

        case "Teacher":
            const yearsOfExperienceTeacher = document.getElementById('yearsOfExperience').value
            const schoolName = document.getElementById('schoolName').value
            const schoolEducationDegree = document.getElementById('schoolEducationDegree').value
            const subject = document.getElementById('subject').value
            const salaryTeacher = document.getElementById('salary').value
            personOBJ = new Teacher(NAME, SURNAME, DOB, CITY, yearsOfExperienceTeacher, schoolName, schoolEducationDegree, subject, salaryTeacher)
            break;

        case "SalesPerson":
            const shopName = document.getElementById('shopName').value
            const yearsInSales = document.getElementById('yearsInSales').value
            const salesTarget = document.getElementById('salesTarget').value
            const salarySales = document.getElementById('salary').value
            personOBJ = new SalesPerson(NAME, SURNAME, DOB, CITY, shopName, yearsInSales, salesTarget, salarySales)
            break;
    }

    displayBlocks(personOBJ)

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
        ["Професія", personOBJ.constructor.name]
    ]

     switch(personOBJ.constructor.name) {
        case "Driver":
            fields.push(["Назва авто", personOBJ.carBrand])
            fields.push(["Модель авто", personOBJ.carModel])
            fields.push(["Стаж водіння", personOBJ.drivingExperience])
            fields.push(["Категорія прав", personOBJ.licenseCategory])
            fields.push(["Зарплата", personOBJ.salary])
            break;

        case "Doctor":
            fields.push(["Роки досвіду", personOBJ.yearsOfExperience])
            fields.push(["Спеціалізація", personOBJ.specialization])
            fields.push(["Університет", personOBJ.university])
            fields.push(["Ступінь освіти", personOBJ.educationDegree])
            fields.push(["Зарплата", personOBJ.salary])
            break;

        case "Teacher":
            fields.push(["Роки досвіду", personOBJ.yearsOfExperience])
            fields.push(["Назва школи", personOBJ.schoolName])
            fields.push(["Школа", personOBJ.schoolEducationDegree])
            fields.push(["Предмет викладання", personOBJ.subject])
            fields.push(["Зарплата", personOBJ.salary])
            break;

        case "SalesPerson":
            fields.push(["Назва магазину", personOBJ.shopName])
            fields.push(["Роки у торгівлі", personOBJ.yearsInSales])
            fields.push(["Ціль продажів", personOBJ.salesTarget])
            fields.push(["Зарплата", personOBJ.salary])
            break
    }

     fields.forEach(([label, value]) => {
        const p = document.createElement('p')
        p.textContent = `${label}: ${value}`
        USERDIV.appendChild(p)
    })

    REGISTERED_CONTAINER.appendChild(USERDIV)
}