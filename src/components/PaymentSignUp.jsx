import React, { useState } from "react";

import { useSelector } from "react-redux";

import { Country } from "country-state-city";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import emailjs from "@emailjs/browser";

const PaymentSignUp = () => {
  const { language } = useSelector((state) => state.language);

  const notifyEmailErr = () => toast.error("Email inconnu");
  const notifyEmailEnglishErr = () => toast.error("Email unknown");

  const notifyEmailErrBack = (text) => toast.error(text);
  const notifyPasswordErrBack = (text) => toast.error(text);

  const notifyEmailEspanishErr = () => toast.error("Email desconocido");

  const notifyPasswordErr = () =>
    toast.error("Le mot de passe doit avoir 6 caracteres minimum");

  const notifyPasswordEnglishErr = () =>
    toast.error("Password must have a minimum of 6 characters");

  const notifyPasswordEspanishErr = () =>
    toast.error("La contraseña debe tener un mínimo de 6 caracteres");

  const notyFySuccessRegister = () =>
    toast.success("Inscription réussie, Veuillez vous connectez");

  const notyFySuccessRegisterEnglish = () =>
    toast.success("Successful registration, Please log in");

  const notyFySuccessRegisterSpanish = () =>
    toast.success("Registro exitoso, Por favor inicie sesión");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validCode, setValidCode] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [profil, setProfil] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [code, setCode] = useState("K95F");

  const [countryList, setCountryList] = useState(Country.getAllCountries());

  const handleSubmit = () => {
    if (!email || !password) {
      if (!email) {
        language === "anglais"
          ? notifyPasswordEnglishErr()
          : notifyPasswordErr();
      }
      if (!password) {
        language === "anglais"
          ? notifyPasswordErr()
          : notifyPasswordEnglishErr();
      }
    } else {
      try {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_CLIENT_URL}/users/register`,
          data: {
            email,
            password,
            lastname,
            firstname,
            phone,
            city,
            address,
            country,
            code,
            profil,
            postalCode,
          },
        }).then((res) => {
          if (res.data.errors) {
            notifyEmailErrBack(res.data.errors.email);
            notifyPasswordErrBack(res.data.errors.password);
          } else {
            language === "anglais" && notyFySuccessRegisterEnglish();
            language === "francais" && notyFySuccessRegister();
            language === "espagnol" && notyFySuccessRegisterSpanish();
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="paymentsignup">
      <div className="paymentsignup-first">
        <h1 className="title">VOS INFORMATIONS PERSONNELLES</h1>
        <div className="personal">
          <div className="personal-lab">
            <label htmlFor="lastname">Prénom</label>
            <label htmlFor="firstname">Nom</label>
            <label htmlFor="email">Email</label>
            <label htmlFor="phone">Téléphone</label>
            <label htmlFor="password">Mot de passe</label>
          </div>
          <div className="personal-inp">
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              name="lastname"
              id="lastname"
              placeholder="Prénom:"
              className="lastname"
            />
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              name="firstname"
              id="firstname"
              placeholder="Nom:"
              className="firstname"
            />
            <input
              type="email"
              name="emal"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email:"
              className="email"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              name="phone"
              id="phone"
              placeholder="Téléphone:"
              className="phone"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              id="password"
              placeholder="Mot de passe:"
              className="password"
            />
          </div>
        </div>
      </div>
      <div className="paymentsignup-second">
        <h1 className="title">INFORMATIONS DE FACTURATION</h1>
        <div className="billing">
          <div className="billing-lab">
            <label htmlFor="adress">Adresse</label>
            <label htmlFor="">Pays</label>
            <label htmlFor="">Ville</label>
            <label htmlFor="postal">Code Postal</label>
          </div>
          <div className="billing-inp">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              name="adress"
              id="adress"
              placeholder="Adresse:"
            />
            <select
              name=""
              id=""
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="select-country"
            >
              <option value="Choisir un pays">Choisir un pays</option>
              {countryList.slice(2).map((singleCountry) => (
                <option value={singleCountry?.name}>
                  {singleCountry?.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Votre ville:"
            />
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              name="postal"
              id="postal"
              placeholder="Code Postal:"
            />
          </div>
        </div>
      </div>
      <button className="btn-paysign" onClick={handleSubmit}>
        {language === "francais" && "S'inscrire"}
        {language === "anglais" && "Sign Up"}
        {language === "espagnol" && "Inscribirse"}
      </button>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default PaymentSignUp;
