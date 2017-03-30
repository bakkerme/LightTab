local Require = require "Require".path("../debuggingtoolkit.lrdevplugin").reload()
local Debug = require "Debug"
require "strict"

local LrDevelopController = import 'LrDevelopController'
local LrLogger = import 'LrLogger'
local logger = LrLogger('LIGHTTAB')
logger:enable("print")
-- or "logfile"

developmentParams = require "developmentParams.lua"
Ltsocket = require "socket.lua"
Message = require "message.lua"

local sendSocket

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

local sendParamRange = function(param)
    logger:trace('param to get range', param)
    if developmentParams:isAvailableDevelopmentParam(param) then
        local min,max = LrDevelopController.getRange(param)
        local message = Message.new(
            Message.TYPE['REQUEST_PARAM_RANGE'], 
            {
                param = param, 
                value = {min=min, max=max}
            }
        )
        
        Ltsocket.sendMessage(message, socket);
    end
end

--  -------------------- IMAGE CHANGE -------------------- --
local setImageParamValue = function(devParam, value)
    logger:trace(devParam, value)
    LrDevelopController.setValue(devParam, value)
end

local handleImageChangeEvent = function(message)
    logger:trace('handle change')
    logger:trace(message["param"])
    
    if developmentParams:isAvailableDevelopmentParam(message["param"]) then
        logger:trace("Available, applying now!")
        setImageParamValue(message["param"], message["value"])
    end
end

local handleMessageEvent = function(message)
    logger:trace(message)
    local messageClass = Message.new()
    messageClass:parseTransportMessage(message)
    
    if messageClass['type'] == Message.TYPE['UPDATE_PARAM'] then
        handleImageChangeEvent(messageClass:getPayload())
    end
    
    if messageClass['type'] == Message.TYPE['REQUEST_PARAM_RANGE'] then
        sendParamRange(messageClass:getPayload()['param'])
    end
end

local handleSenderConnected = function(socket)
    sendSocket = socket
    socket:send('test\n')
end

Ltsocket.startReciever(handleMessageEvent)
