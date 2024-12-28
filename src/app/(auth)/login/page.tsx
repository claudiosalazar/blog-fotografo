"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [userName, setUser] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = { userName: userName, password: password };
    console.log("Datos enviados:", loginData);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Guardar el token en el almacenamiento local o en las cookies
        localStorage.setItem("token", data.token);
        // Redirigir al dashboard
        router.push("/panel-de-administracion");
      } else {
        setError(data.error || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setError("Error al enviar los datos");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="login">
        <div className="d-flex justify-content-start">
          <div className="logo-login d-block"></div>
          <h2 className="d-block">Login Dashboard</h2>
        </div>
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="userName"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Usuario
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="userName"
                id="userName"
                value={userName}
                onChange={(e) => setUser(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPass(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}

          <div>
            <button type="submit" className="btn primario">
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}