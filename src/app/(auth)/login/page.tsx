"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackLink from "@/app/utility/BackLink";
import Title from "@/app/utility/title";

const Login = () => {
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
        router.push("/panel-de-administracion/resumen");
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
        <div className="flex titulo-login">
          <div className="logo-login d-block"></div>
          <h2 className="d-block pb-5">Ingresar al Dashboard</h2>
        </div>
        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit} >
          <div className="campo-formulario">
            <label htmlFor="userName" className="block text-sm/6 font-medium text-gray-900">
              Usuario
            </label>
            <div className="mt-2">
              <input type="text" name="userName" id="userName" value={userName} onChange={(e) => setUser(e.target.value)} required />
            </div>
          </div>

          <div className="campo-formulario">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900" >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input type="password" name="password" id="password" value={password} onChange={(e) => setPass(e.target.value)} required />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}

          <div className="w-full flex justify-between">
            <BackLink className="btn secundario">
              Volver
            </BackLink >
            <button type="submit" className="btn primario w-full">
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Title(Login, "Login");