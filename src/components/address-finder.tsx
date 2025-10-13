import { useState } from "react";

const AddressFinder = ({ selected, setSelected }) => {
  const [loading, setLoading] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!postcode.trim().match(/^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/i)) {
      setError("We only deliver to UK addresses. Please enter a valid UK postcode.");
      return;
    }

    setError("");
    setAddresses([]);
    setSelected("");

    try {
      const res = await fetch(`/api/postcodefinder?postcode=${postcode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data && data.length) {
        setAddresses(data);
        setLoading(false);
      } else {
        setError("No addresses found");
        setLoading(false);
      }
    } catch (err) {
      setError("Failed to fetch address");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="flex">
        <input
          type="text"
          placeholder="Enter postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          required
          className="input input-bordered w-full rounded-sm"
        />
        <button
          onClick={(e) => handleSearch(e)}
          className="btn btn-secondary hover:btn-accent hover:text-white text-white"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            "Search"
          )}
        </button>
      </div>

      {/* Dropdown select for addresses */}
      {addresses.length > 0 && (
        <select
          value={selected}
          onChange={(e) => {
            const index = parseInt(e.target.value, 10);
            setSelected(addresses[index]);
          }}
          className="input input-bordered w-full rounded-sm"
        >
          <option value="">Select your address</option>
          {addresses.map((addr, idx) => {
            const label = [addr.line_1, addr.line_2, addr.post_town, addr.postcode]
              .filter(Boolean)
              .join(", ");
            return (
              <option
                key={idx}
                value={idx}
              >
                {label}
              </option>
            );
          })}
        </select>
      )}

      {/* Error Message */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Optional: Display selected */}
      {selected && (
        <div className="rounded-md border bg-gray-50 p-3 text-sm text-gray-700">
          <p className="mb-1 font-medium">Selected Address:</p>
          <p>
            {[selected.line_1, selected.line_2, selected.post_town, selected.postcode]
              .filter(Boolean)
              .join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddressFinder;
