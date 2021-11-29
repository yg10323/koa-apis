{
    _events: [Object: null prototype] { },
    parentNsps: Map { },
    _path: '/socket.io',
        clientPathRegex: /^\/socket\.io\/socket\.io(\.msgpack|\.esm)?(\.min)?\.js(\.map)?(?:\?|$)/,
            _connectTimeout: 45000,
                _serveClient: true,

                    encoder: Encoder { },

    opts: { allowEIO3: true, cors: { methods: [Array], credentials: true } },
    eio: Server {
        _eventsCount: 1,
            _maxListeners: undefined,
                clients: { S5ihgqkHYp2raGjGAAAA: [Socket] },
        clientsCount: 1,
            opts: {
            wsEngine: [class WebSocketServer extends EventEmitter],
                pingTimeout: 20000,
                    pingInterval: 25000,
                        upgradeTimeout: 10000,
                            maxHttpBufferSize: 1000000,
                                transports: [Array],
                                    allowUpgrades: true,
                                        httpCompression: [Object],
                                            cors: [Object],
                                                allowEIO3: true,
                                                    path: '/socket.io'
        },
        corsMiddleware: [Function: corsMiddleware],
            ws: WebSocketServer {
            _events: [Object: null prototype],
                _eventsCount: 1,
                    _maxListeners: undefined,
                        options: [Object],
                            _state: 0,
                                [Symbol(kCapture)]: false
        },
        [Symbol(kCapture)]: false
    },
    httpServer: Server {
        insecureHTTPParser: undefined,
            _events: [Object: null prototype] {
            connection: [Function: connectionListener],
                close: [Function: bound close],
                    listening: [Function: bound init],
                        upgrade: [Function],
                            request: [Function]
        },
        _eventsCount: 5,
            _maxListeners: undefined,
                _connections: 1,
                    _handle: TCP {
            reading: false,
                onconnection: [Function: onconnection],
                    [Symbol(owner_symbol)]: [Circular]
        },
        _usingWorkers: false,
            _workers: [],
                _unref: false,
                    allowHalfOpen: true,
                        pauseOnConnect: false,
                            httpAllowHalfOpen: false,
                                timeout: 120000,
                                    keepAliveTimeout: 5000,
                                        maxHeadersCount: null,
                                            headersTimeout: 60000,
                                                _connectionKey: '6::::1070',
                                                    [Symbol(IncomingMessage)]: [Function: IncomingMessage],
                                                        [Symbol(ServerResponse)]: [Function: ServerResponse],
                                                            [Symbol(kCapture)]: false,
                                                                [Symbol(asyncId)]: 17
    },
    engine: Server {
        _events: [Object: null prototype] {
            connection: [Function: bound onconnection]
        },
        _eventsCount: 1,
            _maxListeners: undefined,
                clients: { S5ihgqkHYp2raGjGAAAA: [Socket] },
        clientsCount: 1,
            opts: {
            wsEngine: [class WebSocketServer extends EventEmitter],
                pingTimeout: 20000,
                    pingInterval: 25000,
                        upgradeTimeout: 10000,
                            maxHttpBufferSize: 1000000,
                                transports: [Array],
                                    allowUpgrades: true,
                                        httpCompression: [Object],
                                            cors: [Object],
                                                allowEIO3: true,
                                                    path: '/socket.io'
        },
        corsMiddleware: [Function: corsMiddleware],
            ws: WebSocketServer {
            _events: [Object: null prototype],
                _eventsCount: 1,
                    _maxListeners: undefined,
                        options: [Object],
                            _state: 0,
                                [Symbol(kCapture)]: false
        },
        [Symbol(kCapture)]: false
    },
    [Symbol(kCapture)]: false
}