import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent to your email.");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleReset}
        className="p-4 w-full sm:w-1/2 max-w-md mx-auto bg-white rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="w-full text-right mb-2">
          <Link className="underline" href={"/login"}>
            Back to Login
          </Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <button type="submit" className="btn btn-warning w-full mt-2">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
