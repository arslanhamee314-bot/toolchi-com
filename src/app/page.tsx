import React from "react";
import HomeLayout from "@/components/home/HomeLayout";

export const metadata = {
  title: "Free AI, PDF, Image & Developer Tools Online - Toolchi",
  description: "Explore Toolchi's complete all-in-one suite of free online web, developer, PDF, and productivity tools. 100% secure, local, and private.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ur: "/ur",
      tr: "/tr",
      "x-default": "/"
    }
  }
};


export default function HomePage() {
  return <HomeLayout locale="en" />;
}
