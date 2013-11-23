//#1
if (typeof Function.prototype.myBind === 'undefined') {
    Function.prototype.myBind = function (context) {
        var self = this;
        return function (e) {
            self.call(context, e);
        }
    };
}

var App = function App() {
    return {
        init: function () {
            this.nodes = document.querySelectorAll('div.node');
            this.lolypop = "sweet";
            this.setListeners();
        },
        setListeners: function () {
            [].slice.call(this.nodes).forEach(function (n) {
                n.onclick = this.onClick.myBind(this);
            }, this);
        },
        onClick: function (e) {
            e = e || window.event;
            var node = e.target || e.srcElement;
            console.log(parseInt(node.innerHTML));
            console.log(this.lolypop);
        }
    };
};

//#2
var Person = function Person(args) {
    var extend = function extend(obj, args) {
        for (var i in args) {
            obj[i] = args[i];
        }
        return obj;
    }

    var obj = extend({}, args);
    return obj;
};

//#3
var Person2 = function Person2(args) {
    var capitalizeFirst = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    var extend = function extend(obj, args) {
        var i;
        for (i in args) {
            (function (i) {
                if (typeof args[i] === 'function') {
                    obj[i] = args[i]
                } else {
                    obj["get" + capitalizeFirst(i)] = function () {
                        return args[i]
                    };
                    obj["set" + capitalizeFirst(i)] = function (newVal) {
                        args[i] = newVal
                    }
                }
            })(i)
        }
        return obj;
    }

    var obj = extend({}, args);
    return obj;
}

//#4
var $ = function (selector) {
    var domSelected = document.querySelectorAll(selector);
    var DOMEl = function (domElements) {
        return  {
            height: function (height) {
                for (var i = 0; i < domElements.length; i++) {
                    domElements[i].style.height = height+"px";
                }
            },
            width: function (width) {
                for (var i = 0; i < domElements.length; i++) {
                    domElements[i].style.width = width+"px";
                }
            }
        }
    }

    return new DOMEl(domSelected);
}