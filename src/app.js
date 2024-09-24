(() => {

    /* Game variables. */

    let score = 0;

    let grid = [
        ['', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', ''],
    ];

    let currentTile = null, 
        nextTile = null;

    let currentTilePositions = [], 
        nextTilePositions = [];

    let currentShapeCoord = 0;

    let updateTimer = 1;

    let timerInterval = TIMER_INTERVAL;

    let shapePlaced = false,
        canMoveShape = true,
        canSwitchShape = true,
        canQuickPlace = true,
        gameOver = false;

    /* Game functions. */

    const createCanvas = () => {
        const canvas = document.createElement('canvas');
        canvas.id = CANVAS_ID;
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = CANVAS_COLOR;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        document.body.appendChild(canvas);

        return canvas;
    }

    const clearCanvas = (ctx) => {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = CANVAS_COLOR;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    const drawLine = (ctx) => {
        ctx.strokeStyle = LINE_COLOR;
        ctx.beginPath();
        ctx.moveTo(GAME_WIDTH, 0);
        ctx.lineTo(GAME_WIDTH, CANVAS_HEIGHT);
        ctx.stroke();
    }

    const drawNextUI = (ctx) => {
        ctx.fillStyle = NEXT_FONT_COLOR;
        ctx.font = NEXT_FONT_FAMILY;
        ctx.fillText(NEXT_TILE_TITLE, GAME_WIDTH + (CANVAS_WIDTH - GAME_WIDTH) / 4 + 50, CANVAS_HEIGHT / 4 - 80);

        ctx.strokeStyle = NEXT_STROKE_COLOR;
        ctx.rect(13 * TILE_SIZE, CANVAS_HEIGHT / 4 - 60, TILE_SIZE * 6, TILE_SIZE * 6);
        ctx.stroke();
    }

    const drawScore = (ctx, score) => {
        ctx.fillStyle = SCORE_FONT_COLOR;
        ctx.font = SCORE_TITLE_FONT_FAMILY;
        ctx.fillText(SCORE_TITLE, GAME_WIDTH + (CANVAS_WIDTH - GAME_WIDTH) / 2 - 40, CANVAS_HEIGHT / 1.5 - 30);

        ctx.strokeStyle = SCORE_STROKE_COLOR;
        ctx.rect(14 * TILE_SIZE, CANVAS_HEIGHT / 1.5 - 10, TILE_SIZE * 4, TILE_SIZE);
        ctx.stroke();

        ctx.font = SCORE_FONT_FAMILY;
        ctx.fillText(score,  GAME_WIDTH + (CANVAS_WIDTH - GAME_WIDTH) / 2 - score.toString().length * PIXELS_PER_LETTER, CANVAS_HEIGHT / 1.5 + 17);
    }

    const drawControls = (ctx) => {
        ctx.fillStyle = CONTROLS_FONT_COLOR;
        ctx.font = CONTROLS_TITLE_FONT_FAMILY;
        ctx.fillText(CONTROLS_TITLE, GAME_WIDTH + (CANVAS_WIDTH - GAME_WIDTH) / 2 - 65, CANVAS_HEIGHT - 120);

        ctx.fillStyle = CONTROLS_INFO_FONT_COLOR;
        ctx.font = CONTROLS_INFO_FONT_FAMILY;
        ctx.fillText(CONTROLS_LEFT_RIGHT_ARROWS_INFO, GAME_WIDTH + (CANVAS_WIDTH - GAME_WIDTH) / 2 - 100, CANVAS_HEIGHT - 80);
        ctx.fillText(CONTROLS_DOWN_ARROW_INFO, GAME_WIDTH + (CANVAS_WIDTH - GAME_WIDTH) / 2 - 100, CANVAS_HEIGHT - 55);
        ctx.fillText(CONTROLS_UP_ARROW_INFO, GAME_WIDTH + (CANVAS_WIDTH - GAME_WIDTH) / 2 - 100, CANVAS_HEIGHT - 30);
    }

    const drawGameOver = (ctx) => {
        if(gameOver){
            ctx.fillStyle = GAME_OVER_FILL_COLOR;
            ctx.fillRect(3 * TILE_SIZE, 8 * TILE_SIZE, 6 * TILE_SIZE, 2 * TILE_SIZE);
            ctx.strokeStyle = GAME_OVER_STROKE_COLOR;
            ctx.strokeRect(3 * TILE_SIZE, 8 * TILE_SIZE, 6 * TILE_SIZE, 2 * TILE_SIZE);
            ctx.fillStyle = GAME_OVER_FONT_COLOR;
            ctx.font = GAME_OVER_FONT_FAMILY;
            ctx.fillText(GAME_OVER_TITLE, 4 * TILE_SIZE + 8, 9 * TILE_SIZE + 10);
        }
    }

    const updateDashboard = (ctx) => {
        clearCanvas(ctx);
        drawLine(ctx);
        drawNextUI(ctx);
        drawScore(ctx, score);
        drawControls(ctx);
        drawGrid(ctx, grid);
        drawPreviewGrid(ctx);
        drawGameOver(ctx);
    }

    const initializeKeyListener = () => {
        document.addEventListener('keydown', (event) => {
            switch(event.key){
                case 'ArrowUp':
                    // switch shape
                    if(canSwitchShape) switchShape();
                    break;
                case 'ArrowDown':
                    // quick place
                    if(canQuickPlace) quickPlace();
                    break;
                case 'ArrowLeft':
                    // move left
                    if(canMoveShape) updateCurrentShapeSidePosition(SIDE_LEFT);
                    break;
                case 'ArrowRight':
                    // move right
                    if(canMoveShape) updateCurrentShapeSidePosition(SIDE_RIGHT);
                    break;
            }
        });
    }

    const switchShape = () => {
        let currentTileIndex = SHAPES.indexOf(currentTile);
        let coordsSize = SHAPE_COORDS[currentTileIndex].length;

        if(coordsSize != 0) {

            let newCoords = SHAPE_COORDS[currentTileIndex][currentShapeCoord];
            let switchShapeTilePositions = [];
    
            for(let i=0; i<4; i++){
                switchShapeTilePositions.push([
                    currentTilePositions[i][0] + newCoords[i][0],
                    currentTilePositions[i][1] + newCoords[i][1]
                ]);
            }

            if(isClearOfCollision(switchShapeTilePositions)){
                currentTilePositions = switchShapeTilePositions;
                updateShapePositionsInGrid();
                currentShapeCoord = (currentShapeCoord + 1) % coordsSize;
            }
        }
    }

    const quickPlace = () => {
        timerInterval = 1;
        canMoveShape = false;
        canSwitchShape = false;
        canQuickPlace = false;
    }

    const generateTiles = () => {
        let randNum;
        if(nextTile !== null){
            currentTile = nextTile;
            currentTilePositions = nextTilePositions;
        }
        else {
            randNum = Math.floor(Math.random() * 7);
            currentTile = SHAPES[randNum];
            currentTilePositions = SHAPE_POSITIONS[randNum];
        }
        randNum = Math.floor(Math.random() * 7);
        nextTile = SHAPES[randNum];
        nextTilePositions = SHAPE_POSITIONS[randNum];

        currentShapeCoord = 0;
    }

    const updateShapePositionsInGrid = () => {
        for(let i=0; i<GRID_SIZE_Y; i++){
            for(let j=0; j<GRID_SIZE_X; j++){
                if(grid[i][j].indexOf('C') !== -1){
                    grid[i][j] = '';
                }
            }
        }
        for(let [x, y] of currentTilePositions){
            grid[x][y] = 'C' + currentTile;
        }
    }

    const placeTileToGrid = (isNew=false) => {
        for(tilePosition of currentTilePositions){
            grid[tilePosition[0]][tilePosition[1]] = (isNew ? 'C' : '') + currentTile;
        }
    }

    const finalizeTileToGrid = () => {
        for(let x=0; x<GRID_SIZE_Y; x++){
            for(let y=0; y<GRID_SIZE_X; y++){
                grid[x][y] = grid[x][y].replace('C', '');
            }
        }

        shapePlaced = true;
        canMoveShape = false;
        canSwitchShape = false;
        canQuickPlace = false;
    }

    const updateCurrentShapeSidePosition = (side) => {
        let newCurrentSideTilePositions = [];
        for(let [x, y] of currentTilePositions){
            if(side === SIDE_LEFT){
                newCurrentSideTilePositions.push([x, y-1]);
            }
            else newCurrentSideTilePositions.push([x, y+1]);
        }
        if(isClearOfCollision(newCurrentSideTilePositions)){
            currentTilePositions = newCurrentSideTilePositions;
            updateShapePositionsInGrid();
        }
    }

    const updateCurrentShapePosition = () => {
        let newCurrentTilePositions = [];
        for(let [x, y] of currentTilePositions){
            newCurrentTilePositions.push([x+1, y]);
        }
        if(
            !lowerTileCollision(newCurrentTilePositions)
            && !groundCollision(newCurrentTilePositions)
        ){
            currentTilePositions = newCurrentTilePositions;
            updateShapePositionsInGrid();
        }
        else finalizeTileToGrid();
    }

    const boundaryCollision = (tilePositions) => {
        for(let [x, y] of tilePositions){
            if(!isWithinBounds(x, y)){
                return true;
            }
        }
        return false;
    }

    const isWithinBounds = (x, y) => {
        return y >= 0 && y <= GRID_SIZE_X-1 &&  x >= 0 && x <= GRID_SIZE_Y-1;
    }

    const isClearOfCollision = (tilePositions) => {
        return !sideTileCollision(tilePositions)
        && !lowerTileCollision(tilePositions)
        && !boundaryCollision(tilePositions)
    }

    const sideTileCollision = (tilePositions) => {
        for(let [x, y] of tilePositions){
            if(y >= 0 && y <= GRID_SIZE_X-1 && x >= 0 && x <= GRID_SIZE_Y-1 && grid[x][y] !== '' && grid[x][y].indexOf('C') === -1){
                return true;
            }
        }
        return false;
    }

    const lowerTileCollision = (tilePositions) => {
        for(let [x, y] of tilePositions){
            if(x >= 0 && x <= GRID_SIZE_Y-1 && y >= 0 && y <= GRID_SIZE_X-1 && grid[x][y] !== '' && grid[x][y].indexOf('C') === -1){
                return true;
            }
        }
        return false;
    }

    const groundCollision = (tilePositions) => {
        for(let [x, y] of tilePositions){
            if(x >= GRID_SIZE_Y){
                return true;
            }
        }
        return false;
    }

    const updateGrid = () => {
        let checkAgain = false;
        let isFullRow;
        let fullRows = [];
        for(let i=0; i<GRID_SIZE_Y; i++){
            isFullRow = true;
            for(let j=0; j<GRID_SIZE_X; j++){
                if(grid[i][j] === ''){
                    isFullRow = false;
                    break;
                }
            }
            if(isFullRow){
                checkAgain = true;
                fullRows.push(i);
            }
        }
        for(let fullRow of fullRows){
            grid.splice(fullRow, 1);
            score += GRID_SIZE_X * SCORE_FACTOR;
        }
        for(let _ of fullRows){
            grid.unshift(Array(GRID_SIZE_Y).fill(''));
        }
        return checkAgain;
    }

    const isGameOver = () => {
        for(let p of nextTilePositions){
            if(grid[p[0]][p[1]] !== '' && grid[p[0]][p[1]].indexOf('C') === -1){
                return true;
            }
        }
        return false;
    }

    const drawGrid = (ctx, grid) => {
        for(let j=0; j<GRID_SIZE_Y; j++){
            for(let i=0; i<GRID_SIZE_X; i++){
                drawTile(ctx, grid[j][i], i, j);
            }
        }
        drawGridLines(ctx);
    }

    const drawTile = (ctx, tileCode, x, y) => {
        ctx.fillStyle = SHAPE_COLOR[tileCode.replace('C', '')];
        ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }

    const drawGridLines = (ctx) => {
        for(let i=0; i<GRID_SIZE_X; i++){
            drawGridLine(ctx, i * TILE_SIZE, 0, i * TILE_SIZE, GAME_HEIGHT);
        }
        for(let i=0; i<GRID_SIZE_Y; i++){
            drawGridLine(ctx, 0, i * TILE_SIZE, GAME_WIDTH, i * TILE_SIZE);
        }
    }

    const drawPreviewGrid = (ctx) => {
        drawPreviewNextShape(ctx);
        drawPreviewGridLines(ctx);
    }

    const drawPreviewGridLines = (ctx) => {
        let startX = 13 * TILE_SIZE;
        let startY = CANVAS_HEIGHT / 4 - 60;
        for(let i=1; i<6; i++){
            drawGridLine(ctx, startX + (i * TILE_SIZE) + 1, startY + 1, startX + (i * TILE_SIZE) + 1, startY + (TILE_SIZE * 6) - 1);
        }
        for(let i=1; i<6; i++){
            drawGridLine(ctx, startX + 1, startY + (i * TILE_SIZE) + 1, startX + (TILE_SIZE * 6) - 1, startY + (i * TILE_SIZE) + 1);
        }
    }

    const drawGridLine = (ctx, x, y, width, height) => {
        ctx.strokeStyle = GRID_LINE_COLOR;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(width, height);
        ctx.stroke();
    }

    const drawPreviewNextShape = (ctx) => {
        let startX = 13;
        let startY = 3;

        for(let i=0; i<PREVIEW_GRID_SIZE; i++){
            for(let j=0; j<PREVIEW_GRID_SIZE; j++){
                if(SHAPE_PREVIEW_POSITIONS[nextTile][j][i]){
                    drawTile(ctx, nextTile, startX + i, startY + j);
                }
            }
        }
    }

    const startGame = () => {
        const canvas = createCanvas();
        const ctx = canvas.getContext('2d');
        initializeKeyListener();
        generateTiles();
        placeTileToGrid(true);
        updateDashboard(ctx);
        update(ctx);
    }

    const update = (ctx) => {
        if(updateTimer % timerInterval === 0){
            updateCurrentShapePosition();
            updateTimer = 1;
        }

        if(shapePlaced) {

            timerInterval = TIMER_INTERVAL;

            gameOver = isGameOver();

            let checkAgain;
            while(true){
                checkAgain = updateGrid();
                if(!checkAgain) break;
            }

            if(!gameOver){
                generateTiles();
                placeTileToGrid(true);

                shapePlaced = false;
                canMoveShape = true;
                canSwitchShape = true;
                canQuickPlace = true;
            }
        }
        updateDashboard(ctx);
        window.requestAnimationFrame(() => {
            update(ctx);
            updateTimer++;
        });
    }

    startGame();
})();

/**
 * Game logic
 * 
 * Create tile and add collision points to check.
 * For each step, check: boundary collision, tile collision.
 * If there is boundary collision, do not allow tile to be placed out of boundaries.
 * If there is tile collision, check if any rows are full with tiles. If there are rows with tiles, remove those tiles, update the above tile positions and update score.
 * If no rows are full, just place the tile and create the next one.
 * 
 * This code is a mess, good luck reading it.
 */