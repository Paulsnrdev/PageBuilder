"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export function PasswordInput({
  name,
  placeholder,
  required,
  minLength,
  className,
}: {
  name: string;
  placeholder: string;
  required?: boolean;
  minLength?: number;
  className: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        name={name}
        required={required}
        minLength={minLength}
        placeholder={placeholder}
        className={`${className} pr-10`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="flex items-center px-3 text-zinc-400 transition hover:text-zinc-600"
        style={{ position: "absolute", top: 0, bottom: 0, right: 0 }}
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
      </button>
    </div>
  );
}
