import Script from "next/script";

export default function UmamiTracking() {
  return (
    <Script
      async
      defer
      src="http://analytics.shootingsuppliesltd.co.uk/script.js"
      data-website-id="b50e3bc4-3bdb-4eb2-bf55-72a0d175c7c9"
    />
  );
}
