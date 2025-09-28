const PROFFESION = document.getElementById('profession') 
const EXTRA_OPTIONS = document.getElementById('extraSelects')
const REGISTRATION_BUTTON = document.getElementById('registerBtn')
const FORM = document.getElementById('registrationForm')

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
})