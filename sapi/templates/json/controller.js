'use strict';

var fs = require('fs');
var <%= objectName %> = require('./<%= fileName %>.model');

/* Set up response functions */
function handleError (socket, err) {
  return socket.emit('error', {status: 500, json: err});
}
function buildResponse (statusCode, data)
{
    return {status: statusCode, json: data};
}

/* Load the objects */
<%= objectName %>.load(
    function(err)
    {
        console.error('Failed to load <%= objectName %> collection with error [%s]', err);
    });

/* Set up messages */
    <%= objectName %>.created = function(obj)
    {
        socket.emit('<%= objectName %>:created', obj);
    }
    <%= objectName %>.updated = function(obj)
    {
        socket.emit('<%= objectName %>:updated', obj);
    }
    <%= objectName %>.removed = function(obj)
    {
        socket.emit('<%= objectName %>:removed', obj);
    }
<% if (!filters.apidoc) { %>
/**
 * Get list of <%= objectName %>
 *
 * @param socket
 */<% } else { %>
/**
 * @api {get} /<%= instancesName %> Get a list of <%= instancesName %>
 * @apiVersion 0.1.0
 * @apiName On<%= objectsName %>
 * @apiGroup <%= objectsName %>
 *
 */<% } %>
exports.index = function (socket) {
    socket.on('index',
        function()
        {
            <%= objectName %>.list(
                function (err, <%= instancesName %>)
                {
                    if (err) { return handleError(socket, err); }
                    socket.emit('index', buildResponse(200, JSON.parse(<%= instancesName %>)));
                });
        });
};

<% if (!filters.apidoc) { %>
/**
 * Get a single <%= objectName %>
 *
 * @param socket
 */<% } else { %>
/**
 * @api {on} /<%= instancesName %>/:id Get a single <%= instanceName %>
 * @apiVersion 0.1.0
 * @apiName On <%= objectName %>
 * @apiGroup <%= objectsName %>
 *
 */<% } %>
exports.show = function (socket) {
    socket.on('show',
        function(id)
        {
           <%= objectName %>.find(id,
                function(err, obj)
                {
                    if (err) { return handleError(socket, err); }
                    socket.emit('show', buildResponse(200, obj));
                });
        });
};

<% if (!filters.apidoc) { %>
/**
 * Creates a new <%= objectName %> in the JSON File.
 *
 * @param socket
 */<% } else { %>
/**
 * @api {post} /<%= instancesName %> Create a new <%= instanceName %>
 * @apiVersion 0.1.0
 * @apiName Create<%= objectName %>
 * @apiGroup <%= objectsName %>
 *
 */<% } %>
exports.create = function (socket) {
    socket.on('create',
        function(data)
        {
            <%= objectName %>.create(data,
                function(err, obj)
                {
                    if (err) { return handleError(socket, err); }
                    socket.emit('create', buildResponse(201, obj));
                });
        });
};

<% if (!filters.apidoc) { %>
/**
 * Updates an existing <%= objectName %> in the JSON File.
 *
 * @param socket
 */<% } else { %>
/**
 * @api {put} /<%= instancesName %>/:id Updates an existing <%= instanceName %>
 * @apiVersion 0.1.0
 * @apiName Update<%= objectName %>
 * @apiGroup <%= objectsName %>
 *
 */<% } %>
exports.update = function (socket)
{
    socket.on('update',
        function(data)
        {
            <%= objectName %>.update(data.id, data.obj,
                function(err, obj)
                {
                    if (err) { return handleError(socket, err); }
                    socket.emit('update', buildResponse(200, obj));
                });
        });
 };
<% if (!filters.apidoc) { %>
/**
 * Deletes a <%= objectName %> from the JSON File.
 *
 * @param socket
 */<% } else { %>
/**
 * @api {delete} /<%= instancesName %>/:id Deletes a <%= instanceName %>
 * @apiVersion 0.1.0
 * @apiName Remove<%= objectName %>
 * @apiGroup <%= objectsName %>
 *
 */<% } %>
exports.destroy = function (socket) {
    socket.on('destroy',
        function(id)
        {
            <%= objectName %>.remove(id,
                function(err)
                {
                    if (err) { return handleError(socket, err); }
                    socket.emit('destroy', buildResponse(204, {}));
                });
        });
};
