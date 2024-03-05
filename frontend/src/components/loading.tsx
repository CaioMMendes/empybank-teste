import { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type LoadingProps = {
  color?: string;
  backgroung?: string;
} & React.SVGProps<SVGSVGElement>;

export const Loading = ({ color = "#00bdff", ...props }: LoadingProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        background: "0 0",
      }}
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      display="block"
      {...props}
    >
      <circle
        cx={50}
        cy={50}
        fill="none"
        stroke={color}
        strokeWidth={10}
        r={35}
        strokeDasharray="164.93361431346415 56.97787143782138"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1.282051282051282s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        />
      </circle>
    </svg>
  );
};

export type LoadingOverlayProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

export const LoadingOverlay = ({
  children,
  className,
  ...props
}: LoadingOverlayProps) => {
  const LoadingOverlayClassName = twMerge(
    className,
    "absolute w-full h-full bg-overlay inset-0 pointer-events-none select-none",
  );

  return (
    <div className={LoadingOverlayClassName} {...props}>
      {children}
    </div>
  );
};
