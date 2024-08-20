import CryptoJS from "crypto-js";
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const capitalize = (str) => {
  return str?.charAt(0).toUpperCase() + str?.slice(1);
};

export const lowercase = (str) => {
  return str?.toLowerCase();
};

export const toCamelCase = (str) => {
  return str
    ?.toLowerCase()
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

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return formattedDate;
};

export function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export function encryptRole(role) {
  const encryptedRole = CryptoJS.AES.encrypt(role, SECRET_KEY).toString();

  localStorage.setItem("userRole", encryptedRole);
}

export function decryptRole() {
  const encryptedRole = localStorage.getItem("userRole");

  if (encryptedRole) {
    const bytes = CryptoJS.AES.decrypt(encryptedRole, SECRET_KEY);
    const decryptedRole = bytes.toString(CryptoJS.enc.Utf8);

    return decryptedRole;
  }

  return null;
}

export function clearRole() {
  localStorage.removeItem("userRole");
}

export const splitCategoryNameAndPrice = (categories) => {
  return categories.map((category) => {
    const parts = category.split(" ");
    const price = `${parts[parts.length - 2]} ${parts[parts.length - 1]}`;
    const name = parts.slice(0, parts.length - 2).join(" ");

    return { name, price };
  });
};


