/*
 * File: Event.js
 *
 * Supports the drawing an entire file texture mapped onto an entire Renderable
 * 
 */
"use strict";

class Event {
    constructor(){
        if (this.constuctor === Event){
            throw new Error("Can't instantiate abstract");
        }
        this.type = 'event';

    }

    activate(){
        return;
    }
}

export default Event;