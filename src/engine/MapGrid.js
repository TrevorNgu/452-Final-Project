
import engine from "../engine/index.js";

import Tile from "../engine/renderables/Tile.js";

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
        this.tileArray = [];


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

    createObject(objectPic, xPos, yPos, color) {
        this.objectPic = objectPic;
        let newObject= new engine.SpriteRenderable(this.objectPic);
        //newObject.setElementPixelPositions(0, 120, 0, 180);
        if(arguments.length == 4) {
            newObject.setColor(color);
        } else {
            newObject.setColor([0, 0, 0, 0]);
        }

        let tileCenterPos = this.getCenterOfTile(xPos, yPos);
        newObject.getXform().setSize(this.tileWidth, this.tileHight);
        newObject.getXform().setPosition(tileCenterPos[0] + this.gridPosX, tileCenterPos[1] + this.gridPosY);

        this.objectsPicArr.push(newObject);
        this.objectsPosArr.push([xPos, yPos]);
    }

    setColisionForObject(objectIndx) {
        this.objectsPosArr[objectIndx].setModeCollisions(true);
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

        if(!(this.tileArray[objCurrentPos[0] + xPosChenge][objCurrentPos[1] + yPosChenge].getCollisionMode()))  {
            let tileCenterPos = this.getCenterOfTile(objNewTilePos[0], objNewTilePos[1]);

            this.objectsPicArr[objeIndx].getXform().setPosition(tileCenterPos[0] + this.gridPosX, tileCenterPos[1] + this.gridPosY);
            this.objectsPosArr[objeIndx] = ([objNewTilePos[0], objNewTilePos[1]]);
    
            console.log(this.objectsPosArr[objeIndx]);
        }
    }

    getObjectCoord(objIndex) {
        let objCurrentPos = this.objectsPosArr[objIndex];//this.getCenterOfTile(xPosToMove, yPosToMove);
        console.log(objCurrentPos[0] + " " + objCurrentPos[1]);
        return objCurrentPos;
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
        let newTile = new engine.SpriteRenderable(tile);

        newTile.setColor([0, 0, 0, 1]);
        newTile.getXform().setSize(this.tileWidth, this.tileHight);
        let tileCenterPos = this.getCenterOfTile(xCoord, yCoord);

        newTile.getXform().setPosition(tileCenterPos[0] + this.gridPosX, tileCenterPos[1] + this.gridPosY);
        this.tilePictures[xCoord][yCoord] = newTile;

        this.tileArray[xCoord][yCoord] = new Tile(newTile);

        return;
    }

    removeTile(xCoord, yCoord) {
        this.tilePictures[xCoord][yCoord] = null;
        this.tileArray[xCoord][yCoord] = null;
        return;
    }

    setGridColor(color) {
        for(let i = 0; i < this.mHeight; i++) {
            for(let j = 0; j < this.mWidth; j++) {
                console.log("test")
                this.tileArray[i][j].setColor(color);
                this.tilePictures[i][j].setColor(color);
            }
        }
    }

    setTileColor(xCoord, yCoord, color) {
        this.tileArray[xCoord][yCoord].setColor(color);
        this.tilePictures[xCoord][yCoord].setColor(color);
    }

    getTile(tileXIndex, tileYIndex) {
        //console.log(this.tileArray[tileXIndex][tileYIndex]);
        return this.tileArray[tileXIndex][tileYIndex];
    }

    setTileCollisionMode(mode, tileXIndex, tileYIndex) {
        this.tileArray[tileXIndex][tileYIndex].setCollisionsMode(mode);
    }

    setAllTileCollisionMode(mode) {
        for(let i = 0; i < this.mHeight; i++) {
            for(let j = 0; j < this.mWidth; j++) {
                this.tileArray[i][j].setCollisionsMode(mode);
            }
        }
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
            this.tileArray[i] = [];
            for(let j = 0; j < this.mWidth; j++) {

                let newTile = new engine.SpriteRenderable(this.tilePic);

                newTile.setColor([0, 1, 0, 0.8]);
                newTile.getXform().setSize(this.tileWidth, this.tileHight);

                let tileCenterPos = this.getCenterOfTile(i, j);

                newTile.getXform().setPosition(tileCenterPos[0] + this.gridPosX, tileCenterPos[1] + this.gridPosY);
                this.tilePictures[i][j] = newTile;

                this.tileArray[i][j] = new Tile(newTile);

            }
        }
    }

/*     createTileObjects() {
        for(let i = 0; i < this.mHeight; i++) {
            this.tileArray[i] = [];
            for(let j = 0; j < this.mWidth; j++) {
                this.tileArray[i][j] = new engine.Tile();
            }
        }
    } */

    draw (camera) {

        for(let i = 0; i < this.mHeight; i++) {
            for(let j = 0; j < this.mWidth; j++) {
                //this.tilePictures[i][j].draw(camera);
                this.tileArray[i][j].draw(camera);
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