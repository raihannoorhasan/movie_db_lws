// export default function Loader() {
//   return (
//     <div class="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black">
//       {/* <!-- Loader Container --> */}
//       <div class="relative flex items-center justify-center w-32 h-32">
//         {/* <!-- Glowing Center Orb --> */}
//         <div class="absolute w-12 h-12 bg-blue-500 rounded-full blur-md animate-pulse"></div>
//         <div class="absolute w-8 h-8 bg-blue-400 rounded-full"></div>

//         {/* <!-- Orbiting Dots --> */}
//         <div class="absolute w-32 h-32 rounded-full border-[1px] border-blue-800 animate-spin-slow">
//           <div class="absolute w-3 h-3 bg-blue-600 rounded-full top-0 left-1/2 transform -translate-x-1/2"></div>
//           <div class="absolute w-3 h-3 bg-blue-400 rounded-full bottom-0 left-1/2 transform -translate-x-1/2"></div>
//           <div class="absolute w-3 h-3 bg-blue-500 rounded-full left-0 top-1/2 transform -translate-y-1/2"></div>
//           <div class="absolute w-3 h-3 bg-blue-300 rounded-full right-0 top-1/2 transform -translate-y-1/2"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Loader({text}) {
//   return (
//     <div class="relative flex items-center justify-center">
//       <div class="w-16 h-16 border-t-4 border-blue-500 border-opacity-75 rounded-full animate-spin-fast"></div>
//       <div class="absolute w-24 h-24 rounded-full bg-blue-500 opacity-25 blur-3xl animate-pulse"></div>
//       <div>{text}</div>
//     </div>
//   );
// }

export default function Loader({ text }) {
  return (
    <div className="relative flex items-center justify-center flex-col">
      {/* Spinner */}
      <div className="w-16 h-16 border-t-4 border-red-500 border-opacity-75 rounded-full animate-spin-fast"></div>

      {/* Glowing background */}
      <div className="absolute w-24 h-24 rounded-full bg-red-500 opacity-25 blur-3xl animate-pulse"></div>

      {/* Styled text */}
      <div className="mt-4 text-xl font-semibold text-red-500 tracking-wide animate-bounce">
        {text}
      </div>
    </div>
  );
}
