var Path = require('path');

exports.register = function (plugin, options, next) {

    plugin.route({
        method: 'GET',
        path: '/',
        config: {
            pre: [
                [
                    { method: 'npm.version()', assign: 'version' },
                    { method: 'npm.downloads()', assign: 'downloads' },
                    { method: 'github.issues()', assign: 'issues' },
                    { method: 'github.commits()', assign: 'commits' },
                    { method: 'community()', assign: 'community' }
                ],
                { method: 'github.latestUpdate', assign: 'latestUpdate' }
            ],
            handler: function (request, reply) {

                reply.view('index', request.pre);
            }
        }
    });

    plugin.route({
        method: 'GET',
        path: '/hapidays',
        config: {
            handler: {
                view: 'hapidays'
            }
        }
    });

    plugin.route({
        method: 'GET',
        path: '/community',
        config: {
            pre: [
                { method: 'community()', assign: 'community' }
            ],
            handler: function (request, reply) {

                reply.view('community', request.pre);
            }
        }
    });

    plugin.route({
        method: 'GET',
        path: '/plugins',
        config: {
            pre: [
                { method: 'plugins()', assign: 'plugins' }
            ],
            handler: function (request, reply) {

                reply.view('plugins', request.pre);
            }
        }
    });

    plugin.route({
        method: 'GET',
        path: '/contribute',
        config: {
            pre: [
                { method: 'github.repos()', assign: 'repos' },
                [
                    { method: 'github.newContributorIssues', assign: 'newContributorIssues' },
                    { method: 'github.helpWantedIssues', assign: 'helpWantedIssues' }
                ]
            ],
            handler: function (request, reply) {

                reply.view('contribute', request.pre);
            }
        }
    });

    plugin.route({
        method: 'GET',
        path: '/help',
        config: {
            handler: {
                view: 'help'
            }
        }
    });

    plugin.route({
        method: 'GET',
        path: '/favicon.ico',
        config: {
            handler: {
                file: 'public/img/favicon.png'
            }
        }
    });

    plugin.route({
        method: 'GET',
        path: '/public/{path*}',
        config: {
            handler: {
                directory: {
                    path: Path.join(__dirname, '..', 'public'),
                    index: false,
                    redirectToSlash: false
                }
            }
        }
    });

    next();
};

exports.register.attributes = {
    name: 'routes',
    version: '1.0.0'
};