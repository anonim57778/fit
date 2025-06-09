import React from "react";
import { cn } from "~/lib/utils";

type InlineSelectProps = {
  value: string | null;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
};

export function SelectUi({
  value,
  onValueChange,
  children,
}: InlineSelectProps) {
  const handleValueChange = (newValue: string) => {
    onValueChange(newValue);
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;

        const typedProps = child.props as InlineSelectItemProps;
        const isSelected = typedProps.value === value;
        return (
          <button
            type="button"
            onClick={() => handleValueChange(typedProps.value)}
            className="w-full"
          >
            {/* @ts-ignore */}
            {React.cloneElement(child, { isSelected })}
          </button>
        );
      })}
    </div>
  );
}

type InlineSelectItemProps = {
  value: string;
  children: React.ReactNode;
  isSelected?: boolean;
};

export function SelectUiItem({
  children,
  isSelected = false,
}: InlineSelectItemProps) {
  return (
    <div
      className={cn(
        "py-2.5 flex items-center justify-center w-full rounded-xl bg-muted border border-transparent font-medium transition",
        isSelected && "border-primary",
      )}
    >
      {children}
    </div>
  );
}