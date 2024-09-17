import { useState, useEffect } from "react";

export const useRandomColor = () => {
  const [color, setColor] = useState<string>("#000000");

  useEffect(() => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setColor(randomColor);
  }, []);

  return color;
};
