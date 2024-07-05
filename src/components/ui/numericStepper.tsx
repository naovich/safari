"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NumericStepperProps {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
}

export default function NumericStepper({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
}: NumericStepperProps) {
  const handleIncrement = () => {
    onChange(Math.min(value + step, max));
  };
  const handleDecrement = () => {
    onChange(Math.max(value - step, min));
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <div className="flex w-full rounded-md shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          className="h-small grid w-full items-center rounded-r-md border border-l bg-transparent p-1 text-muted-foreground focus:border-black disabled:cursor-not-allowed disabled:opacity-50 md:max-w-[40px]"
          onClick={handleDecrement}
        >
          <MinusIcon className="h-4 w-4" />
        </Button>
        <Input
          type="text"
          id="stepper"
          value={value}
          onChange={handleChange}
          className="h-small mx-2 flex w-full max-w-[40px] p-0 text-center outline-none placeholder:text-muted-foreground focus:ring-0 focus:ring-offset-0 sm:text-sm"
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-small grid w-full items-center rounded-r-md border border-l bg-transparent p-1 text-muted-foreground focus:border-black disabled:cursor-not-allowed disabled:opacity-50 md:max-w-[40px]"
          onClick={handleIncrement}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function MinusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
