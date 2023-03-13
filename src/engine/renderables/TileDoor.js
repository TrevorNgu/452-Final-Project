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

        //const door = document.querySelector(".TileDoor");

/*         //https://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
        // Add an event listener
        document.addEventListener("name-of-event", function(e) {
            console.log(e.detail); // Prints "Example of an event"
        }); */
    }

    draw(camera){

        console.log("Open = " +this.doorIsOpen);

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
/*         //https://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
        // Add an event listener
        document.addEventListener("name-of-event", function(e) {
            console.log(e.detail); // Prints "Example of an event"
        }); */
        //console.log("aaaaaaa");
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

    
    //setEvent(evnt){
        //this.tileEvent = evnt;//new Event(evnt);
        //const door = document.querySelector(".Tile");
        //https://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
        //document.addEventListener( this.tileEvent, function opendDoor() {
        //    console.log("aaaa");
        //    this.doorIsOpen = true;
        //}, false);

/*         document.addEventListener( this.tileEvent, function(e) {
            console.log(e.detail); // Prints "Example of an event"
            //console.log("second");
            //e.opendDoor(this);
        }); */
    //}
    

    setEvent(evnt){
        this.tileEvent = evnt;

        document.addEventListener( this.tileEvent, function(e) {
            //e.detail.Reference
            e.detail.Reference[0].setDoorOpen();
            console.log(e.detail.Reference);
        
        });

/*         console.log("open");
        this.doorIsOpen = true;
        this.hasCollision = false;
        console.log("LLLLLLLLLLLLLLLLLLLLLLLL"); */
    }

}

var scrollthis = {
    scrolldown: function () {
      // code that does stuff
    }
}

function myHendeler() {
    return true;
}

function opendDoor(obj) {
    console.log("open");
    obj.doorIsOpen = true;
    obj.hasCollision = true;
    console.log(obj.doorIsOpen);
    return true;
}

export default TileDoor;