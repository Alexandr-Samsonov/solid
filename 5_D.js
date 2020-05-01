// Dependency inversion principle
// Принцип инверсии зависимостей
// Модули верхних уровней не должны зависеть от модулей нижних уровней. Оба типа модулей должны зависеть от абстракций.
// Абстракции не должны зависеть от деталей. Детали должны зависеть от абстракций.


// Error using by principle

// class Fetch {
//     request(url) {
//         // return fetch(url).then(r => r.json());
//         return Promise.resolve('data from fetch');
//     }
// }
//
// class LocalStorage {
//     get() {
//         return 'data from local storage';
//     }
// }
//
// class Database {
//     constructor() {
//         // this.fetch = new Fetch();
//         this.localStorage = new LocalStorage();
//     }
//
//     getData() {
//         // return this.fetch.request('yandex.ru');
//         return this.localStorage.get();
//     }
// }
//
// const db = new Database();
// console.log('-db.getData()-', db.getData());


// ------------------------------------- //


// Success using by principle

class Fetch {
    request(url) {
        // return fetch(url).then(r => r.json());
        return Promise.resolve('data from fetch');
    }
}

class LocalStorage {
    get() {
        return 'data from local storage';
    }
}

class FetchClient {
    constructor(props) {
        this.fetch = new Fetch();
    }

    clientGet() {
        return this.fetch.request('yandex.ru')
    }
}

class LocalStorageClient {
    constructor() {
        this.localStorage = new LocalStorage();
    }

    clientGet() {
        return this.localStorage.get();
    }
}

class Database {
    constructor(client) {
        this.client = client;
    }

    getData() {
        return this.client.clientGet();
    }
}

const db1 = new Database(new FetchClient());
console.log('-db1.getData()-', db1.getData());

const db2 = new Database(new LocalStorageClient());
console.log('-db2.getData()-', db2.getData());
