import { NextRequest, NextResponse } from "next/server";
import Mailjet from "node-mailjet";
import { getProfil } from "../graphQL";

const mailjetClient = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY,
  apiSecret: process.env.MAILJET_SECRET_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    let subject, htmlPart;
    const contactData = await getProfil();
    const contactEmail = contactData.profil.email;

    if (data.template === "reservation") {
      subject = `Safarii réservation de: ${data.firstName} ${data.lastName}`;
      htmlPart = `
        <p><b>Prénom:</b> ${data.firstName}</p>
        <p><b>Nom:</b> ${data.lastName}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Téléphone:</b> ${data.phone}</p>
        <p><b>Date d'arrivé:</b> ${new Date(data.arrivalDate).toLocaleDateString()}</p>
        <p><b>Date de retour:</b> ${new Date(data.departureDate).toLocaleDateString()}</p>
        <p><b>Activités:</b> ${data.selectedActivities.join(", ")}</p>
        <p><b>Nombre de personnes par activité:</b></p>
        <ul>
          ${Object.entries(data.activityGuests)
            .map(
              ([activity, guests]) => `<li><b>${activity}:</b> ${guests}</li>`,
            )
            .join("")}
        </ul>
        <p><b>Total:</b> ${data.totalPrice} €</p>
        <p><a href='${contactData.profil.siteurl}'>${contactData.profil.nom}</a>!</p><br/>
      `;
    } else if (data.template === "contact") {
      subject = `Message de: ${data.firstName} ${data.lastName}`;
      htmlPart = `
        <p><b>Prénom:</b> ${data.firstName}</p>
        <p><b>Nom:</b> ${data.lastName}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Objet:</b> ${data.subject}</p>
        <p><b>Message:</b></p>
        <p>${data.message}</p>
        <p><a href='${contactData.profil.siteurl}'>Safarii njéma</a>!</p><br/>
      `;
    } else {
      throw new Error("Invalid template type");
    }

    const mailjetRequest = mailjetClient
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "attoumani.nadhoir@gmail.com",
              Name: `${data.firstName} ${data.lastName}`,
            },
            To: [
              {
                Email: contactEmail,
                Name: `Safarii Njéma`,
              },
            ],
            Subject: subject,
            TextPart: subject,
            HTMLPart: htmlPart,
            CustomID: "AppGettingStartedTest",
          },
        ],
      });

    const result = await mailjetRequest;
    return NextResponse.json(result.body, { status: 200 });
  } catch (error) {
    const err = error as { statusCode?: number; message: string };
    console.error("Error:", err);
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
