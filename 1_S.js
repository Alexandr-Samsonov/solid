// Single Responsibility Principle
// Принцип единственной ответственности


class News {
    constructor(title, text) {
        this.title = title;
        this.text = text;
        this.modified = false;
    }

    update(text) {
        this.text = text;
        this.modified = true;
    }

    // Error using by principle

    // toHTML() {
    //     return `
    //         <div>
    //             <h1>${this.title}</h1>
    //             <p>${this.text}</p>
    //         </div>
    //     `
    // }
    //
    // toJSON() {
    //     return JSON.stringify({
    //         title: this.title,
    //         text: this.text,
    //         modified: this.modified,
    //     }, null, 2)
    // }
}


// Success using by principle

class NewsPrinter {
    constructor(news) {
        this.news = news;
    }

    toHTML() {
        return `
            <div>
                <h1>${this.news.title}</h1>
                <p>${this.news.text}</p>
            </div>
        `
    }

    toJSON() {
        return JSON.stringify({
            title: this.news.title,
            text: this.news.text,
            modified: this.news.modified,
        }, null, 2)
    }

    xml() {
        return `
            <news>
                <title>${this.news.title}</title>
                <title>${this.news.text}</title>
            </news>
        `
    }
}

// const news = new News('Title test', 'Text test');
// console.log('- news.toHTML() -', news.toHTML());
// console.log('- news.toJSON() -', news.toJSON());

const printer = new NewsPrinter(
    new News('Title test', 'Text test')
);

console.log('- news.toHTML() -', printer.toHTML());
console.log('- news.toJSON() -', printer.toJSON());
console.log('- news.xml() -', printer.xml());
