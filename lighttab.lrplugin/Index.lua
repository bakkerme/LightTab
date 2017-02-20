local LrDevelopController = import 'LrDevelopController'
local LrLogger = import 'LrLogger'
local logger = LrLogger( 'LIGHTTAB' )
local LrSocket = import "LrSocket"
local LrTasks = import "LrTasks"
local LrPathUtils = import "LrPathUtils"
local LrFunctionContext = import "LrFunctionContext"
logger:enable( "print" ) -- or "logfile"
-- JSON = loadfile(LrPathUtils.child(_PLUGIN.path, "lib/JSON.lua")) 
JSON = require "JSON.lua";



--
--
-- if WIN_ENV == true then
--      			command = '"' .. LrPathUtils.child( LrPathUtils.child( _PLUGIN.path, "win" ), "LightroomCreatorXMP.exe" )
-- 		quotedCommand = '"' .. command .. '"'
-- else
-- 		command = '"' .. LrPathUtils.child( LrPathUtils.child( _PLUGIN.path, "mac" ), "LightroomCreatorXMP" )
-- 		quotedCommand = command
-- end
--
-- if LrTasks.execute( quotedCommand ) ~= 0 then
-- 	renditionToSatisfy:renditionIsDone( false, "Failed to contact XMP Application" )
-- end

local min,max = LrDevelopController.getRange("Temperature")
logger:trace( "Range")
logger:trace( min )
logger:trace( max )

LrTasks.startAsyncTask( function()
  LrFunctionContext.callWithContext( 'socket_remote', function( context )
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
        handleImageChangeEvent(message)
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
end )

function handleImageChangeEvent(message)
  local value = JSON:decode(message)
  logger:trace('handle change')
  logger:trace(value["value"])
  setImageParamValue(value["param"], value["value"])
end


function setImageParamValue(devParam, value)
  logger:trace(devParam, value);
  LrDevelopController.setValue(devParam, value)
end


-- LrDevelopController.increment("Temperature")
-- LrDevelopController.increment("Temperature")
-- LrDevelopController.increment("Temperature")
-- LrDevelopController.increment("Temperature")
-- LrDevelopController.increment("Temperature")
-- LrDevelopController.increment("Temperature")
-- LrDevelopController.increment("Temperature")
-- LrDevelopController.increment("Temperature")
-- LrDevelopController.increment("Temperature")
-- LrDevelopController.increment("Temperature")
-- LrDevelopController.increment("Temperature")
-- LrDevelopController.increment("Temperature")
-- LrDevelopController.increment("Temperature")
-- LrDevelopController.increment("Temperature")
