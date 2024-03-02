import * as React from "react";

import { cn } from "@/lib/utils";

import {
  ComponentPropsWithoutRef,
  LegacyRef,
  ReactNode,
  forwardRef,
} from "react";
import { twMerge } from "tailwind-merge";

export type InputProps = ComponentPropsWithoutRef<"input"> & {
  error?: boolean;
};

export type InputContainerProps = ComponentPropsWithoutRef<"div"> & {
  error?: boolean;
  errorMessage?: string;
  errorNoWrap?: boolean;
};

export type InputLabelProps = ComponentPropsWithoutRef<"label"> & {
  children: ReactNode;
};
export type InputIconContainerProps = ComponentPropsWithoutRef<"label"> & {
  children: ReactNode;
  Icon?: React.ElementType;
};

export type InputLabelTextProps = ComponentPropsWithoutRef<"p"> & {
  children: ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md border border-input bg-transparent px-3 py-3 text-sm leading-none  shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
          error ? "border-red-500 !ring-0" : "focus:ring-1 focus:ring-ring",
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

const InputContainer = forwardRef(
  (
    {
      className,
      error,
      errorMessage,
      errorNoWrap = true,
      children,
      ...rest
    }: InputContainerProps,
    ref: LegacyRef<HTMLDivElement>,
  ) => {
    const inputContainerClassName = twMerge(className, "flex flex-col gap-1");

    return (
      <div className={inputContainerClassName} {...rest} ref={ref}>
        {children}
        {error && errorMessage && (
          <span
            className={`mt-1 truncate text-xs text-red-500 ${errorNoWrap && "text-nowrap"} `}
          >
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);

const InputLabel = ({ className, children, ...rest }: InputLabelProps) => {
  const InputLabelClassName = twMerge(
    "flex w-full items-center gap-3 justify-start flex-col",
    className,
  );

  return (
    <label className={InputLabelClassName} {...rest}>
      {children}
    </label>
  );
};

const InputLabelText = ({
  className,
  children,
  ...rest
}: InputLabelTextProps) => {
  const InputLabelTextClassName = twMerge(
    "flex w-full items-center justify-start text-sm truncate text-content-title leading-tight",
    className,
  );

  return (
    <p className={InputLabelTextClassName} {...rest}>
      {children}
    </p>
  );
};

const InputIconContainer = ({
  Icon,
  className,
  children,
  ...rest
}: InputIconContainerProps) => {
  const InputLabelClassName = twMerge(
    "flex w-full items-center relative justify-start flex-col",
    className,
  );

  return (
    <label className={InputLabelClassName} {...rest}>
      {Icon && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 transform disabled:cursor-not-allowed disabled:opacity-50">
          <Icon
            width={13}
            height={13}
            className="size-[0.8125rem] text-content-title"
          />
        </span>
      )}
      {children}
    </label>
  );
};

const InputWithIcon = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          " flex w-full rounded-md border border-input bg-transparent py-2 pl-7 pr-2  text-sm leading-none  shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
          error ? "border-red-500 !ring-0" : "focus:ring-1 focus:ring-ring",
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

export {
  Input,
  InputContainer,
  InputLabelText,
  InputLabel,
  InputIconContainer,
  InputWithIcon,
};

Input.displayName = "Input";
InputContainer.displayName = "InputContainer";
InputLabelText.displayName = "InputLabelText";
InputLabel.displayName = "InputLabel";
InputIconContainer.displayName = "InputIconContainer";
InputWithIcon.displayName = "InputWithIcon";
