"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  return (
    <main>
      {/* Tu peux mettre du contenu ici, ou laisser vide si la redirection suffit */}
      <p>Chargement...</p>
    </main>
  );
}
