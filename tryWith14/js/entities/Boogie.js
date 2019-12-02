import Entity, {Sides, Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadBoogie() {
    return loadSpriteSheet('boogie')
    .then(createBoogieFactory);
}


class Behavior extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }

        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                us.killable.kill();
                us.pendulumMove.speed = 0;
            } else {
                them.killable.kill();
            }
        }
    }
}


function createBoogieFactory(sprite) {
    const walkAnim = sprite.animations.get('walk');

    function routeAnim(boogie) {
        if (boogie.killable.dead) {
            return 'flat';
        }

        return walkAnim(boogie.lifetime);
    }

    function drawBoogie(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createBoogie() {
        const boogie = new Entity();
        boogie.size.set(16, 16);

        boogie.addTrait(new Physics());
        boogie.addTrait(new Solid());
        boogie.addTrait(new PendulumMove());
        boogie.addTrait(new Behavior());
        boogie.addTrait(new Killable());

        boogie.draw = drawBoogie;

        return boogie;
    };
}
