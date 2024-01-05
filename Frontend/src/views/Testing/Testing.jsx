import { RiAdminFill, RiEyeFill } from "react-icons/ri";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Image from "/logo.png";
import ReCaptcha from "react-google-recaptcha";
import { useRef } from "react";

function Testing() {
  const captcha = useRef(null);

  return (
    <main className="flex h-screen">
      <div className="w-full lg:w-2/6 flex flex-col items-center justify-center bg-[#555CB3] shadow-[0_0px_20px_10px_rgba(0,0,0,0.6)] z-10">
        <div className="w-8/12">
          <div className="flex justify-center items-center text-4xl space-x-4 mb-10">
            <img src={Image} className="w-auto h-16 text-white" />
            <h2
              style={{ textShadow: "2px 2px 1px #B45946", color: "white" }}
              className="font-semibold text-white text-3xl tracking-widest text-shadow-lg"
            >
              PSROCKOLA
            </h2>
          </div>
          <p className="text-white text-lg my-4">¡Empecemos!</p>
          <form className="mt-6">
            <div className="mb-6">
              <TextField
                id="name"
                name="name"
                type="name"
                label="Nombre"
                variant="outlined"
                fullWidth
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ffffff", // color del borde predeterminado
                    },
                    "&:hover fieldset": {
                      borderColor: "#ffffff", // color del borde al pasar el mouse
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ffffff", // color del borde cuando está enfocado
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#ffffff", // color de la etiqueta predeterminado
                    "&.Mui-focused": {
                      color: "#ffffff", // color del label cuando está enfocado
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#ffffff", // color del texto
                  },
                }}
              />
            </div>
            <div className="mb-6">
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ffffff", // color del borde predeterminado
                    },
                    "&:hover fieldset": {
                      borderColor: "#ffffff", // color del borde al pasar el mouse
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ffffff", // color del borde cuando está enfocado
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#ffffff", // color de la etiqueta predeterminado
                    "&.Mui-focused": {
                      color: "#ffffff", // color del label cuando está enfocado
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#ffffff", // color del texto
                  },
                }}
              />
            </div>
            <div className="relative mb-6">
              <TextField
                id="password"
                name="password"
                type="password"
                label="Contraseña"
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  endAdornment: (
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-800"
                    >
                      {<RiEyeFill />}
                    </button>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ffffff", // color del borde predeterminado
                    },
                    "&:hover fieldset": {
                      borderColor: "#ffffff", // color del borde al pasar el mouse
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ffffff", // color del borde cuando está enfocado
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#ffffff", // color de la etiqueta predeterminado
                    "&.Mui-focused": {
                      color: "#ffffff", // color del label cuando está enfocado
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#ffffff", // color del texto
                  },
                }}
              />
            </div>
            <div className="flex justify-center my-6">
              <ReCaptcha
                ref={captcha}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                bgcolor: "#F66E0C",
                borderRadius: "20px",
                height: "40px",
                "&:hover": {
                  bgcolor: "#FF6B00",
                },
              }}
            >
              INICIAR
            </Button>
          </form>
        </div>
      </div>
      <div
        className="lg:w-4/6 bg-white"
        style={{
          backgroundImage: `url(/background_login.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </main>
  );
}

export default Testing;
