local Require = require "Require".path("../debuggingtoolkit.lrdevplugin").reload()
local Debug = require "Debug"
require "strict"

local LrDevelopController = import 'LrDevelopController'
local LrLogger = import 'LrLogger'
local logger = LrLogger('LIGHTTAB')
logger:enable("print")-- or "logfile"
JSON = require "JSON.lua";
developmentParams = require "developmentParams.lua"
Ltsocket = require "socket.lua"

-- Debug.pauseIfAsked()
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
-- local min,max = LrDevelopController.getRange("Temperature")
-- logger:trace( "Range")
-- logger:trace( min )
-- logger:trace( max )
--Start the socket reciever

local setImageParamValue = function (devParam, value)
    logger:trace(devParam, value);
    LrDevelopController.setValue(devParam, value)
end

local handleImageChangeEvent = function (message)
    local value = JSON:decode(message)
    logger:trace('handle change')
    logger:trace(value["param"])
    
    if developmentParams:isAvailableDevelopmentParam(value["param"]) then
        logger:trace("Available, applying now!")
        setImageParamValue(value["param"], value["value"])
    end
end

Ltsocket.startReciever(handleImageChangeEvent)