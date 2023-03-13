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
    constructor(tex){
        super();
        this.texture = tex;
        this.hasCollision = false;
        this.hasEvent = false;
        this.dynamic = false;

        this.objTexture1 = null;
        this.objTexture2 = null;

/*         this.tileEvent = evnt;
        if (this.tileEvent != null){
            this.hasEvent = true;
        } */
    }

    draw(camera){
        // activate the texture
        //texture.activate(this.mTexture, glSys.get().TEXTURE0);
        
        //super.draw(camera);
        this.texture.draw(camera);

        if(this.objTexture1 != null) {
            this.objTexture1.draw(camera);
        }
        if(this.objTexture2 != null) {
            this.objTexture2.draw(camera);
        }
    } 

    update(){
        
    }

    setCollisionsMode(mode){
        //this.hasCollision = !this.hasCollision;
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

    setDynamicMode(mode) {
        this.dynamic = mode;
    }

    setFirstTextureObject(textrue) {
        this.objTexture1 = textrue;
    }

    setSecondTextureObject(textrue) {
        this.objTexture2 = textrue;
    }

    getFirstTextureObject() {
        return this.objTexture1;
    }

    getSecondTextureObject() {
        return this.objTexture2;
    }
}

export default Tile;