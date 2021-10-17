title = "TRICKSHOT";

description = `
MOUSE = AIM
CLICK = SHOOT
RED BALL FIRST
`;

characters = [
`
  rr
 rrrr
rrrrrr
rrrrrr
 rrrr
  rr  
`,`
  ll
 llll
llllll
llllll
 llll
  ll
`,`
  yy
 yyyy
yyyyyy
yyyyyy
 yyyy
  yy
`,`


  pp
  pp
  

`];

const G = {
	WIDTH: 100,
	HEIGHT: 100,
	BORDER_PADDING: 10,
    CLICKABLE: false, // tracks 'player turn',
    CUE_VISIBLE: true
};

options = {
    viewSize: {x: G.WIDTH, y: G.HEIGHT},
    isCapturing: true,
    isCapturingGameCanvasOnly: true,
    captureCanvasScale: 2,
    seed: 1,
    isPlayingBgm: true,
    isReplayEnabled: true,
    theme: "dark"
};

/**
* @typedef {{
* pos: Vector,
* speed: number,
* angle: number}} Ball
*/
let rBall;
let wBall;
let yBall;

/**
 * @typedef {{
 * pos: Vector,
 * speed: number
 * }} Cue
 */
let cue;

/**
 * @typedef {{
 * pos1: Vector,
 * pos2: Vector
 * }} Wall
 */

function update() {
	if (!ticks) {
        reset();
	}

    if (!G.CLICKABLE && ((ticks % 480) == 240)) {
        reset();
    }

    if (G.CLICKABLE && input.isJustReleased) {
        G.CLICKABLE = false;
        cue.angle = cue.pos.angleTo(wBall.pos);
        cue.speed = Math.hypot(cue.pos.x - wBall.pos.x, cue.pos.y - wBall.pos.y)/5;
    }
    // draw borders
    color ("black");
    line(G.BORDER_PADDING, G.BORDER_PADDING, G.WIDTH - G.BORDER_PADDING, G.BORDER_PADDING, 3);
    color ("black");
    line(G.BORDER_PADDING, G.HEIGHT - G.BORDER_PADDING, G.WIDTH - G.BORDER_PADDING, G.HEIGHT - G.BORDER_PADDING, 3);
    color ("black");
    line(G.BORDER_PADDING, G.BORDER_PADDING, G.BORDER_PADDING, G.HEIGHT - G.BORDER_PADDING, 3);
    color ("black");
    line(G.WIDTH - G.BORDER_PADDING, G.BORDER_PADDING, G.WIDTH - G.BORDER_PADDING, G.HEIGHT - G.BORDER_PADDING, 3);
    
    
    // draw white ball
    color ("black");
    char("b", wBall.pos);

    // draw yellow balls
    color ("black");
    char("c", yBall.pos);

    // draw red ball
    color ("black");
    char("a", rBall.pos);

    // cue draw 1
    if (G.CUE_VISIBLE == true) {
        color ("black");
        char('d', cue.pos);
        color ("purple");
        line(cue.pos, wBall.pos, 1);
    }

    // draw cue

    if ((ticks % 12) == 0) {
        cue.pos.x = cue.pos.x + cue.speed * Math.cos(cue.angle);
        cue.pos.y = cue.pos.y + cue.speed * Math.sin(cue.angle);
    }

    if ((ticks % 12) == 0 && char('d', cue.pos).isColliding.char.b) {
        wBall.angle = cue.angle;
        wBall.speed = cue.speed;
        cue.speed = 0;
        G.CUE_VISIBLE = false;
        color ("transparent");
        char('d', cue.pos);
        color ("transparent");
        line(cue.pos, wBall.pos, 1);
    }

    if (G.CLICKABLE) {
        cue.pos = vec(input.pos.x, input.pos.y);
        cue.pos.clamp(G.BORDER_PADDING + 2, G.WIDTH - G.BORDER_PADDING - 3, G.BORDER_PADDING + 2, G.HEIGHT - G.BORDER_PADDING - 3);
    }

    // move white ball
    if ((ticks % 12) == 0) {
        wBall.pos.x = wBall.pos.x + wBall.speed * Math.cos(wBall.angle);
        wBall.pos.y = wBall.pos.y + wBall.speed * Math.sin(wBall.angle);
    }
}


function reset() {
    yBall = {
        pos: vec(rnd(G.BORDER_PADDING + 4, G.WIDTH - G.BORDER_PADDING - 4), rnd(G.BORDER_PADDING + 4, G.HEIGHT - G.BORDER_PADDING - 4)),
        speed: 0,
        angle: 0
    };

    rBall = {
        pos: vec(rnd(G.BORDER_PADDING + 4, G.WIDTH - G.BORDER_PADDING - 4), rnd(G.BORDER_PADDING + 4, G.HEIGHT - G.BORDER_PADDING - 4)),
        speed: 0,
        angle: 0
    };

    wBall = {
        pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.7),
        speed: 0,
        angle: 0
    };
    cue = {
        pos: vec(input.pos.x, input.pos.y)
    };
    G.CLICKABLE = true;
    G.CUE_VISIBLE = true;
}