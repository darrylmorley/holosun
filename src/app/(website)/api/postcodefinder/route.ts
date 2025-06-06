export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const postcode = searchParams.get("postcode");
  const API_KEY = process.env.IDEAL_POSTCODE_API_KEY;

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!postcode) {
    return new Response(JSON.stringify({ error: "Postcode is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!API_KEY) {
    console.error("Missing IDEAL_POSTCODE_API_KEY");
    return new Response(JSON.stringify({ error: "Missing API key" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const postcodeRegex = /^[A-Z]{1,2}[0-9][0-9]?[A-Z]?\s*[0-9][A-Z]{2}$/i;
  if (!postcodeRegex.test(postcode)) {
    return new Response(JSON.stringify({ error: "Invalid postcode format" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const sanitizedPostcode = postcode.replace(/\s+/g, "");

  try {
    const response = await fetch(
      `https://api.ideal-postcodes.co.uk/v1/postcodes/${sanitizedPostcode}?api_key=${API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (data && data.result?.length) {
      const collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: "base",
      });
      const sorted = data.result.sort((a, b) => {
        const aLabel = [a.line_1, a.line_2, a.post_town, a.postcode].filter(Boolean).join(", ");
        const bLabel = [b.line_1, b.line_2, b.post_town, b.postcode].filter(Boolean).join(", ");
        return collator.compare(aLabel, bLabel);
      });

      return new Response(JSON.stringify(sorted), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ error: "No addresses found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch address" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
