import { useState } from "react";
import LoginPage from "./LoginPage";
import Register from "./Register";

export default function AuthPage() {
  const [mode, setMode] = useState("login");

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage:
          "url('https://hinhanhonline.com/Images/Hinhnen/Hinhnenmaytinhenimedep/hinh-nen-may-tinh-anime-dep-nhat-04.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-center mb-4 space-x-4">
          <button
            onClick={() => setMode("login")}
            className={`px-4 py-2 rounded ${
              mode === "login" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => setMode("register")}
            className={`px-4 py-2 rounded ${
              mode === "register" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Đăng ký
          </button>
          {console.log("mode:", mode)}
        </div>
        {mode === "login" ? (
          <LoginPage />
        ) : (
          <Register onSuccess={() => setMode("login")} />
        )}
      </div>
    </div>
  );
}
