import Keyboard from './KeyboardState.js';

export function setupKeyboard(snail) {
    const input = new Keyboard();

    input.addMapping('KeyP', keyState => {
        if (keyState) {
            snail.jump.start();
        } else {
            snail.jump.cancel();
        }
    });

    input.addMapping('KeyO', keyState => {
        snail.turbo(keyState);
    });

    input.addMapping('KeyD', keyState => {
        snail.go.dir += keyState ? 1 : -1;
    });

    input.addMapping('KeyA', keyState => {
        snail.go.dir += keyState ? -1 : 1;
    });

    return input;
}
