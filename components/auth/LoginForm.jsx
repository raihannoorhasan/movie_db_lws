// import { useState } from "react";
// import { useForm } from "react-hook-form";

import { performLogin } from "@/actions";

// export default function LoginForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [loading, setLoading] = useState(false);

//   const submitHandler = (formData) => {
//     console.log(formData);
//   };

//   return (
//     <form
//       id="loginForm"
//       className="space-y-4"
//       onSubmit={handleSubmit(submitHandler)}
//     >
//       <div>
//         <input
//           type="email"
//           placeholder="Email or phone number"
//           className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
//           {...register("email", {
//             required: "Email is required!",
//           })}
//           disabled={loading}
//         />
//         {errors.password && (
//           <p className="text-red-600 text-start">{errors.password.message}</p>
//         )}
//       </div>
//       <div>
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
//           {...register("password", { required: "Password is required!" })}
//           disabled={loading}
//         />
//         {errors.password && (
//           <p className="text-red-600 text-start">{errors.password.message}</p>
//         )}
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-moviedb-red text-white py-3 rounded hover:bg-red-700 transition duration-300"
//         disabled={loading}
//       >
//         Sign In
//       </button>
//     </form>
//   );
// }

export default function LoginForm() {
  return (
    <form id="loginForm" className="space-y-4" action={performLogin}>
      <div>
        <input
          type="email"
          placeholder="Email or phone number"
          className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
          name="email"
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
          name="password"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-moviedb-red text-white py-3 rounded hover:bg-red-700 transition duration-300"
      >
        Sign In
      </button>
    </form>
  );
}
