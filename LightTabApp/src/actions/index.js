export const updateParam = (param, value) => {
  return {
    type: "UPDATE_PARAM",
    param: param,
    value: value
  }
}