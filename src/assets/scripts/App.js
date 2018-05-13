import HasJS from 'nerdery-has-js';

/**
 * Application setup
 *
 * @class App
 */
export default class App {
    constructor() {
        this.init();
    }

    init() {
        HasJS.init();
        this.jumpMenu();
    }
}
