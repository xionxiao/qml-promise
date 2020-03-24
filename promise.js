/**
* MIT License
* 
* Copyright (c) 2017 Allen Shaw
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

.pragma library

var Promise = function() {
    this.callbacks = [];
}

Promise.prototype = {

    resolve: function(result) {
        this.complete("resolve", result);
    },

    reject: function(result) {
        this.complete("reject", result);
    },

    complete: function(type, result) {
        while (this.callbacks[0]) {
            this.callbacks.shift()[type](result);
        }
    },

    then: function(success, failure) {
        this.callbacks.push({resolve: success, reject: failure});
        return this;
    }
}

var Loop = function() {
}

Loop.prototype = {
    init: function(list, func) {
        this.promise = new Promise();
        this.i = -1;
        this.list = list;
        this.func = func;
        return this.promise;
    },

    start: function() {
        this.next();
    },

    next: function() {
        this.i ++;
        if( this.i < this.list.length ) {
            this.func(this.list, this.i);
        } else {
            this.promise.resolve();
        }
    }
}

