// import * as yup from "yup";
import { useState } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { LeftOutlined } from "@ant-design/icons";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import loginIllus from "@/assets/login-illustration.svg";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Link, useNavigate } from "react-router-dom";
import { APIauth } from "@/apis/APIauth";
import { showErrorToast } from "@/components/shared-components/Toast";

export default function Login() {
  useDocumentTitle("Login");

  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await APIauth.login(dataLogin);
      console.log("Success login", response);
      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed login", error);
      setIsLoading(false);
      showErrorToast(
        "email atau password yang anda masukan salah!",
        "top-right",
        "medium",
      );
      setError(error.message || "Login failed");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <section className="flex h-screen items-center justify-center xl:scale-90">
        <div className="bg-error-timeout"></div>
        <div className="base-container">
          <div className="flex items-center justify-center">
            <div className="z-10 translate-x-0 rounded-lg bg-white px-8 py-8 shadow-none md:max-w-[38rem] md:px-14 md:py-14 md:shadow-[2px_2px_4px_4px_rgba(186,186,186,0.3)] xl:-translate-x-[38%]">
              {/* Title */}
              <Link to="/">
                <>
                  <LeftOutlined className="rounded-lg border border-grey-200 p-2 hover:bg-slate-100" />
                </>
              </Link>
              <div className="space-y-1">
                <h2 className="font-semibold text-grey-900">
                  Masuk ke Akun Anda!
                </h2>
                <p className="text-base font-medium text-grey-300">
                  Selamat datang, silakan masukkan email dan kata sandi Anda.
                </p>
              </div>

              <form id="login-form" onSubmit={handleSubmit} className="mt-8">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-grey-300"
                  >
                    Email
                  </label>
                  <div
                    className={`relative mt-2 rounded-lg border focus-within:ring ${
                      error
                        ? "border-negative text-negative focus-within:text-negative focus-within:ring-negative"
                        : "border-grey-200 text-grey-200 focus-within:text-grey-900 focus-within:ring-grey-900"
                    } ${!error ? "focus-within:text-grey-900" : ""}`}
                  >
                    <div className="absolute inset-y-0 start-0 flex items-center ps-4">
                      <AiOutlineMail size={24} />
                    </div>
                    <input
                      // {...register("email")}
                      id="email"
                      name="email"
                      type="email"
                      value={dataLogin.email}
                      onChange={handleInputChange}
                      autoComplete="email-doctor"
                      className="w-full rounded-lg p-4 pe-8 ps-14 text-base font-medium focus:border-0 focus:outline-none focus:ring-0"
                      placeholder="Masukkan email anda"
                    />
                  </div>
                  {error && (
                    <span className="text-xs text-red-500">{error}</span>
                  )}
                </div>

                {/* Passoword */}
                <div className="mt-2">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-grey-300"
                  >
                    Kata Sandi
                  </label>
                  <div
                    className={`relative mt-2 rounded-lg border focus-within:ring ${
                      error
                        ? "border-negative text-negative focus-within:text-negative focus-within:ring-negative"
                        : "border-grey-200 text-grey-200 focus-within:text-grey-900 focus-within:ring-grey-900"
                    } ${!error ? "focus-within:text-grey-900" : ""}`}
                  >
                    <div className="absolute inset-y-0 start-0 flex items-center ps-4">
                      <AiOutlineLock size={24} />
                    </div>
                    <input
                      // {...register("password")}
                      id="login-password"
                      name="password"
                      autoComplete="current-password"
                      value={dataLogin.password}
                      onChange={handleInputChange}
                      type={`${visible ? "text" : "password"}`}
                      className="w-full rounded-lg p-4 pe-8 ps-14 text-base font-medium focus:border-0 focus:outline-none focus:ring-0"
                      placeholder="Masukkan kata sandi anda"
                    />
                    <button
                      id="check-visibility"
                      type="button"
                      onClick={() => setVisible(!visible)}
                      className="absolute inset-y-0 end-0 flex cursor-pointer items-center pe-4"
                    >
                      {visible ? (
                        <FaRegEyeSlash size={24} />
                      ) : (
                        <FaRegEye size={24} />
                      )}
                    </button>
                  </div>
                  {error && (
                    <span className="text-xs text-red-500">{error}</span>
                  )}
                </div>

                {/* Remember me & Forgot Password */}

                {/* Button */}
                <div className="mt-16">
                  <button
                    id="submit-button"
                    className="w-full rounded-lg bg-green-500 px-4 py-4 text-xl font-bold text-grey-10 hover:bg-green-600 disabled:bg-green-700"
                    disabled={isLoading}
                  >
                    Masuk
                  </button>
                </div>
              </form>
            </div>

            {/* Illustration */}
            <div
              id="login-illustration"
              className="absolute hidden translate-x-[40%] py-5 xl:block"
            >
              <img
                className="-z-10 w-[85%]"
                src={loginIllus}
                alt="login-illustration"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
