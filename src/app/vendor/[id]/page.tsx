import React from "react";
import VendorPageContent from "@/components/VendorPageContent";
import { MenuItem } from "@/store/cartStore";

// This type should align with the one in VendorPageContent
type Vendor = {
  id: string;
  _id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  address: string;
  menu: MenuItem[];
};

async function getVendor(id: string): Promise<Vendor | null> {
  try {
    // On the server, we need to use the absolute URL for fetch, or call DB directly.
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/meals/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Failed to fetch meals: ${res.statusText}`);
      return null;
    }

    const data = await res.json();

    if (data.error) {
      console.error(`API error: ${data.error}`);
      return null;
    }

    // Mock vendor details and combine with fetched menu
    // In a real app, you would fetch vendor details from your database as well.
    const vendorData: Vendor = {
      id: id, // Use the actual vendor ID
      _id: id, // Use the actual vendor ID
      name: "Pizza Palace", // This would be fetched from the DB
      description: "Best pizzas in town with fresh ingredients.",
      image:
        "https://images.unsplash.com/photo-1594007654729-407eedc4f332?w=800&h=600&fit=crop",
      rating: 4.5,
      address: "123 Main Street, Mohali",
      menu: data.meals || [], // Ensure menu is always an array
    };

    return vendorData;
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return null;
  }
}

export default async function VendorDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const vendor = await getVendor(params.id);

  if (!vendor) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load vendor data.
      </div>
    );
  }

  return <VendorPageContent vendor={vendor} />;
}
