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

ltsocket.startReciever = function (onMessage)
  LrTasks.startAsyncTask(Debug.showErrors(  function()
    Debug.callWithContext( 'socket_remote', function( context )
    -- LrFunctionContext.callWithContext( 'socket_remote', function( context )
      local running = true
      local sender = LrSocket.bind {
        functionContext = context,
        port = 48763,
        mode = "receive",
        plugin = _PLUGIN,
        onConnecting = function( socket, port )
          -- TODO
        end,
        onConnected = function( socket, port )
          logger:trace('successful connection');
        end,
        onMessage = function( socket, message )
          logger:trace(message)
          onMessage(message)
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
      sender:close()
    end )
  end ))
end

return ltsocket;