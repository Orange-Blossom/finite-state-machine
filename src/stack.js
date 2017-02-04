/**
 * Created by Anya on 04.02.2017.
 */
class Stack {
    constructor () {
        this.data = [];
        this.top = 0;
    }

    push(element) {
        this.data[this.top++] = element;
    }

    pop() {
        if (this.length() > 0) {
            return this.data[--this.top];
        }
        else throw new Error("No elements to pop");
    }

    peek() {
        return this.data[this.top-1];
    }

    length() {
        return this.top;
    }

    clear() {
        this.top = 0;
    }
}

module.exports = Stack;