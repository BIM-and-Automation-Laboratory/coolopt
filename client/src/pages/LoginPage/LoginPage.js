import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";
import FingerprintSharpIcon from "@material-ui/icons/FingerprintSharp";
import logo from "../../assets/img/CoolOptLogo.svg";

export default function Login() {
  const { loading, loginWithRedirect } = useAuth0();

  function handleLogin() {
    loginWithRedirect();
  }

  return (
    <section
      style={{
        backgroundImage: "linear-gradient(to right, #09beb8 , #0d0646)",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "block",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            // width: "100%",
            paddingBottom: "60px",
          }}
          src={logo}
          alt="Logo"
        />
        <Button
          style={{
            display: "block",
            textTransform: "none",
            fontSize: "26px",
            color: "#ffffff",
            width: "150px",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "30px",
            height: "60px",
            borderRadius: "60px",
            backgroundImage:
              "linear-gradient(76deg, rgba(23,80,114,1) 0%, rgba(16,23,86,1) 97%)",
            "&:hover": {
              boxShadow: "0px 0px 9px 0px #ffffff",
            },
          }}
          onClick={handleLogin}
        >
          {loading ? "Taking you there..." : "Login"}
        </Button>
        <Link
          style={{ textDecoration: "none" }}
          href="mailto:keey4kly@nottingham.edu.my"
        >
          <Button
            style={{
              textTransform: "none",
              fontSize: "20px",
              color: "#ffffff",
              width: "250px",
              marginLeft: "auto",
              marginRight: "auto",
              height: "50px",
              borderRadius: "60px",
              "&:hover": {
                boxShadow: "0px 0px 9px 0px #ffffff",
              },
            }}
            disabled={loading}
            startIcon={<FingerprintSharpIcon />}
          >
            Request Access
          </Button>
        </Link>
      </div>
    </section>
  );
}
