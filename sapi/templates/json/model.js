'use strict';

var fs  = require('fs');
var _   = require('lodash');

// if you want to track ids locally uncomment below.
/* Local ID */
//    var nextId = 0;

var collection = {
    raw: {},
    instances: {}
}
var <%= objectName %> = function(obj)
{
    /* Preform creation logic. */

    this.id = obj.id;
    collection.raw[this.id] = obj;
    exports.created(obj);
}
<%= objectName %>.update = function(obj)
{
    /* Preform update logic */
    this.id = obj.id;
    exports.updated(obj);
}
<%= objectName %>.remove = function(obj)
{
    /* Preform remove logic. */
    exports.removed(obj);
}

exports.save = function(cb)
{
    fs.writeFile('server/api/<%= fileName %>/<%= fileName %>.data.json', JSON.stringify(collection.raw, null, 2), 'utf-8', cb);
}
exports.load = function(cb)
{
    fs.readFile('server/api/<%= fileName %>/<%= fileName %>.data.json', 'utf-8',
        function(err, data)
        {
            if (err)
            {
                return cb(err);
            }
        
            collection.raw = JSON.parse(data);
            for(var id in collection.raw)
            {
                collection.instances[id] = new <%= objectName %>(collection.raw[id]);
                /* Local ID */
                /*
                    if (nextId < id)
                    {
                        nextId = id + 1;
                    }
                */

            }
    })
}

exports.create = function(obj, cb)
{
    /* Local ID */
    // obj.id = nextId;

    var inst = new <%= objectName %>(obj);
    collection.instances[inst.id] = inst;
    this.save(cb);

    /* Local ID */
    // nextId++;

}
exports.list = function(cb)
{
    setImmediate(
        function()
        {
            cb(null, _.values(collection.raw));
        });
}
exports.find = function(id, cb)
{
    if (_.isUndefined(collection.raw[id]))
    {
        var err = 'Id ' + id + ' was not found in <%= objectName %> collection';
        if (_.isUndefined(cb) )
        {
            return err;
        }
        else
        {
            setImmediate(
                function()
                {
                    cb(err);
                });
        }
    }
    else
    {
        if (_.isUndefined(cb) )
        {
            return collection.raw[id];
        }
        else
        {
            setImmediate(
                function()
                {
                    cb(null, collection.raw[id]);
                });
        }
    }
}
exports.update = function(id, changes, cb)
{
    if (_.isUndefined(collection.instances[id]) || _.isUndefined(collection.raw[id]))
    {
        setImmediate(
            function()
            {
                cb('Id ' + id + ' was not found in <%= objectName %> collection');
            });
    }
    else
    {
        collection.instances[id].update(changes, cb);
        this.save(cb);
    }
}
exports.delete = function(id, cb)
{
    if (_.isUndefined(collection.instances[id]) || _.isUndefined(collection.raw[id]))
    {
        setImmediate(
            function()
            {
                cb('Id ' + id + ' was not found in <%= objectName %> collection');
            });
    }
    else
    {
        collection.instances[id].remove();
        delete collection.instances[id];
        delete collection.raw[id];
        this.save(cb);
    }
}