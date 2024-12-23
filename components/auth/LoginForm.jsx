"use client";
import { performLogin } from "@/actions";
import { loginSchema } from "@/validation_schema/loginSchema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/"; // Get redirect path or default to "/"
  const [lastResult, action] = useFormState(performLogin, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: loginSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form
      id={form.id}
      className="space-y-4 loginForm"
      onSubmit={form.onSubmit}
      action={action}
    >
      <div>
        <input
          type="email"
          placeholder="Email or phone number"
          className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
          key={fields.email.key}
          name={fields.email.name}
          defaultValue={fields.email.initialValue}
        />
        {fields.email.errors && (
          <p className="text-red-600 text-start">{fields.email.errors}</p>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
          key={fields.password.key}
          name={fields.password.name}
          defaultValue={fields.password.initialValue}
        />
        {fields.password.errors && (
          <p className="text-red-600 text-start">{fields.password.errors}</p>
        )}
      </div>

      <input type="text" name="path" value={redirectPath} hidden />

      {lastResult?.status === "error" && lastResult?.message && (
        <p className="text-red-600 text-start">{lastResult.message}</p>
      )}

      <button
        type="submit"
        className="w-full bg-moviedb-red text-white py-3 rounded hover:bg-red-700 transition duration-300"
      >
        Sign In
      </button>
    </form>
  );
}
