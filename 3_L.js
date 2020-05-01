// Liskov substitution principle
// Принцип подстановки Барбары Лисков
// Функции, которые используют базовый тип, должны иметь возможность использовать подтипы базового типа, не зная об этом.
// По сути принцип гласит о том, что нужно вводить дополнительные уровни абстракции. Разделять основной функционал от дополнительного на уровни абстракции.


// Error using by principle

// class Person {
//     access() {
//         console.log('У тебя есть доступ');
//     }
// }
//
// class Frontend extends Person {
//     canCreateFrontend() {}
// }
//
// class Backend extends Person {
//     canCreateBackend() {}
// }
//
// class PersonFromDifferentCompany extends Person {
//     access() {
//         throw new Error('У тебя нет доступа! Иди к себе!');
//     }
// }
//
// function openSecretDoor(person) {
//     person.access();
// }
//
// openSecretDoor(new Frontend());
// openSecretDoor(new Backend());
// openSecretDoor(new PersonFromDifferentCompany());  // Error


// ----------------------------------- //


// Success using by principle

class Person {}

class Member extends Person {
    access() {
        console.log('У тебя есть доступ');
    }
}

class Guest extends Person {
    constructor() {
        super();
        this.isGuest = true;
    }
}

class Frontend extends Member {
    canCreateFrontend() {}
}

class Backend extends Member {
    canCreateBackend() {}
}

class PersonFromDifferentCompany extends Guest {
    access() {
        throw new Error('У тебя нет доступа! Иди к себе!');
    }
}

function openSecretDoor(member) {
    member.access();
}

openSecretDoor(new Frontend());
openSecretDoor(new Backend());
// openSecretDoor(new PersonFromDifferentCompany());   // There must be a member, but not a guest


// ----------------------------------- //


// Error using by principle

// class Component {
//     render() {
//         return `<div>Component</div>`
//     }
// }
//
// class HeaderComponent extends Component {
//     onInit() {}
// }
//
// class FooterComponent extends Component {
//     afterInit() {}
// }
//
// class HOC extends Component {
//     render() {
//         throw new Error('Render is impossible here')
//     }
//
//     wrapComponent(component) {
//         component.wrapped = true;
//         return component;
//     }
// }
//
// function renderComponent(component) {
//     console.log(component.render());
// }
//
// renderComponent(new HeaderComponent());
// renderComponent(new FooterComponent());
// renderComponent(new HOC());  // Error


// -------------------------------------- //


// Success using by principle

class Component {
    constructor() {
        this.isComponent = true;
    }
}

class ComponentWithTemplate extends Component {
    render() {
        return `<div>Component</div>`
    }
}

class HOCBase extends Component {}

class HeaderComponent extends ComponentWithTemplate {
    onInit() {}
}

class FooterComponent extends ComponentWithTemplate {
    afterInit() {}
}

class HOC extends HOCBase {
    render() {
        throw new Error('Render is impossible here')
    }

    wrapComponent(component) {
        component.wrapped = true;
        return component;
    }
}

function renderComponent(component) {
    console.log(component.render());
}

renderComponent(new HeaderComponent());
renderComponent(new FooterComponent());
// renderComponent(new HOC());   // There must be a component, but not a HOC
