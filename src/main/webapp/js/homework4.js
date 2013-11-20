function getObject(path, object) {
    function inner(path, object){
        if (path.length == 1) {
            return object[path[0]];
        }
        else {
            var head = path.slice(0, 1)[0];
            var tail = path.slice(1, path.length)
            if (object.hasOwnProperty(head)) {
               return inner(tail, object[head])
            }
        }
    }

    var p = path.split(".");
    return inner(p, object);
}

function deepCopy(object){
    var copyArray = function copyArray(field, array){
        for(var j in field){
            var item = field[j];
            if(item && typeof item === 'object'){
                array.push(copyObject(item, {}));
            }
            if(typeof item === 'boolean'
                || typeof item === 'number'
                || typeof item === 'string'
                || typeof item === 'function'){
                array.push(item);
            }
            if(item instanceof Date){
                array.push(new Date(item));
            }
            if(item instanceof Array){
                array.push(copyArray(item,[]))
            }
        }
        return array;
    }

    var copyObject = function copyObject (o, copy){
        for (var i in o) {
            var field = o[i];
            if(field && typeof field === 'object' && !(field instanceof Array)){
                copy[i] =  copyObject(field, {})
            } else {
               if(typeof field === 'boolean'
                    || typeof field === 'number'
                    || typeof field === 'string'
                    || typeof field === 'function'){
                    copy[i] = field;
               }
               if(field instanceof Date){
                   copy[i] = new Date(field)
               }
               if(field instanceof Array){
                  copy[i] = copyArray(field, []);
               }
            }
        }
        return copy;
    }

    return copyObject(object, {})
}

var getFriends = function(userId, people) {
    //field is a name of target value for objects in list
    function contains(array, target, field){
        for(var i=0; i<array.length; i++){
            var tocheckWith = typeof field === 'undefined'?array[i]:array[i][field]
            if(target === tocheckWith) return true;
        }
        return false
    }

    if(!people) return null;
    if(!contains(people, userId, 'id')) return null;
    var userFriends = [];
    var index;
    for(index in people){
        var person = people[index];
        if(person.friends && contains(person.friends, userId)) userFriends.push(person)
    }
    return userFriends;
};