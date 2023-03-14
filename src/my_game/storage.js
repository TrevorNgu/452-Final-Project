"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";
import MapGrid from "../engine/MapGrid.js";
import Tile from "../engine/renderables/Tile.js";

import Hero from "./hero.js";
import LowerEngine from "./lower_engine.js";
import MyGame from "./my_game.js";
import Shields from "./shields.js";


// potential texture: https://www.pngall.com/spot-light-png/download/68214

class Storage extends engine.Scene {
    constructor() {
        super();

        this.kMinionSprite = "assets/minion_sprite.png";
        this.kUp = "assets/up.png";
        this.kTest = "assets/pete.png";
        this.kBg = "assets/bg.png";

        this.mDefaultTilePic = "assets/tileDefPic.png";
        this.mTilePic = "assets/tilePic.png";

        this.mCrew = "assets/hero.png";
        
        this.mMogusX = 6;
        this.mMogusY = 2;

        // The camera to view the scene
        this.mCamera = null;
        this.mBg = null;
        this.mHero = null;
        this.mTest = null;

        this.mMsg = null;

        this.mU = 0.5;
        this.mV = 0.5;
        this.mW = 0.3;
        this.mH = 0.3; 
        this.mTheta = 0;

        this.mGrid = null;
    }

    load() {
        engine.texture.load(this.mDefaultTilePic);
        engine.texture.load(this.mTilePic);

        engine.texture.load(this.kBg);
        engine.texture.load(this.mCrew);
    }

    unload() {
        engine.texture.unload(this.mDefaultTilePic);
        engine.texture.unload(this.mTilePic);

        engine.texture.unload(this.kBg);
        engine.texture.unload(this.mCrew);
    }

    init() {
        this.mGrid = new engine.MapGrid(8,8);
        this.mGrid.setGridPos(27,16);
        this.mGrid.setTile(this.mDefaultTilePic, 8, 8);
        this.mGrid.createTilePicturesForGrid();
        this.mGrid.forceSetGridColor([.1, .1, .1, .8]);
        this.mGrid.createObject(this.mCrew, this.mMogusX, this.mMogusY);

        for(let i = 0; i < 8; i++) {
            this.mGrid.createObject(this.mDefaultTilePic, 0, i, [.4, .4, .4, .8]);
            this.mGrid.createObject(this.mDefaultTilePic, i, 7, [.4, .4, .4, .8]);
            this.mGrid.createObject(this.mDefaultTilePic, 7, i, [.4, .4, .4, .8]);
            this.mGrid.createObject(this.mDefaultTilePic, i, 0, [.4, .4, .4, .8]);
        }

        for(let i = 2; i < 6; i++) {
            for(let j = 3; j < 5; j++) {
                this.mGrid.createObject(this.mDefaultTilePic, i, j, [.2, .2, .4, .8]);
            }
        }
        
        this.mGrid.createObject(this.mDefaultTilePic, 0, 3, [.2, .2, 0, .8]);
        this.mGrid.createObject(this.mDefaultTilePic, 0, 4, [.2, .2, 0, .8]);        
        this.mGrid.createObject(this.mDefaultTilePic, 7, 3, [.2, .2, 0, .8]);
        this.mGrid.createObject(this.mDefaultTilePic, 7, 4, [.2, .2, 0, .8]);
        this.mGrid.createObject(this.mDefaultTilePic, 3, 7, [.2, .2, 0, .8]);
        this.mGrid.createObject(this.mDefaultTilePic, 4, 7, [.2, .2, 0, .8]);

        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(50, 40), // position of the camera
            100,                       // width of camera
            [0, 0, 1000, 800]           // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
        // sets the background to gray

        this.mBg = new engine.TextureRenderable(this.kBg);
        this.mBg.getXform().setSize(150, 150);
        this.mBg.getXform().setPosition(50, 40);

    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

        this.mCamera.setViewAndCameraMatrix();
        this.mBg.draw(this.mCamera);

        this.mGrid.draw(this.mCamera);

    }

    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {
        this.objectControler();

        if(this.mGrid.checkObjectPosition(0, 0, 3) || this.mGrid.checkObjectPosition(0, 0, 4)) {
            this.nextLowerEngine();
        } else if(this.mGrid.checkObjectPosition(0, 3, 7) || this.mGrid.checkObjectPosition(0, 4, 7)) {
            this.nextCafe();
        } else if(this.mGrid.checkObjectPosition(0, 7, 3) || this.mGrid.checkObjectPosition(0, 7, 4)) {
            this.nextShields();
        }
    }

    objectControler() {
        if (engine.input.isKeyPressed(engine.input.keys.X)) {
            this.mGrid.moveObjectToSpecTile(0, 1, 1);
        }
        //Controler
        if (engine.input.isKeyClicked(engine.input.keys.Up)) {
            this.mGrid.moveObjectInDerection(0, 0, 1);

        }
        if (engine.input.isKeyClicked(engine.input.keys.Down)) {
            this.mGrid.moveObjectInDerection(0, 0, -1);
        }
        if (engine.input.isKeyClicked(engine.input.keys.Left)) {
            this.mGrid.moveObjectInDerection(0, -1, 0);
        }
        if (engine.input.isKeyClicked(engine.input.keys.Right)) {
            this.mGrid.moveObjectInDerection(0, 1, 0);
        }

    }
    
    nextLowerEngine() {
        super.next();
        
        let nextLevel = new LowerEngine();
        nextLevel.setMogusPos(6, 3);
        nextLevel.start();
    }

    nextCafe() {
        super.next();

        let nextLevel = new MyGame();
        nextLevel.setMogusPos(3, 1);
        nextLevel.start();
    }

    nextShields() {
        super.next();
        let nextLevel = new Shields();
        nextLevel.setMogusPos(1, 3);
        nextLevel.start();
    }

    setMogusPos(xPos, yPos) {
        this.mMogusX = xPos;
        this.mMogusY = yPos;
    }
}

export default Storage;