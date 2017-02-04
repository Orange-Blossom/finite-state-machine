const Stack = require('./stack');

class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.initial = config.initial;
        this.states = config.states;
        this.doneStates = new Stack();
        this.doneStates.push(this.initial);
        this.undoneStates = new Stack();
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.doneStates.peek();
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this.states[state]) {
            throw new Error("Such state doesn't exist");
        }
        this.doneStates.push(state);
        this.undoneStates.clear();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var state = this.getState();
        var newState = this.states[state].transitions[event];
        if (newState) {
            this.changeState(newState);
            this.undoneStates.clear();
        }
        else throw new Error("This event can't be performed");
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.doneStates.clear();
        this.doneStates.push(this.initial);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var arr = [];
        if (!event) {
            for (var a in this.states) {
                arr.push(a);
            }
        }
        else {
            for (var a in this.states) {
                if (this.states[a].transitions[event]) {
                    arr.push(a);
                }
            }
        }
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.doneStates.length() > 1) {
            this.undoneStates.push(this.doneStates.pop());
            return true;
        }
        else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.undoneStates.length() > 0) {
            this.doneStates.push(this.undoneStates.pop());
            return true;
        }
        else return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.doneStates.clear();
        this.undoneStates.clear();
        this.doneStates.push(this.initial);
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
