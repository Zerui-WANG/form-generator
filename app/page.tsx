'use client'

import { CustomForm } from "@/components/CustomForm";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24 gap-16">
      <h1 className="text-3xl">Générateur de Formulaires Avancé</h1>
      <CustomForm />
    </main>
  );
}
