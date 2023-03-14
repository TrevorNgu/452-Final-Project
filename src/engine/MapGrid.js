
import engine from "../engine/index.js";

import Tile from "../engine/renderables/Tile.js";
import TileDoor from "../engine/renderables/TileDoor.js";
import BoundingBox from "./bounding_box.js";

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
        this.tileBounds = [];


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

        this.movmentSpeed = 1;
        this.movementSmoothInxed = 30;

        this.doorArray = [];

        //https://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
        // Create the event
        this.event = new CustomEvent("door", { "detail": {
        "Reference" : this.doorArray }});

        this.gridColor = [0,0,0,0];
        this.buttonTile = this.tileBounds[17];
    }

    //Adding Functions
    createObject(objectPic, xPos, yPos, color) { //xPos and yPos are in Tile Coords
        //created object pic
        this.objectPic = objectPic;
        let newObject= new engine.SpriteRenderable(this.objectPic);
        if(arguments.length == 4) {
            newObject.setColor(color);
        } else {
            newObject.setColor([0, 0, 0, 0]);
        }
        //set pic position
        let tileCenterPos = this.getCenterOfTile(xPos, yPos); //Retrieves Position in WC
        newObject.getXform().setSize(this.tileWidth, this.tileHight);
        newObject.getXform().setPosition(tileCenterPos[0] + this.gridPosX, tileCenterPos[1] + this.gridPosY);
        //push to the array of object.
        this.objectsPicArr.push(newObject);
        this.objectsPosArr.push([xPos, yPos]);
        console.log(tileCenterPos);
        //Create Bounding Box and push into tileBounds
        this.tileBox = new BoundingBox(tileCenterPos, this.tileWidth, this.tileHight);
        this.tileBounds.push(this.tileBox);
    }

    createTilePicturesForGrid() {
        for(let i = 0; i < this.mHeight; i++) {
            this.tilePictures[i] = [];
            this.tileArray[i] = [];
            for(let j = 0; j < this.mWidth; j++) {
                //create picures for tiles
                let newTile = new engine.SpriteRenderable(this.tilePic);
                newTile.setColor(this.gridColor);
                newTile.getXform().setSize(this.tileWidth, this.tileHight);
                //set new picture pos
                let tileCenterPos = this.getCenterOfTile(i, j);
                newTile.getXform().setPosition(tileCenterPos[0] + this.gridPosX, tileCenterPos[1] + this.gridPosY);
                this.tilePictures[i][j] = newTile;
                this.tileArray[i][j] = new Tile(newTile);
            }
        }
    }

    addTile(xPos, yPos, tile) {
        let newTile = new engine.SpriteRenderable(tile);

        newTile.setColor([0, 0, 0, 1]);
        newTile.getXform().setSize(this.tileWidth, this.tileHight);
        let tileCenterPos = this.getCenterOfTile(xPos, yPos);

        newTile.getXform().setPosition(tileCenterPos[0] + this.gridPosX, tileCenterPos[1] + this.gridPosY);
        this.tilePictures[xPos][yPos] = newTile;

        this.tileArray[xPos][yPos] = new Tile(newTile);

        return;
    }

    removeTile(xPos, yPos) {
        this.tilePictures[xPos][yPos] = null;
        this.tileArray[xPos][yPos] = null;
        return;
    }
    
    //Getter functions
    getTile(xPos, yPos) {
        return this.tileArray[xPos][yPos];
    }

    getCenterOfTile(xPos, yPos) {
        let centerX = (xPos * (this.tileWidth)) - this.tileWidth/2;
        let centerY = (yPos * (this.tileHight)) - this.tileHight/2;
        let tileCenterPos = [centerX, centerY];
        return tileCenterPos;
    }

    //Setter functions
    setTile (tile, width, hight) {
        this.tilePic = tile;
        this.tileWidth = width;
        this.tileHight = hight;
    }

    setGridColor(color) {
        this.gridColor = color;
    }

    forceSetGridColor(color) {
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

    setDynamicModeOfTile(mode, xPos, yPos) {
        this.tileArray[xPos][yPos].setDynamicMode(mode);
    }

    //creates a door
    setTileDoor(tilePic, closedPic = null, openPic = null, xPos, yPos) {
        let newTileClosedPic;
        let newTileOpenPic;

        let tilePicBG;

        if(closedPic == null) {
            newTileClosedPic = new engine.SpriteRenderable(this.tilePic);
        }
        else {
            newTileClosedPic = new engine.SpriteRenderable(closedPic);
        }
        if(openPic == null) {
            newTileOpenPic = new engine.SpriteRenderable(this.tilePic);
        }
        else {
            newTileOpenPic = new engine.SpriteRenderable(openPic);
        }
        //tile background pic
        tilePicBG = new engine.SpriteRenderable(tilePic);
        //close dore pic
        newTileClosedPic.setColor([0, 0, 0, 0.0]);
        newTileClosedPic.getXform().setSize(this.tileWidth, this.tileHight);
        //set new colse door picture pos
        let tileCenterPos = this.getCenterOfTile(xPos, yPos);
        newTileClosedPic.getXform().setPosition(tileCenterPos[0] + this.gridPosX, tileCenterPos[1] + this.gridPosY);
        //opend door pic
        newTileOpenPic.setColor([0, 0, 0, 0.0]);
        newTileOpenPic.getXform().setSize(this.tileWidth, this.tileHight);
        newTileOpenPic.getXform().setPosition(tileCenterPos[0] + this.gridPosX, tileCenterPos[1] + this.gridPosY); 
        //back ground picture
        tilePicBG.setColor(this.gridColor);
        tilePicBG.getXform().setSize(this.tileWidth, this.tileHight);
        //set new picture pos
        tilePicBG.getXform().setPosition(tileCenterPos[0] + this.gridPosX, tileCenterPos[1] + this.gridPosY);
        //creates tile door object 
        this.tileArray[xPos][yPos] = new TileDoor(tilePicBG);
        this.tileArray[xPos][yPos].setEvent("door");
        console.log(closedPic);
        //set textires in the tile door
        this.tileArray[xPos][yPos].setFirstTextureObject(newTileClosedPic);
        this.tileArray[xPos][yPos].setSecondTextureObject(newTileOpenPic);
        this.doorArray.push(this.tileArray[xPos][yPos]);
    }

    setCollisionForObject(index) {
        this.objectsPosArr[index].setModeCollisions(true);
    }

    setGridPos(xPos, yPos) {
        this.gridPosX = xPos;
        this.gridPosY = yPos;
    }

    setTileCollisionMode(mode, xPos, yPos) {
        this.tileArray[xPos][yPos].setCollisionsMode(mode);
    }

    setPosition(xPos, yPos) {
        this.mXPos = xPos;
        this.mYPos = yPos;
    }


    //Manipulate Functions
    moveObjectToSpecTile(index, xPosToMove, yPosToMove) {
        let tileCenterPos = this.getCenterOfTile(xPosToMove, yPosToMove);
        this.objectsPicArr[index].getXform().setPosition(tileCenterPos[0] + this.gridPosX, tileCenterPos[1] + this.gridPosY);
        this.objectsPosArr[index] = (xPosToMove, yPosToMove);
    }

    moveObjectInDerection(index, xPosChenge, yPosChenge) {
        //get cureent pos
        let objCurrentPos = this.objectsPosArr[index];//this.getCenterOfTile(xPosToMove, yPosToMove);
        //get new pos
        let objNewTilePos = ([objCurrentPos[0] + xPosChenge, objCurrentPos[1] + yPosChenge]);
        let objNewXPos = objCurrentPos[0] + xPosChenge;
        let objNewYPos = objCurrentPos[1] + yPosChenge;
        //check for colision on the new pos
        if(!(this.tileArray[objCurrentPos[0] + xPosChenge][objCurrentPos[1] + yPosChenge].getCollisionMode()))  {
            //chenge pic position 
            this.moveObjectPicture(index, objNewXPos, objNewYPos);
        }
        //check if the object on a front is dynamic (movable)
        else if((this.tileArray[objCurrentPos[0] + xPosChenge][objCurrentPos[1] + yPosChenge].getDynamicMode()))  {
            //check if there is not a object hehaind the object that will be moved.
            if(!(this.tileArray[objCurrentPos[0] + xPosChenge + xPosChenge][objCurrentPos[1] + yPosChenge + yPosChenge].getCollisionMode())) {
                //find moveble object index
                let moveObjectIndex = this.findObjectIndexBasedOnPos(objCurrentPos[0] + xPosChenge, objCurrentPos[1] + yPosChenge);
                //move dinamic object
                this.moveObjectPicture(moveObjectIndex, objNewXPos + xPosChenge, objNewYPos + yPosChenge);
                //change the tile properties in the old pos
                this.tileArray[objCurrentPos[0] + xPosChenge][objCurrentPos[1] + yPosChenge].setCollisionsMode(false);
                this.tileArray[objCurrentPos[0] + xPosChenge][objCurrentPos[1] + yPosChenge].setDynamicMode(false);
                //change the tile properties in the new pos
                this.tileArray[objCurrentPos[0] + xPosChenge + xPosChenge][objCurrentPos[1] + yPosChenge + yPosChenge].setCollisionsMode(true);
                this.tileArray[objCurrentPos[0] + xPosChenge + xPosChenge][objCurrentPos[1] + yPosChenge + yPosChenge].setDynamicMode(true);
                //move cheracter
                this.moveObjectPicture(index, objNewXPos, objNewYPos);
            }
        }
    }

    moveObjectPicture(index, xPos, yPos) { 
        let tileCenterPos = this.getCenterOfTile(xPos, yPos);
        this.MovePictureSomoothly(index, [tileCenterPos[0], tileCenterPos[1]]);
        this.objectsPosArr[index] = ([xPos, yPos]);
        this.tileBounds[index].setPosition(tileCenterPos);
    }

    async MovePictureSomoothly(index, newPos) {
        //picture old pos
        let oldPosObj = this.objectsPosArr[index];
        let oldPos = this.getCenterOfTile(oldPosObj[0], oldPosObj[1]);
        let posChange = [newPos[0] - oldPos[0], newPos[1] - oldPos[1]];
        let posChangeFraction = [posChange[0] / this.movementSmoothInxed, posChange[1] / this.movementSmoothInxed];
        //move picture
        for(let i = 0; i < this.movementSmoothInxed; i += 2) {
            await sleep(10);
            this.objectsPicArr[index].getXform().setPosition
            ((oldPos[0] + (posChangeFraction[0] * i)) + this.gridPosX,
             (oldPos[1] + (posChangeFraction[1] * i)) + this.gridPosY);
        }
    }

    //Utility Functions
    findObjectIndexBasedOnPos(xPos, yPos) {
        for(let i = 0; i < this.objectsPicArr.length; i++) {
            if((this.objectsPosArr[i][0] == xPos) && ((this.objectsPosArr[i][1] == yPos))) { //if((this.objectsPosArr[i][0]) == ([xPos, yPos])) {
                console.log(i);
                return i;
            }
        }
        console.log("null");
        return null;
    }

    checkObjectPosition(index, xPos, yPos) {
        return ((this.objectsPosArr[index][0] == xPos) && (this.objectsPosArr[index][1] == yPos))
    }
    
    printGrid() {
        for(let i = 0; i < this.mWidth; i++) {
            for(let j = 0; j < this.mHeight; j++) {
                console.log(this.mArray[i][j]);
            }
        }
    }

    tilesUpdate() {
        for(let i = 0 ; i < this.mWidth; i++) {
            for(let n = 0; n < this.mHeight; n++) {
                this.tileArray[n][i].update();
            }
        }
    }

    update() {
        if (this.tileBounds[0].intersectsBound(this.tileBounds[17])){
            //https://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
            // Dispatch/Trigger/Fire the event
            document.dispatchEvent(this.event);
        }
        //update tiles
        this.tilesUpdate();
    }

    draw (camera) {
        //draw tiles pic
        for(let i = 0; i < this.mHeight; i++) {
            for(let j = 0; j < this.mWidth; j++) {
                this.tileArray[i][j].draw(camera);
            }
        }
        //draw objects pic
        //draw objects
        for(let i = 0; i < this.objectsPicArr.length; i++) {
            this.objectsPicArr[i].draw(camera);
        }
        //console.log(this.objectsPicArr.length);
        this.objectsPicArr[0].draw(camera);
        return;
    }
}

//Reference: https://www.youtube.com/watch?v=N8ONAZSsx80
async function sleep(seconds) {
    return new Promise((resolve => setTimeout(resolve, seconds)));
}

export default MapGrid;