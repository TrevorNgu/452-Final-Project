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
        this.hasCollision = false;
        this.hasEvent = false;
        this.tileEvent = new Event(evnt);
        this.dynamic = false;

        this.objTexture1 = null;
        this.objTexture2 = null;

        if (this.tileEvent != null){
            this.hasEvent = true;
        }

        //const door = document.querySelector(".TileDoor");

/*         //https://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
        // Add an event listener
        document.addEventListener("name-of-event", function(e) {
            console.log(e.detail); // Prints "Example of an event"
        }); */
    }

    draw(camera){
        this.texture.draw(camera);
        //draw background tile textures 
        if(this.objTexture1 != null) {
            this.objTexture2.draw(camera);
        }
        if(this.objTexture2 != null) {
            this.objTexture1.draw(camera);
        }
    } 

    update() {
/*         //https://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
        // Add an event listener
        document.addEventListener("name-of-event", function(e) {
            console.log(e.detail); // Prints "Example of an event"
        }); */
        console.log("aaaaaaa");
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

}

export default Tile;