local Require = require "Require".path("../debuggingtoolkit.lrdevplugin").reload()
local Debug = require "Debug"
require "strict"

local LrLogger = import 'LrLogger'
local logger = LrLogger('LIGHTTAB')
logger:enable("print")-- or "logfile"
JSON = require "JSON.lua";


Message = {}
Message.__index = Message

Message.TYPE = {
  UPDATE_PARAM='UPDATE_PARAM',
  REQUEST_PARAM_RANGE='REQUEST_PARAM_RANGE' 
};

function Message.new(type, payload)
  local self = setmetatable({}, Message)
  self.type = type;
  self.payload = payload;
  return self;
end

function Message.parseTransportMessage(self, json)
  local value = JSON:decode(json)
  if value["type"] and value["payload"] then
    self.type = value["type"] 
    self.payload = value["payload"] 
  end
end
  
function Message.transformToTransportable(self)
    local value = {
      type=self.type,
      payload=self.payload 
    };

    return JSON:encode(value);
end

function Message.getPayload(self)
    return self.payload;
end

return Message