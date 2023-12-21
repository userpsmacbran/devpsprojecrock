import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { RiAdminFill } from "react-icons/ri";
import api from "../../api/api";
import ReCaptcha from "react-google-recaptcha";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const captcha = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captcha.current.getValue()) {
      setError("* - Please, check the captcha");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("* - Please, enter a valid email");
      return;
    }

    if (formData.password.length < 8) {
      setError("* - Please, enter a valid password(min 8 characters)");
      return;
    }

    try {
      const response = await api.post("/auth/login", formData);
      //Guardar el token en algun lado

      console.log("Usuario logueado con exito", response.data);
    } catch (error) {
      if (typeof error.response.data.message === "string") {
        setError(`* - ${error.response.data.message}`);
      } else if (Array.isArray(error.response.data.message)) {
        setError(`* - ${error.response.data.message[0]}`);
      } else {
        setError("* - Something went wrong!");
      }
    }
  };

  const validateEmail = (email) => {
    // Validación de correo electrónico utilizando una expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const onChange = () => {
    setError("");
    console.log(captcha.current.getValue());
  };
  return (
    <section className="bg-slate-200 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg ">
        <div className="text-center">
          <RiAdminFill className="mx-auto h-12 w-auto text-red-500" />
          <h2 className="mt-4 text-4xl font-semibold text-gray-900">Log In</h2>
        </div>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium"
            >
              Email
            </label>
            <input
              name="email"
              onChange={handleInputChange}
              type="email"
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-secondary-100"
              placeholder="Your Email"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium"
            >
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                onChange={handleInputChange}
                type={showPassword ? "text" : "password"}
                className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-secondary-100"
                placeholder="Your Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
              </button>
            </div>
            <div className="flex justify-center m-2">
              <ReCaptcha
                ref={captcha}
                sitekey="6LcK5TgpAAAAANRMGf8VuTTKSJT4e3fUwooM7m5h"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="mb-6">
            <p className="text-red-600">{error}</p>
            <Link
              to="/recovery-password"
              className="text-sm font-light text-secondary-200 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm font-light text-gray-500">
          You do not have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-secondary-200 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
