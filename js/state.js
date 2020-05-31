import Func from '/js/func.js';

export class InputProvider {
    constructor(input, name) {
        this.input = input;
        this.name = name;
    }
    bindTo(writer) {
        this.input.addEventListener(this.name, (event) => {
            writer(this.getEntry());
        });
        writer(this.getEntry());
    }
    getEntry() {
        var name = this.input.name;
        var type = this.input.type;
        switch (type) {
            case "number":
            case "range":
                var value = this.input.valueAsNumber;
                break;
            default:
                var value = this.input.value;
                break;
        }
        var entry = new Entry(name, value);
        return entry;
    }
    static manyFromSelector(selector) {
        return Func.cross([document.querySelector(selector)], ["change", "keyup", "input"]).map((pair) => {
            return new InputProvider(pair[0], pair[1]);
        });
    }
}

export class InputSet {
    constructor(providers) {
        this.state = {};
        this.providers = providers;

        providers.forEach((provider) => {
            provider.bindTo((entry) => this.write(entry));
        });
    }
    dispatchTo(listener) {
        this.listener = listener;
        this.announce();
    }
    write(entry) {
        this.state[entry.name] = entry.value;
        this.announce();
    }
    announce() {
        if (this.listener) {
            this.listener(this.state);
        }
    }
}

class Entry {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

class Binding {
    constructor(listener, reader) {
        this.listener = listener;
        this.reader = reader;
    }
    dispatch() {
        this.listener(this.reader());
    }
}
