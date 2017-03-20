Message = {}
Message.__index = Message

Message.TYPE = {
  UPDATE_PARAM='PARAM_UPDATE',
  REQUEST_PARAM_RANGE='REQUEST_PARAM_RANGE' 
};

function Message.new(init)
  local self = setmetatable({}, Message)
  local type = null;
  local payload = null;
end
  
function Account.constructor(type, payload)
  self.type = type;
  self.payload = payload;
end

function Account.transformToTransportable()
    return {
      type=self.type,
      payload=this.payload 
    };
end

function Account.getPayload()
    return this.payload;
end
