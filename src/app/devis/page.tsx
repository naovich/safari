"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  BarbecueIcon,
  BuoyIcon,
  CanoeIcon,
  MountainIcon,
  PaddleIcon,
  SeaIcon,
} from "@/assets/icons";
import NumericStepper from "@/components/ui/numericStepper";

export default function Devis() {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [arrivalDate, setArrivalDate] = useState<Date | undefined>(undefined);
  const [departureDate, setDepartureDate] = useState<Date | undefined>(
    undefined,
  );
  const [numberOfGuests, setNumberOfGuests] = useState<number>(1);

  const activities = [
    {
      name: "Journée en mer",
      image: "/images/dauphins.jpg",
      time: 60,
      price: 20,
      icon: SeaIcon,
    },
    {
      name: "Ascension du karthala",
      image: "/images/dauphins.jpg",
      time: 60,
      price: 20,
      icon: MountainIcon,
    },
    {
      name: "Barbecue",
      image: "/images/dauphins.jpg",
      time: 60,
      price: 20,
      icon: BarbecueIcon,
    },
    {
      name: "Bouée tractée",
      image: "/images/dauphins.jpg",
      time: 60,
      price: 20,
      icon: BuoyIcon,
    },
    {
      name: "Paddle",
      image: "/images/dauphins.jpg",
      time: 60,
      price: 20,
      icon: PaddleIcon,
    },
    {
      name: "Canoë",
      image: "/images/dauphins.jpg",
      time: 30,
      price: 20,
      icon: CanoeIcon,
    },
  ];

  const toggleActivity = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(
        selectedActivities.filter((act) => act !== activity),
      );
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const removeActivity = (activity: string) => {
    setSelectedActivities(selectedActivities.filter((act) => act !== activity));
  };

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 md:p-8">
      <div className="mb-6 grid gap-2">
        <Label>Selected Dates:</Label>
        <div className="text-muted-foreground">
          Arrival Date:{" "}
          <span>
            {arrivalDate ? arrivalDate.toLocaleDateString() : "Not selected"}
          </span>{" "}
          - Departure Date:{" "}
          <span>
            {departureDate
              ? departureDate.toLocaleDateString()
              : "Not selected"}
          </span>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="arrival-date">Arrival Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarDaysIcon className="mr-2 h-4 w-4" />
                <span>
                  {arrivalDate
                    ? arrivalDate.toLocaleDateString()
                    : "Select date"}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={arrivalDate}
                onSelect={setArrivalDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="departure-date">Departure Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarDaysIcon className="mr-2 h-4 w-4" />
                <span>
                  {departureDate
                    ? departureDate.toLocaleDateString()
                    : "Select date"}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={departureDate}
                onSelect={setDepartureDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="mt-6 grid gap-4">
        <Label htmlFor="activities">Activities</Label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <div
              key={activity.name}
              className={`relative cursor-pointer rounded-lg border p-4 ${
                selectedActivities.includes(activity.name)
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
              onClick={() => toggleActivity(activity.name)}
            >
              {activity.icon && (
                <activity.icon
                  className={`m-auto h-24 w-24 ${
                    selectedActivities.includes(activity.name)
                      ? "text-blue-500"
                      : "text-blue-400"
                  }`}
                />
              )}
              <div className="mt-2 flex w-full justify-center">
                <input
                  type="checkbox"
                  checked={selectedActivities.includes(activity.name)}
                  onChange={() => toggleActivity(activity.name)}
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
              </div>
              <div className="mt-2 text-center">
                <h3 className="text-lg font-bold">{activity.name}</h3>
              </div>
              <div className="mt-1 flex justify-between px-16">
                <span className="text-lg font-bold text-blue-500">Prix :</span>
                <span className="text-lg">{`${activity.price} Eur`}</span>
              </div>
              <div className="mt-1 flex justify-between px-16">
                <span className="text-lg font-bold text-blue-500">Durée: </span>
                <span className="text-lg">{`${activity.time} min`}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <Label htmlFor="guests">Number of Guests</Label>
        <NumericStepper
          min={1}
          max={10}
          value={numberOfGuests}
          onChange={setNumberOfGuests}
        />
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-bold">Selected Activities:</h3>
        <ul className="list-disc space-y-2 pl-5">
          {selectedActivities.map((activity, index) => (
            <li key={index} className="flex items-center justify-between">
              <span>{activity}</span>
              <Button
                variant="outline"
                onClick={() => removeActivity(activity)}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <Button type="submit" className="w-full">
          Book Activities
        </Button>
      </div>
    </div>
  );
}

function CalendarDaysIcon(props: any) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}
