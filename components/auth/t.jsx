import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../api/index";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxios();

  const from = location.state?.from?.pathname || "/";

  const submitForm = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`/auth/login`, formData);
      const authenticatedData = response?.data?.data;
      if (response.status === 200) {
        if (formData.role && authenticatedData?.user?.role === "user") {
          setError(
            "Sorry, You are not an admin! Register as admin first then try again!"
          );
          setLoading(false);
          return;
        }
        setAuth(authenticatedData);

        localStorage.setItem("auth", JSON.stringify(authenticatedData));
        localStorage.setItem(
          "authToken",
          authenticatedData?.tokens?.accessToken
        );
        localStorage.setItem(
          "refreshToken",
          authenticatedData?.tokens?.refreshToken
        );

        if (
          (!authenticatedData?.user?.role === "admin" &&
            from.startsWith("/quiz/")) ||
          from.startsWith("/result/") ||
          from.startsWith("/leaderboard/")
        ) {
          const path = from.split("/");
          const quizResponse = await axiosPrivate.get(`/quizzes/${path[2]}`);

          if (quizResponse?.data?.data?.user_attempt?.attempted) {
            navigate(`/${path[1] === "quiz" ? "result" : path[1]}/${path[2]}`, {
              replace: true,
            });
          } else {
            navigate(`/quiz/${path[2]}`, { replace: true });
          }
        } else if (
          authenticatedData?.user?.role === "admin" &&
          from.startsWith("/quiz/")
        ) {
          navigate(`/admin/quiz_set_entry/${from.split("/")[2]}`, {
            replace: true,
          });
        } else {
          navigate(from, { replace: true });
        }

        toast.success(
          `Welcome to Quiz Hub, ${response?.data?.data?.user?.full_name}`
        );
      }
    } catch (err) {
      if (!err.response) {
        setError("Server is temporarily unavailable. Please try again later.");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          Username or Email Address
        </label>
        <input
          {...register("email", {
            required: "Username or Email address is required!",
          })}
          type="email"
          id="email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300"
          placeholder="Enter you email address"
          disabled={loading}
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block mb-2">
          Enter your Password
        </label>
        <input
          {...register("password", { required: "Password is required!" })}
          type="password"
          id="password"
          className="w-full px-4 py-3 rounded-lg border border-gray-300"
          placeholder="Password"
          disabled={loading}
        />
        {errors.password && (
          <p className="text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-6 flex gap-2 items-center">
        <input
          {...register("role")}
          type="checkbox"
          id="admin"
          className="px-4 py-3 rounded-lg border border-gray-300"
          disabled={loading}
        />
        <label htmlFor="admin" className="block">
          Login as Admin
        </label>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <button
        type="submit"
        className={`w-full bg-primary text-white py-3 rounded-lg mb-4 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Loading..." : "Sign In"}
      </button>
    </form>
  );
}
