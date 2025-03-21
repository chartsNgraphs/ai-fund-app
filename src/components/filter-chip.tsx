"use client";

import { XIcon } from "lucide-react";
import { Toggle } from "./ui/toggle";
import { useState } from "react";

export function FilterChip({
  label,
  checked,
}: {
  label: string;
  checked: boolean;
}) {
  const [pressed, setPressed] = useState(checked);

  return (
    <Toggle
      variant="outline"
      className="flex items-center gap-2"
      pressed={pressed}
      onPressedChange={() => {
        setPressed(!pressed);
      }}
    >
      <span>{label}</span>
      <span className="ml-auto">{pressed && <XIcon />}</span>
    </Toggle>
  );
}
