// app/vendors/page.tsx
import Link from "next/link";

interface Vendor {
  _id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  address: string;
  cuisineType: string;
  deliveryTime: string;
  minOrder: number;
}

async function getVendors(search: string, cuisine: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/vendors`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch vendors");

  const data = await res.json();
  let vendors: Vendor[] = data.vendors || [];

  // Apply filters server-side
  if (search) {
    vendors = vendors.filter(
      (v) =>
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (cuisine && cuisine !== "All") {
    vendors = vendors.filter((v) => v.cuisineType === cuisine);
  }

  return vendors;
}

export default async function VendorsPage({
  searchParams,
}: {
  searchParams: { search?: string; cuisine?: string };
}) {
  const { search = "", cuisine = "All" } = await searchParams;
  const vendors = await getVendors(search, cuisine);
  const cuisineTypes = [
    "All",
    "North Indian",
    "South Indian",
    "Gujarati",
    "Home Style",
    "Healthy",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          All Tiffin Vendors
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the best tiffin services in your area and enjoy delicious
          home-cooked meals
        </p>
      </div>

      {/* Search + Filter form (server-driven via query params) */}
      <form className="mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          name="search"
          placeholder="Search vendors..."
          defaultValue={search}
          className="flex-grow px-4 py-3 rounded-lg border border-gray-300"
        />

        <select
          name="cuisine"
          defaultValue={cuisine}
          className="md:w-64 px-4 py-3 rounded-lg border border-gray-300"
        >
          {cuisineTypes.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "All Cuisines" : c}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="px-6 py-3 bg-primary text-white rounded-lg"
        >
          Apply
        </button>
      </form>

      {/* Vendors Grid */}
      {vendors.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {vendors.map((vendor, indx) => (
            <Link key={indx} href={`/vendor/${vendor._id}`}>
              <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="h-40 w-full object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{vendor.name}</h3>
                <p className="text-gray-600">{vendor.description}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-bold mb-2">No vendors found</h3>
          <p className="text-gray-600">
            No vendors match your search criteria. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
}
