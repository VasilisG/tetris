const GAME_TITLE = 'Tetris';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 720;

const GAME_WIDTH = 480;
const GAME_HEIGHT = 720;

const CANVAS_ID = 'tetris-canvas';
const CANVAS_COLOR = '#000';

const TILE_SIZE = 40;

const GRID_SIZE_X = 12;
const GRID_SIZE_Y = 18;

const SIDE_LEFT = 0;
const SIDE_RIGHT = 1;

const LINE_COLOR = '#FFF';
const GRID_LINE_COLOR = '#333';

const NEXT_TILE_TITLE = 'NEXT';
const NEXT_FONT_COLOR = '#FFF';
const NEXT_STROKE_COLOR = '#FFF';
const NEXT_FONT_FAMILY = '24px sans-serif';

const SCORE_TITLE = 'SCORE';
const SCORE_FONT_COLOR = '#FFF';
const SCORE_STROKE_COLOR = '#FFF';
const SCORE_TITLE_FONT_FAMILY = '24px sans-serif';
const SCORE_FONT_FAMILY = '16px sans-serif';

const CONTROLS_TITLE = 'CONTROLS';
const CONTROLS_FONT_COLOR = '#FFF';
const CONTROLS_STROKE_COLOR = '#FFF';
const CONTROLS_INFO_FONT_COLOR = '#CCC';
const CONTROLS_TITLE_FONT_FAMILY = '24px sans-serif';
const CONTROLS_INFO_FONT_FAMILY = '16px sans-serif';

const GAME_OVER_TITLE = 'GAME OVER';
const GAME_OVER_FONT_COLOR = '#FFF';
const GAME_OVER_STROKE_COLOR = '#FFF';
const GAME_OVER_FILL_COLOR = '#000';
const GAME_OVER_FONT_FAMILY = '24px sans-serif';

const CONTROLS_LEFT_RIGHT_ARROWS_INFO = 'LEFT / RIGHT to move tile';
const CONTROLS_DOWN_ARROW_INFO = 'DOWN for quick placement';
const CONTROLS_UP_ARROW_INFO = 'UP for rotation';

const PIXELS_PER_LETTER = 4.5;

const TIMER_INTERVAL = 30;

const SCORE_FACTOR = 4;

const PREVIEW_GRID_SIZE = 6;

/**
 *  ***
 *  ***
 */
const SHAPE_SQUARE = 'O';

/**
 *  ****
 */
const SHAPE_LONG_STRAIGHT = 'I';

/**
 *    *** 
 *  ***
 */
const SHAPE_S = 'S';

/**
 *  ***
 *    ***
 */
const SHAPE_Z = 'Z';

/**
 *    *
 *    *
 *  ***
 */
const SHAPE_L = 'L';

/**
 *  *
 *  *
 *  ***
 */
const SHAPE_J = 'J';

/**
 *  ***
 *   *
 */
const SHAPE_T = 'T';


const SHAPE_COLOR = {
    [SHAPE_SQUARE]:        '#FF0',
    [SHAPE_LONG_STRAIGHT]: '#F00',
    [SHAPE_S]:             '#0D0',
    [SHAPE_Z]:             '#00F',
    [SHAPE_L]:             '#F0F',
    [SHAPE_J]:             '#0FF',
    [SHAPE_T]:             '#CAD',
    '':                    '#000'
};

const SHAPES = [
    SHAPE_SQUARE,
    SHAPE_LONG_STRAIGHT,
    SHAPE_S,
    SHAPE_Z,
    SHAPE_L,
    SHAPE_J,
    SHAPE_T
];

const SHAPE_PREVIEW_POSITIONS = {
    [SHAPE_SQUARE]: [
        [0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0], 
        [0, 0, 1, 1, 0, 0], 
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ],
    [SHAPE_LONG_STRAIGHT]: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ],
    [SHAPE_S]: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ],
    [SHAPE_Z]: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ],
    [SHAPE_L]: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ],
    [SHAPE_J]: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ],
    [SHAPE_T]: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ]
};

const SHAPE_POSITIONS = [
    // square
    [
        [0, 5],
        [0, 6],
        [1, 5],
        [1, 6]
    ],

    //long straight
    [
        [0, 4],
        [0, 5],
        [0, 6],
        [0, 7]
    ],

    // S shape
    [
        [1, 4],
        [1, 5],
        [0, 5],
        [0, 6]
    ],

    // Z shape
    [
        [0, 5],
        [0, 6],
        [1, 6],
        [1, 7]
    ],

    // L shape
    [
        [0, 6],
        [1, 6],
        [2, 6],
        [2, 5]
    ],

    // J shape
    [
        [0, 5],
        [1, 5],
        [2, 5],
        [2, 6]
    ],

    // T shape
    [
        [0, 4],
        [0, 5],
        [0, 6],
        [1, 5]
    ]
];

const SHAPE_COORDS = [

    // square tile has no rotation coordinates.
    [],

    // long straight tile, only one rotation.
    [
        [
            [0, 0],
            [1, -1],
            [2, -2],
            [3, -3]
        ],
        [
            [0, 0],
            [-1, 1],
            [-2, 2],
            [-3, 3] 
        ]
    ],

    // S tile.
    [
        [
            [0, 0],
            [-1, -1],
            [0, -2],
            [-1, -3]
        ],
        [
            [0, 0],
            [1, 1],
            [0, 2],
            [1, 3]
        ]
    ],

    // Z tile.
    [
        [
            [-1, 3],
            [0, 2],
            [-1, 1],
            [0, 0]
        ],
        [
            [1, -3],
            [0, -2],
            [1, -1],
            [0, 0]
        ]
    ],

    // L tile.
    [
        [
            [1, 1],
            [0, 0],
            [-1, -1],
            [-2, 0]
        ],
        [
            [1, -1],
            [0, 0],
            [-1, 1],
            [0, 2]
        ],
        [
            [-1, -1],
            [0, 0],
            [1, 1],
            [2, 0]
        ],
        [
            [-1, 1],
            [0, 0],
            [1, -1],
            [0, -2]
        ]
    ],

    // J tile.
    [
        [
            [1, 1],
            [0, 0],
            [-1, -1],
            [0, -2]
        ],
        [
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 0]
        ],
        [
            [-1, -1],
            [0, 0],
            [1, 1],
            [0, 2]
        ],
        [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, 0]
        ]
    ],

    // T tile.
    [
        [
            [-1, 1],
            [0, 0],
            [1, -1],
            [-1, -1]
        ],
        [
            [1, 1],
            [0, 0],
            [-1, -1],
            [-1, 1]
        ],
        [
            [1, -1],
            [0, 0],
            [-1, 1],
            [1, 1]
        ],
        [
            [-1, -1],
            [0, 0],
            [1, 1],
            [1, -1]
        ]
    ]
];

// https://markmliu.medium.com/the-tetris-proof-60a7a69a8e04