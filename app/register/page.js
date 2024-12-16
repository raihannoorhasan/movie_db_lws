import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md bg-black/70 rounded-lg p-8 shadow-xl">
      <div className="text-center">
        <h1 className="text-white text-3xl font-bold mb-6">
          Create Your Account
        </h1>

        <RegisterForm />

        <div className="mt-6 text-moviedb-gray">
          Already have an account?
          <Link href="/login" className="text-white hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
