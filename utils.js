const get = function (selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  } else {
    throw new Error(`please check element, ${selection} does not exist`);
  }
};

export default get;
