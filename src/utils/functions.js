export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (/\s+/.test(match)) return "";
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
};

export const lockScroll = () => {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollbarWidth}px`;
};

export const unlockScroll = () => {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
};
