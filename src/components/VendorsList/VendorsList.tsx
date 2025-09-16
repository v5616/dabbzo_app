import Link from "next/link";
import React from "react";
import { Vendor } from "@/app/page";
import Image from "next/image";

type Props = {
  vendor: Vendor;
};

const VendorsList = ({ vendor }: Props) => {
  return (
    <Link key={vendor.id} href={`/vendor/${vendor.id}`} className="card group">
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
        <Image
          src={vendor.image}
          alt={vendor.name}
          fill // ✅ makes image cover parent
          className="object-cover vendor-card-image"
        />
        <div className="absolute bottom-3 left-3 z-20">
          <div className="rating-badge">{vendor.rating}</div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors">
          {vendor.name}
        </h3>
        <p className="text-gray-600 mb-3">{vendor.description}</p>
        <div className="flex items-center text-gray-500 text-sm">
          {vendor.location}
        </div>
      </div>
    </Link>
  );
};

export default VendorsList;
