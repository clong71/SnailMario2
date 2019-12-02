import {loadSnail} from './entities/Snail.js';
import {loadBoogie} from './entities/Boogie.js';
import {loadJoppity} from './entities/Joppity.js';


export function loadEntities() {
    const entityFactories = {};

    function addAs(name) {
        return factory => entityFactories[name] = factory;
    }


    return Promise.all([
        loadSnail().then(addAs('snail')),
        loadBoogie().then(addAs('boogie')),
        loadJoppity().then(addAs('joppity')),
    ])
    .then(() => entityFactories);
}