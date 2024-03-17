import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function stringToColor(string) {
  if (!string) {
    // Handle the case where string is undefined or null
    return "#000000"; // Default color or any other value you prefer
  }
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export default function StringAvatar({ name }) {
  if (!name || typeof name !== "string") {
    // Handle the case where name is undefined, null, or not a string
    return null; // Default name or any other value you prefer
  }

  // Split the name into words and get the first character of each word
  const initials = name
    .split(" ")
    .map((word) => (word.length > 0 ? word[0] : ""))
    .join("");

  const avatarProps = {
    sx: {
      bgcolor: stringToColor(name),
      fontSize: 22,
      fontWeight: "bold",
    },
    children: initials,
  };

  return <Avatar {...avatarProps} />;
}
