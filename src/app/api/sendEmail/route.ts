import { google, Auth } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const gmail = google.gmail("v1");

export async function POST(req: NextRequest) {
  const {
    firstName,
    lastName,
    email,
    phone,
    arrivalDate,
    departureDate,
    selectedActivities,
    activityGuests,
  } = await req.json();

  console.log("Received data:", {
    firstName,
    lastName,
    email,
    phone,
    arrivalDate,
    departureDate,
    selectedActivities,
    activityGuests,
  });

  const keyFile = path.join(
    process.cwd(),
    "src",
    "app",
    "api",
    "lib",
    "credentials.json",
  );

  const auth = new google.auth.GoogleAuth({
    keyFile: keyFile,
    scopes: ["https://www.googleapis.com/auth/gmail.send"],
  });

  try {
    const authClient = (await auth.getClient()) as Auth.OAuth2Client;
    google.options({ auth: authClient });

    const createEmail = () => {
      const messageParts = [
        'From: "Your Name" <attoumani.nadhoir@gmail.com>',
        `To: ${email}`,
        "Content-Type: text/html; charset=UTF-8",
        "MIME-Version: 1.0",
        "Subject: Confirmation de Réservation",
        "",
        `<p>Bonjour ${firstName} ${lastName},</p>`,
        `<p>Merci pour votre réservation. Voici les détails de votre réservation:</p>`,
        `<p><strong>Arrivée:</strong> ${new Date(arrivalDate).toLocaleDateString()}</p>`,
        `<p><strong>Départ:</strong> ${new Date(departureDate).toLocaleDateString()}</p>`,
        `<p><strong>Activités sélectionnées:</strong></p>`,
        "<ul>",
        ...selectedActivities.map(
          (activity: string) =>
            `<li>${activity}: ${activityGuests[activity]} personne(s)</li>`,
        ),
        "</ul>",
        `<p><strong>Total:</strong> 1000 €</p>`,
        "<p>Nous vous contacterons bientôt pour plus de détails.</p>",
        "<p>Cordialement,</p>",
        "<p>Your Company</p>",
      ];
      const message = messageParts.join("\n");

      const encodedMessage = Buffer.from(message)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      return encodedMessage;
    };

    const activitiesDevis = [
      { name: "Journée en mer", price: 10 },
      { name: "Bouée tractée", price: 20 },
      // Ajoutez plus d'activités et leurs prix selon vos besoins
    ];

    const calculateTotal = () => {
      return selectedActivities.reduce(
        (total: number, activity: string) =>
          total +
          activitiesDevis.find((act) => act.name === activity)!.price *
            activityGuests[activity],
        0,
      );
    };

    const emailMessage = createEmail();
    console.log("Email message:", emailMessage);

    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: emailMessage,
      },
    });

    console.log("Email sent response:", response);
    return NextResponse.json({ message: "Email envoyé avec succès!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de l'email" },
      { status: 500 },
    );
  }
}
