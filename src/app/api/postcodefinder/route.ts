export default async function handler(req, res) {
  const { postcode } = req.query;
  const API_KEY = process.env.IDEAL_POSTCODE_API_KEY;

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Return error if no postcode is provided
  if (!postcode) {
    return res.status(400).json({ error: "Postcode is required" });
  }

  // Return error if no API key is provided
  if (!API_KEY) {
    console.error("Missing IDEAL_POSTCODE_API_KEY");
    return res.status(500).json({ error: "Missing API key" });
  }

  // Make sure postcode is valid UK postalcode
  const postcodeRegex = /^[A-Z]{1,2}[0-9][0-9]?[A-Z]?\s*[0-9][A-Z]{2}$/i;
  if (!postcodeRegex.test(postcode)) {
    return res.status(400).json({ error: "Invalid postcode format" });
  }

  // Remove spaces from postcode
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
      res.status(200).json(sorted);
    } else {
      res.status(404).json({ error: "No addresses found" });
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    res.status(500).json({ error: "Failed to fetch address" });
  }
}
