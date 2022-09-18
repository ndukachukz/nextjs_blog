import React from "react";
import Link from "next/link";
import { useAppSelector } from "../app/hooks";

const Categories = () => {
  const categories = useAppSelector((state) => state.categories);
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>

      {categories.map((category, i) => (
        <Link key={i + category.slug} href={`/category/${category.slug}`}>
          <span className="cursor-pointer block pb-3 mb-3">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
