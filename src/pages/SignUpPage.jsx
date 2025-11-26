import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../functions/api.functions";
const VITE_API_URL = import.meta.env.VITE_API_URL;
import { LanguageContext } from "../context.languages/LanguageContext";

export default function SignupPage() {
  const { t } = useContext(LanguageContext);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  // Send code to email
  async function sendCode() {
    const res = await postData(`${VITE_API_URL}/emailauth/send-email-code`, { email });
    if (res.success) {
      alert(`${t.code_sent}`);
      setIsCodeSent(true);
    }
  }

  // Verify code from email
  async function verifyCode() {
    const res = await postData(`${VITE_API_URL}/emailauth/verify-email-code`, { email, code });
    if (res.success) {
      alert(`${t.email_confirmed}`);
      setIsVerified(true);
    }
  }

  // Final registration
  async function handleSignupSubmit(e) {
    e.preventDefault();

    if (!isVerified) {
      return alert(`${t.please_confirm}`);
    }

    const requestBody = { name, email, password };

    try {
      await postData(`${VITE_API_URL}/auth/signup`, requestBody);
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="sign-up-page">
      <h1>{t.sign_up}</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input autoComplete="off" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        {!isCodeSent && (
          <button type="button" onClick={sendCode}>
           {t.send_verif_code}
          </button>
        )}

        {isCodeSent && !isVerified && (
          <>
            <label>Enter your code</label>
            <input autoComplete="off" type="text" value={code} onChange={(e) => setCode(e.target.value)} />
            <button type="button" onClick={verifyCode}>{t.confirm_email}</button>
          </>
        )}

        <label>{t.password}</label>
        <input autoComplete="off" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label>{t.name}</label>
        <input autoComplete="off" type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={30} />

        <button type="submit">{t.confirm_sign_up}</button>
      </form>

      <p>{t.already_have_account}</p>
      <Link to="/login">{t.login}</Link>
    </div>
  );
}
