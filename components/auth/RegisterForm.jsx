import { registerUser } from "@/actions";

export default function RegisterForm() {
  return (
    <form id="signupForm" className="space-y-4" action={registerUser}>
      <input
        type="text"
        placeholder="First Name"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        name="firstName"
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        name="lastName"
        required
      />
      <input
        type="email"
        placeholder="Email Address"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        name="email"
        required
      />
      <input
        type="password"
        placeholder="Create Password"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        name="password"
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        name="confirm-password"
        required
      />

      <div className="text-left text-moviedb-gray text-sm">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            required
            name="agreedPolicy"
          />
          I agree to the Terms of Service and Privacy Policy
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
