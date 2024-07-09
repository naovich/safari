"use client";

import * as React from "react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CustomCalendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input"; // Importation de l'input
import { CalendarDaysIcon, TrashIcon } from "@/assets/icons";
import { useRouter } from "next/navigation";
import NumericStepper from "@/components/ui/numericStepper";
import { activitiesDevis, activitiesDevis2 } from "@/lib/labels";
import { de } from "date-fns/locale";
import { getReservation } from "../api/graphQL";
import Image from "next/image";

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
  const [reservation, setReservation] = useState<any>([]);

  const activities = activitiesDevis2;
  const router = useRouter();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const reservationData = await getReservation();
        setReservation(reservationData.reservation.reservation);
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      }
    }

    fetchData();
  }, []);

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

  const calculateTotalPerActivity = (activity: string) => {
    const activityDetails = activities.find((act: any) => act.nom === activity);
    return activityGuests[activity] * (activityDetails?.prix || 0);
  };

  const calculateTotal = () => {
    return selectedActivities.reduce(
      (total, activity) => total + calculateTotalPerActivity(activity),
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
      totalPrice: calculateTotal(),
      template: "reservation",
    };

    try {
      const response = await fetch("/api/nodeMailJet", {
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
      router.push("/devis/remerciement");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [isArrivalPopoverOpen, setArrivalPopoverOpen] = useState(false);
  const [isDeparturePopoverOpen, setDeparturePopoverOpen] = useState(false);

  const handleArrivalDateSelect = (date: Date | undefined) => {
    setArrivalDate(date);
    setArrivalPopoverOpen(false);
  };

  const handleDepartureDateSelect = (date: Date | undefined) => {
    setDepartureDate(date);
    setDeparturePopoverOpen(false);
  };

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 md:p-8">
      <h2 className="mb-4 text-xl font-bold md:text-2xl">
        Réservez gratuitement vos activités
      </h2>
      <div className="mb-6 grid gap-2">
        <Label htmlFor="first-name">Prénom</Label>
        <Input
          type="text"
          id="first-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder=""
        />
        <Label htmlFor="last-name">Nom</Label>
        <Input
          type="text"
          id="last-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder=""
        />
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=""
        />
        {!isValidEmail(email) && email && (
          <p className="text-red-500">Adresse email invalide</p>
        )}
        <Label htmlFor="phone">Téléphone</Label>
        <Input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder=""
        />
      </div>

      <div className="mb-6 grid gap-2">
        <div className="grid grid-rows-2 gap-2 text-muted-foreground lg:grid-cols-2 lg:grid-rows-1">
          <div>
            Date de départ:{" "}
            <span>
              {departureDate
                ? departureDate.toLocaleDateString()
                : "Non sélectionné"}
            </span>{" "}
          </div>
          <div>
            Date d&rsquo;arrivée:{" "}
            <span>
              {arrivalDate
                ? arrivalDate.toLocaleDateString()
                : "Non sélectionné"}
            </span>
          </div>
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="departure-date">Date de départ</Label>
          <Popover
            open={isDeparturePopoverOpen}
            onOpenChange={setDeparturePopoverOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal lg:w-[278px]"
                onClick={() => setDeparturePopoverOpen(true)}
              >
                <CalendarDaysIcon className="mr-2 h-4 w-4" />
                <span>
                  {departureDate
                    ? departureDate.toLocaleDateString()
                    : "Selectionner une date"}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CustomCalendar
                mode="single"
                selected={departureDate}
                onSelect={handleDepartureDateSelect}
                initialFocus
                lang="fr"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="arrival-date">Date d&rsquo;arrivée</Label>
          <Popover
            open={isArrivalPopoverOpen}
            onOpenChange={setArrivalPopoverOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal lg:w-[278px]"
                disabled={!departureDate}
                onClick={() => setArrivalPopoverOpen(true)}
              >
                <CalendarDaysIcon className="mr-2 h-4 w-4" />
                <span>
                  {arrivalDate
                    ? arrivalDate.toLocaleDateString()
                    : "Selectionner une date"}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CustomCalendar
                mode="single"
                selected={arrivalDate}
                onSelect={handleArrivalDateSelect}
                initialFocus
                disabled={(date) =>
                  departureDate ? date < departureDate : false
                }
                lang="fr"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="mt-6 grid gap-4">
        <Label htmlFor="activities">Activités</Label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reservation.map((activity: any) => (
            <div
              key={activity.nom}
              className={`relative cursor-pointer rounded-lg border p-4 ${
                selectedActivities.includes(activity.nom)
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
              onClick={() => toggleActivity(activity.nom)}
            >
              <div className="flex items-center justify-center">
                <Image
                  src={activity.image.url}
                  alt={activity.image.alt}
                  height={80}
                  width={80}
                  className="object-contain"
                />
              </div>
              <div className="mt-2 flex w-full justify-center">
                <input
                  type="checkbox"
                  checked={selectedActivities.includes(activity.nom)}
                  onChange={() => toggleActivity(activity.nom)}
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
              </div>
              <div className="mt-2 text-center">
                <h3 className="text-lg font-bold">{activity.nom}</h3>
              </div>
              <div className="mt-1 flex justify-between px-16">
                <span className="text-lg font-bold text-blue-500">Prix :</span>
                <span className="text-lg">{`${activity.prix} Eur`}</span>
              </div>
              <div className="mt-1 flex justify-between px-16">
                <span className="text-lg font-bold text-blue-500">Durée: </span>
                <span className="text-lg">{`${activity.duree} min`}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 w-full overflow-x-auto">
        <h3 className="text-lg font-bold">Activités</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-1 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Types
              </th>
              <th
                scope="col"
                className="py-1 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Prix
              </th>
              <th
                scope="col"
                className="py-1 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Personnes
              </th>
              <th
                scope="col"
                className="py-1 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Total
              </th>
              <th
                scope="col"
                className="py-1 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {selectedActivities.map((activity) => (
              <tr key={activity}>
                <td className="max-w-[100px] whitespace-normal break-words px-2 py-1 text-sm font-medium text-gray-900">
                  {activity}
                </td>
                <td className="whitespace-nowrap px-2 py-1 text-sm text-gray-500">
                  {activities.find((act) => act.nom === activity)!.prix} €
                </td>
                <td className="whitespace-nowrap px-2 py-1 text-sm text-gray-500">
                  <NumericStepper
                    min={1}
                    max={10}
                    value={activityGuests[activity] || 1}
                    onChange={(value) => handleGuestChange(activity, value)}
                  />
                </td>
                <td className="whitespace-nowrap px-2 py-1 text-sm text-gray-500">
                  {calculateTotalPerActivity(activity)} €
                </td>
                <td className="whitespace-nowrap px-2 py-1 text-right text-sm font-medium">
                  <Button
                    variant="outline"
                    onClick={() => removeActivity(activity)}
                  >
                    <TrashIcon />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan={3}
                className="whitespace-nowrap px-2 py-1 text-xl font-bold text-gray-900"
              >
                Total
              </td>
              <td />
              <td className="whitespace-nowrap px-2 py-1 text-right text-xl font-bold text-gray-900">
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
