"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { getContactEmail } from "../api/graphQL";

export default function Contact() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const router = useRouter();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const canSubmit =
    firstName && lastName && subject && message && isValidEmail(email);

  const handleSubmit = async () => {
    const data = {
      firstName,
      lastName,
      subject,
      message,
      email,
      template: "contact",
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
      router.push("/contact/remerciement");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 md:p-8">
      <h2 className="mb-4 text-2xl font-bold">Contactez-nous</h2>
      <div className="mb-6 grid gap-2">
        <Label htmlFor="first-name">Prénom</Label>
        <Input
          type="text"
          id="first-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Prénom"
        />
        <Label htmlFor="last-name">Nom</Label>
        <Input
          type="text"
          id="last-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Nom"
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
        <Label htmlFor="subject">Objet</Label>
        <Input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Objet"
        />
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Votre message"
        />
      </div>
      <div className="mt-6">
        <Button
          type="submit"
          className="w-full"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          Envoyer
        </Button>
      </div>
    </div>
  );
}
