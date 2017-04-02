local Require = require "Require".path("../debuggingtoolkit.lrdevplugin").reload()
local Debug = require "Debug"
require "strict"

local LrLogger = import 'LrLogger'
local logger = LrLogger( 'LIGHTTAB' )
logger:enable( "print" ) -- or "logfile"

local LrTasks = import "LrTasks"
local LrPathUtils = import "LrPathUtils"
local LrFunctionContext = import "LrFunctionContext"
local LrSocket = import "LrSocket"

local ltsocket = {}

ltsocket.startReciever = function (onMessageCallback)
  LrTasks.startAsyncTask(Debug.showErrors(  function()
    Debug.callWithContext( 'socket_remote', function( context )
    -- LrFunctionContext.callWithContext( 'socket_remote', function( context )
      local running = true
      local reciever = LrSocket.bind {
        functionContext = context,
        port = 48763,
        mode = "receive",
        plugin = _PLUGIN,
        onConnecting = function( socket, port )
          -- TODO
        end,
        onConnected = function( socket, port )
          logger:trace('successful connection, reciever');
        end,
        onMessage = function( socket, message )
          logger:trace('The message is:')
          logger:trace(message)
          onMessageCallback(message)
        end,
        onClosed = function( socket )
          running = false
        end,
        onError = function( socket, err )
          if err == "timeout" then
            socket:reconnect()
          end
        end,
      }
      while running do
        LrTasks.sleep( 1/2 ) -- seconds
      end
      reciever:close()
    end )
  end ))
end

local maxSendConnections = 5
local currentSendConnections = 0
ltsocket.startSender = function (onConnectedCallback)
  LrTasks.startAsyncTask(Debug.showErrors(  function()
    Debug.callWithContext( 'socket_remote', function( context )
    -- LrFunctionContext.callWithContext( 'socket_remote', function( context )
      local running = true
      local sender = LrSocket.bind {
        functionContext = context,
        port = 48764,
        mode = "send",
        plugin = _PLUGIN,
        onConnecting = function( socket, port )
          -- TODO
          logger:trace('on connecting');
          socket:send( "Hello world" )
        end,
        onConnected = function( socket, port )
          logger:trace('successful connection, sender');
          onConnectedCallback(socket)
        end,
        onMessage = function( socket, message )
          -- Not used due to sender
        end,
        onClosed = function( socket )
          logger:trace('closing sender');
          running = false
        end,
        onError = function( socket, err )
          if err == "timeout" and currentSendConnections < maxSendConnections then
            currentSendConnections = currentSendConnections+1 
            socket:reconnect()
          end
        end,
      }
      while running do
        LrTasks.sleep( 1/2 ) -- seconds
      end
      sender:close()
    end )
  end ))
end

ltsocket.sendMessage = function(message, socket)
  socket:send(message.transformToTransportable())
end

return ltsocket;