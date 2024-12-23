"use client";
import { registerUser } from "@/actions";
import { registerSchema } from "@/validation_schema/registrationSchema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";

export default function RegisterForm() {
  const [lastResult, action] = useFormState(registerUser, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: registerSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form
      id={`${form.id}`}
      className="space-y-4 signupForm"
      onSubmit={form.onSubmit}
      action={action}
    >
      <input
        type="text"
        placeholder="First Name"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        key={fields.firstName.key}
        name={fields.firstName.name}
        defaultValue={fields.firstName.initialValue}
      />
      <p className="text-red-600 text-left">{fields.firstName.errors}</p>
      <input
        type="text"
        placeholder="Last Name"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        key={fields.lastName.key}
        name={fields.lastName.name}
        defaultValue={fields.lastName.initialValue}
      />
      <p className="text-red-600 text-left">{fields.lastName.errors}</p>
      <input
        type="email"
        placeholder="Email Address"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        key={fields.email.key}
        name={fields.email.name}
        defaultValue={fields.email.initialValue}
      />
      <p className="text-red-600 text-left">{fields.email.errors}</p>
      <input
        type="password"
        placeholder="Create Password"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        key={fields.password.key}
        name={fields.password.name}
        defaultValue={fields.password.initialValue}
      />
      <p className="text-red-600 text-left">{fields.password.errors}</p>
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        key={fields.confirmPassword.key}
        name={fields.confirmPassword.name}
        defaultValue={fields.confirmPassword.initialValue}
      />
      <p className="text-red-600 text-left">{fields.confirmPassword.errors}</p>

      <div className="text-left text-moviedb-gray text-sm">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" name="agreedPolicy" />I agree
          to the Terms of Service and Privacy Policy
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-moviedb-red text-white py-3 rounded hover:bg-red-700 transition duration-300"
      >
        Sign Up
      </button>
    </form>
  );
}
