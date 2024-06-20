"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { CartProvider } from "react-use-cart";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: "/ingest",
    ui_host: "https://eu.posthog.com",
    person_profiles: "identified_only",
  });
}

export function Providers({ children }) {
  return (
    <PostHogProvider client={posthog}>
      <CartProvider id="holosun-cart">{children}</CartProvider>
    </PostHogProvider>
  );
}
