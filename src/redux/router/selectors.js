export const getType = ({ location }) => location.type;

export const getParam = ({ location }, key) => location.payload[key];
