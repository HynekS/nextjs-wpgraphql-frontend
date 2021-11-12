import openColor from "open-color";

const oc = (str: string | TemplateStringsArray) => {
  let adapter = Array.isArray(str) ? str[0] : str;
  let [, color, index]: [undefined, keyof openColor, number] =
    adapter.split("-");

  return index ? openColor[color][index] : openColor[color];
};

export default oc;
