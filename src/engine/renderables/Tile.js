/*
 * File: Tile.js
 *
 * Supports the drawing an entire file texture mapped onto an entire Renderable
 * 
 */
"use strict";

import * as glSys from "../core/gl.js";
import TextureRenderable from "./renderable.js";
import * as texture from "../resources/texture.js";
import * as shaderResources from "../core/shader_resources.js";

class Tile extends TextureRenderable{
    constructor(tex, evnt = null){
        super();
        this.texture = tex;
        this.hasCollision = false;
        this.hasEvent = false;
        this.tileEvent = evnt;
        if (this.tileEvent != null){
            this.hasEvent = true;
        }
    }

    draw(camera){
        // activate the texture
        //texture.activate(this.mTexture, glSys.get().TEXTURE0);
        
        //super.draw(camera);
        this.texture.draw(camera);
    } 

    update(){
        //Pixel-Touch Activation
        if (this.hasEvent == true){
            //PixelTouch with player-character object
            /**
            if (touches PC sprite){
                this.tileEvent.activate();
            }
            */
        }
    }

    setCollisionsMode(mode){
        //this.hasCollision = !this.hasCollision;
        this.hasCollision = mode;
    }

    getCollisionMode() {
        return this.hasCollision;
    }

    toggleEvent(){
        this.hasEvent = !this.hasEvent;
    }
}

export default Tile;