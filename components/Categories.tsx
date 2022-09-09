import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setCategories } from "../features/categories/categoriesSlice";
const Categories = () => {
  const categories = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    getCategories().then((result) => dispatch(setCategories(result)));
  }, []);

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
