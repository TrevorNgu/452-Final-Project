
import engine from "../engine/index.js";

class MapGrid {

    constructor(width, height) {
        this.mWidth = width;
        this.mHeight = height;
        this.tilePic = null; 
        this.tileWidth = null;
        this.tileHight = null;

        this.mArray = [];

        this.tilePictures = [];
        this.objectsPicArr = [];
        this.objectsPosArr = [];


        this.gridPosX = 0;
        this.gridPosY = 0;

        this.objectPic = null;


        for(let i = 0; i < height; i++) {
            this.mArray[i] = [];
            for(let j = 0; j < width; j++) {
                this.mArray[i][j] = 0;
            }
        }

        this.mXPos = 0;
        this.mYPos = 0;
    }

    createObject(objectPic, xPos, yPos) {
        this.objectPic = objectPic;
        let newObject= new engine.SpriteRenderable(this.objectPic);
        //newObject.setElementPixelPositions(0, 120, 0, 180);
        newObject.setColor([0, 0, 0, 0]);

        let tileCenterPos = this.getCenterOfTile(xPos, yPos);
        newObject.getXform().setSize(this.tileWidth, this.tileHight);
        newObject.getXform().setPosition(tileCenterPos[0] + this.gridPosX, tileCenterPos[1] + this.gridPosY);

        this.objectsPicArr.push(newObject);
        this.objectsPosArr.push([xPos, yPos]);
    }

    moveObjectToSpecTile(objeIndx, xPosToMove, yPosToMove) {
        let tileCenterPos = this.getCenterOfTile(xPosToMove, yPosToMove);
        this.objectsPicArr[objeIndx].getXform().setPosition(tileCenterPos[0] + this.gridPosX, tileCenterPos[1] + this.gridPosY);
        this.objectsPosArr[objeIndx] = (xPosToMove, yPosToMove);
    }

    moveObjectInDerection(objeIndx, xPosChenge, yPosChenge) {
        console.log(this.objectsPosArr[objeIndx]);
        let objCurrentPos = this.objectsPosArr[objeIndx];//this.getCenterOfTile(xPosToMove, yPosToMove);

        let objNewTilePos = ([objCurrentPos[0] + xPosChenge, objCurrentPos[1] + yPosChenge]);

        let tileCenterPos = this.getCenterOfTile(objNewTilePos[0], objNewTilePos[1]);

        this.objectsPicArr[objeIndx].getXform().setPosition(tileCenterPos[0] + this.gridPosX, tileCenterPos[1] + this.gridPosY);
        this.objectsPosArr[objeIndx] = ([objNewTilePos[0], objNewTilePos[1]]);

        console.log(this.objectsPosArr[objeIndx]);
    }

    setGridPos(x,y) {
        this.gridPosX = x;
        this.gridPosY = y;
    }

    printGrid() {
        for(let i = 0; i < this.mWidth; i++) {
            for(let j = 0; j < this.mHeight; j++) {
                console.log(this.mArray[i][j]);
            }
        }
    }

    addTile(xCoord, yCoord, tile) {
        return;
    }

    removeTile(xCoord, yCoord) {
        return;
    }

    getTile() {
        return;
    }

    setPosition(xPos, yPos) {
        this.mXPos = xPos;
        this.mYPos = yPos;
    }

    update() {
        return;
    }

    setTile (tile, width, hight) {
        this.tilePic = tile;
        this.tileWidth = width;
        this.tileHight = hight;
        console.log(this.tilePic, this.tileWidth, this.tileHight)
    }


    getCenterOfTile(x, y) {
        let centerX = (x * (this.tileWidth)) - this.tileWidth/2;
        let centerY = (y * (this.tileHight)) - this.tileHight/2;
        let tileCenterPos = [centerX, centerY];
        return tileCenterPos;
    }

    createTilePicturesForGrid() {
        for(let i = 0; i < this.mHeight; i++) {
            this.tilePictures[i] = [];
            for(let j = 0; j < this.mWidth; j++) {
                //let newTile = new engine.TextureRenderable(this.tilePic, null);

                let newTile = new engine.SpriteRenderable(this.tilePic);
                //newTile.setElementPixelPositions(0, 120, 0, 180);
                newTile.setColor([0, 0, 0, 0]);
                newTile.getXform().setSize(this.tileWidth, this.tileHight);

                let tileCenterPos = this.getCenterOfTile(i, j);

                newTile.getXform().setPosition(tileCenterPos[0] + this.gridPosX, tileCenterPos[1] + this.gridPosY);
                this.tilePictures[i][j] = newTile;

            }
        }
    }

    draw (camera) {

        for(let i = 0; i < this.mHeight; i++) {
            for(let j = 0; j < this.mWidth; j++) {
                this.tilePictures[i][j].draw(camera);
            }
        }

        for(let i = 0; i < this.objectsPicArr.length; i++) {
            this.objectsPicArr[i].draw(camera);
        }

        return;
    }

    TranslateTileToWC() {
        return;
    }

    TranslateWCToTile() {
        return;
    }
}

export default MapGrid;