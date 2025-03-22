"use client";

import { XIcon } from "lucide-react";
import { Toggle } from "./ui/toggle";
import { useState } from "react";

export function FilterChip({
  label,
  checked,
  ...toggleProps
}: {
  label: string;
  checked: boolean;
  [key: string]: unknown; // Allow additional props
}) {
  const [pressed, setPressed] = useState(checked);

  return (
    <Toggle
      variant="outline"
      className="flex items-center gap-2 rounded-full"
      pressed={pressed}
      onPressedChange={() => {
        setPressed(!pressed);
      }}
      {...toggleProps} // Pass additional props to Toggle
    >
      <span>{label}</span>
      <span className="ml-auto">{pressed && <XIcon />}</span>
    </Toggle>
  );
}
