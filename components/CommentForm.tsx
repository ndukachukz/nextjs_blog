import { useEffect } from "react";
import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import { submitComment } from "../services";

const CommentsForm = ({ slug }: { slug?: string }) => {
  console.log({ slug });
  const [error, setError] = useState<boolean>();
  const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false);
  const [formInputs, setFormInputs] = useState({
    comment: "",
    name: "",
    email: "",
  });

  type handleChange<T> = (e: ChangeEvent<T>) => void | any;
  type onButtonSubmit<T> = (e: MouseEvent<T>) => void;

  const onInputChange: handleChange<HTMLInputElement | HTMLTextAreaElement> = (
    e
  ) => {
    setFormInputs((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    console.log({ formInputs });
  };
  const handleSubmit: onButtonSubmit<HTMLButtonElement> = useCallback((e) => {
    e.preventDefault;
    setError(false);

    const { comment, name, email } = formInputs;

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    submitComment(commentObj).then((res) => {
      setShowSuccessMsg(true);
      setTimeout(() => {
        setShowSuccessMsg(false);
      }, 3000);
    });
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4"></h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          name="comment"
          placeholder="Comment"
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          onChange={onInputChange}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 mb-4">
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          onChange={onInputChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          onChange={onInputChange}
        />
      </div>
      {error && <p className="text-xs text-red-500">All fields are required</p>}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleSubmit}
          className="transition duration-500 ease hover:bg-indigo-500 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {showSuccessMsg && (
          <span className="text-xl float-right font-semibold text-green-500 ">
            Comment Submitted
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
