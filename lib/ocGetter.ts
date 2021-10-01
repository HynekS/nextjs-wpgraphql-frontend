import openColor from "open-color";

const oc = (str) => {
  let adapter = Array.isArray(str) ? str[0] : str;
  let [, color, index] = adapter.split("-");
  return index ? openColor[color][index] : openColor[color];
};

export default oc