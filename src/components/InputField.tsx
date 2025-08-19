import React, { useState } from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: string;
  clearable?: boolean;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  filled: "bg-gray-100 border border-gray-300 focus:border-blue-500",
  outlined: "border border-gray-400 focus:border-blue-500",
  ghost: "border-none bg-transparent focus:border-b-2 focus:border-blue-500",
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  loading,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={`w-full rounded-md pr-10 ${sizeClasses[size]} ${
            variantClasses[variant]
          } ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${invalid ? "border-red-500" : ""}`}
        />

        {/* Clear button */}
        {clearable && value && (
          <button
            type="button"
            onClick={() =>
              onChange?.({ target: { value: "" } } as React.ChangeEvent<
                HTMLInputElement
              >)
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
          >
            ✕
          </button>
        )}

        {/* Password toggle */}
        {type === "password" && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Messages */}
      {invalid && errorMessage ? (
        <p className="text-red-500 text-xs">{errorMessage}</p>
      ) : (
        helperText && <p className="text-gray-500 text-xs">{helperText}</p>
      )}
    </div>
  );
};
