import { spain_cities } from "@/constant/provinces";
import { data } from "autoprefixer";
import CryptoJS from "crypto-js";
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const generatePassword = (length = 8) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

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
    const price = `${parts[parts.length - 2]}`;
    const name = parts.slice(0, parts.length - 2).join(" ");

    return { name, price };
  });
};

export function separateGender(inputStrings) {
  const match = inputStrings.match(/\b[MF]+\b/);
  const gender = match ? match[0] : null;

  return gender;
}

export function getGenderOptions(input) {
  const gender = separateGender(input);
  const options = [];
  if (gender.includes("M")) {
    options.push("Masculino");
  }
  if (gender.includes("F")) {
    options.push("Femenino");
  }
  return options;
}

export function getGenderOptions2(input, teammateGenders) {
  const originalGenders = separateGender(input).split("");
  const options = [];
  const registeredGenders = teammateGenders.map((mate) => mate[0]);
  if (
    registeredGenders.filter((mate) => mate === "M").length <
    originalGenders.filter((mate) => mate === "M").length
  ) {
    options.push("Masculino");
  }

  if (
    registeredGenders.filter((mate) => mate === "F").length <
    originalGenders.filter((mate) => mate === "F").length
  ) {
    options.push("Femenino");
  }

  return options;
}

export function getCities(id) {
  return spain_cities.filter((city) => {
    if (city.id.startsWith(id)) {
      return city.nm;
    }
  });
}

export function formatDOB(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatTimestamp(timestampString) {
  const regex = /Timestamp\(seconds=(\d+),/;
  const match = timestampString.match(regex);

  if (match && match[1]) {
    const seconds = parseInt(match[1], 10);
    const date = new Date(seconds * 1000);
    return date.toISOString().replace("T", " ").split(".")[0];
  } else {
    const date = new Date(timestampString);
    return date.toISOString().replace("T", " ").split(".")[0];
  }
}
