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
        this.tileEvent = new Event(evnt);
        this.dynamic = false;

        this.objTexture1 = null;
        this.objTexture2 = null;

        if (this.tileEvent != null){
            this.hasEvent = true;
        }


        const door = document.querySelector(".Tile");
    }

    draw(camera){
        this.texture.draw(camera);
        //draw background tile textures 
        if(this.objTexture1 != null) {
            this.objTexture1.draw(camera);
        }
        if(this.objTexture2 != null) {
            this.objTexture2.draw(camera);
        }
    } 

    update(){
        //Pixel-Touch Activation

        door.addEventListener("click", e => {
            console.log("door");
        })
    }

    setCollisionsMode(mode){
        this.hasCollision = mode;
    }

    getCollisionMode() {
        return this.hasCollision;
    }

    getDynamicMode() {
        return this.dynamic;
    }

    getTexture() {
        return this.texture;
    }

    toggleEvent(){
        this.hasEvent = !this.hasEvent;
    }

    setEvent(evnt){
        this.tileEvent = new Event(evnt);
    }
    setDynamicMode(mode) {
        this.dynamic = mode;
    }

    setFirstTextureObject(tex) {
        this.objTexture1 = tex;
    }

    setSecondTextureObject(tex) {
        this.objTexture2 = tex;
    }

    getFirstTextureObject() {
        return this.objTexture1;
    }

    getSecondTextureObject() {
        return this.objTexture2;
    }
}

export default Tile;