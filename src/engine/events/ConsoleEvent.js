/*
 * File: ConsoleEvent.js
 *
 * Supports the drawing an entire file texture mapped onto an entire Renderable
 * 
 */
"use strict";

class ConsoleEvent extends Event {
    constructor(){
        this.message = "";
        if (this.constructor === ConsoleEvent){
            this.message = "Event Triggered";
        }
    }

    activate(){
        console.log("Event Triggered");
    }

    setMessage(msg) {
        this.message = msg;
    }
}