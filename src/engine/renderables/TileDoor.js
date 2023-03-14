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
import Tile from "./Tile.js";

class TileDoor extends Tile{
    constructor(tex, evnt = null){
        super();
        this.texture = tex;
        this.hasCollision = true;
        this.hasEvent = false;
        this.tileEvent = "";//new Event(evnt);
        this.dynamic = false;

        this.objTexture1 = null;
        this.objTexture2 = null;

        if (this.tileEvent != null){
            this.hasEvent = true;
        }

        this.doorIsOpen = false;
    }

    draw(camera){
        //draw background
        this.texture.draw(camera);
        //draw background tile textures 
        if(this.objTexture1 != null) {
            this.objTexture2.draw(camera);
        }
        if(this.objTexture2 != null) {
            if((this.doorIsOpen != true)) {
                this.objTexture1.draw(camera);
            }
        }
    } 

    update() {
    }

    setTexture(texture) {
        this.texture = texture;
    }

    setFirstTextureObject(textrue) {
        this.objTexture1 = textrue;
    }

    setSecondTextureObject(textrue) {
        this.objTexture2 = textrue;
    }

    setDoorOpen() {
        this.doorIsOpen = true;
        this.hasCollision = false;
    }

    setEvent(evnt){
        //assign event
        this.tileEvent = evnt;
        //creat event listener
        document.addEventListener( this.tileEvent, function(e) {
            e.detail.Reference[0].setDoorOpen();
            console.log(e.detail.Reference);
        });
    }
}

export default TileDoor;