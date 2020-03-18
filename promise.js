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

