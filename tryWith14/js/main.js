import Camera from './Camera.js';
import Entity from './Entity.js';
import PlayerController from './traits/PlayerController.js';
import Timer from './Timer.js';
import {createLevelLoader} from './loaders/level.js';
import {loadFont} from './loaders/font.js';
import {loadEntities} from './entities.js';
import {setupKeyboard} from './input.js';
import {createCollisionLayer} from './layers/collision.js';
import {createDashboardLayer} from './layers/dashboard.js';

function createPlayerEnv(playerEntity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkpoint.set(64, 64);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv;
}

async function main(canvas) {
    const context = canvas.getContext('2d');

    const [entityFactory, font] = await Promise.all([
        loadEntities(),
        loadFont(),
    ]);

    const loadLevel = await createLevelLoader(entityFactory);

    const level = await loadLevel('1-1');

    const camera = new Camera();

    const snail = entityFactory.snail();
    
    if (snail.pos.y > 1000) {
        snail.killable.kill();
    }
    
    
    const joppity = entityFactory.joppity();  //    MY CODE KOOPA BETWEEN CHOCO MOUNDS
    joppity.pos.x = 2350;
    level.entities.add(joppity);
    
    const boogie = entityFactory.boogie();  //      MY CODE THIS WORKS
    boogie.pos.x = 50;
    level.entities.add(boogie);

    /*const goomba2 = entityFactory.goomba();  //      MY CODE THIS WORKS
    goomba2.pos.x = 700;
    level.entities.add(goomba2);
    
    const goomba3 = entityFactory.goomba();  //      MY CODE THIS WORKS
    goomba3.pos.x = 900;
    level.entities.add(goomba3); */
    
    
    const playerEnv = createPlayerEnv(snail);
    level.entities.add(playerEnv);


    level.comp.layers.push(createCollisionLayer(level));
    level.comp.layers.push(createDashboardLayer(font, playerEnv));

    const input = setupKeyboard(snail);
    input.listenTo(window);

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        camera.pos.x = Math.max(0, snail.pos.x - 100);

        level.comp.draw(context, camera);
    }

    timer.start();
}

const canvas = document.getElementById('screen');
main(canvas);
