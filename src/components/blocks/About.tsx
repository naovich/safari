import React from "react";

interface AboutProps {
  title: string;
  description: string;
}

export default function About({ title, description }: AboutProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl">{description}</p>
      </div>
    </section>
  );
}
