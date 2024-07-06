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
import NumericStepper from "@/components/ui/numericStepper";
import { Input } from "@/components/ui/input"; // Importation de l'input

import { CalendarDaysIcon } from "@/assets/icons";
import { activitiesDevis } from "@/lib/labels";

export default function Devis() {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [arrivalDate, setArrivalDate] = useState<Date | undefined>(undefined);
  const [departureDate, setDepartureDate] = useState<Date | undefined>(
    undefined,
  );
  const [activityGuests, setActivityGuests] = useState<{
    [key: string]: number;
  }>({});
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const activities = activitiesDevis;

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const canSubmit =
    arrivalDate &&
    departureDate &&
    selectedActivities.length > 0 &&
    firstName &&
    lastName &&
    isValidEmail(email);

  const toggleActivity = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(
        selectedActivities.filter((act) => act !== activity),
      );
      setActivityGuests((prev) => {
        const updated = { ...prev };
        delete updated[activity];
        return updated;
      });
    } else {
      setSelectedActivities([...selectedActivities, activity]);
      setActivityGuests((prev) => ({ ...prev, [activity]: 1 }));
    }
  };

  const removeActivity = (activity: string) => {
    setSelectedActivities(selectedActivities.filter((act) => act !== activity));
    setActivityGuests((prev) => {
      const updated = { ...prev };
      delete updated[activity];
      return updated;
    });
  };

  const handleGuestChange = (activity: string, guests: number) => {
    setActivityGuests((prev) => ({ ...prev, [activity]: guests }));
  };

  const calculateTotal = () => {
    return selectedActivities.reduce(
      (total, activity) =>
        total +
        activities.find((act) => act.name === activity)!.price *
          activityGuests[activity],
      0,
    );
  };

  const handleSubmit = async () => {
    const data = {
      firstName,
      lastName,
      email,
      phone,
      arrivalDate,
      departureDate,
      selectedActivities,
      activityGuests,
    };

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 md:p-8">
      <h2 className="mb-4 text-2xl font-bold">
        Réservez gratuitement vos activités
      </h2>
      <div className="mb-6 grid gap-2">
        <Label htmlFor="first-name">Prénom</Label>
        <Input
          type="text"
          id="first-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <Label htmlFor="last-name">Nom</Label>
        <Input
          type="text"
          id="last-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {!isValidEmail(email) && email && (
          <p className="text-red-500">Adresse email invalide</p>
        )}
        <Label htmlFor="phone">Phone</Label>
        <Input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />
      </div>

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
                disabled={!arrivalDate}
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
                disabled={(date) => (arrivalDate ? date < arrivalDate : false)}
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
        <h3 className="text-lg font-bold">Activités</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Activités
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Prix unitaire
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Nombres de personnes
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Total
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {selectedActivities.map((activity) => (
              <tr key={activity}>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {activity}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {activities.find((act) => act.name === activity)!.price} €
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <NumericStepper
                    min={1}
                    max={10}
                    value={activityGuests[activity] || 1}
                    onChange={(value) => handleGuestChange(activity, value)}
                  />
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {(activityGuests[activity] || 1) *
                    activities.find((act) => act.name === activity)!.price}{" "}
                  €
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <Button
                    variant="outline"
                    onClick={() => removeActivity(activity)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan={3}
                className="whitespace-nowrap px-6 py-4 text-xl font-bold text-gray-900"
              >
                Total
              </td>
              <td />
              <td className="whitespace-nowrap px-6 py-4 text-right text-xl font-bold text-gray-900">
                {calculateTotal()} €
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="mt-6">
        <Button
          type="submit"
          className="w-full"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          Réserver gratuitement
        </Button>
      </div>
    </div>
  );
}
