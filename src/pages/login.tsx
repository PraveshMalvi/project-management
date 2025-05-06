"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successfull!");
      router.push("/projects");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="p-4 w-full sm:w-1/2 max-w-md mx-auto bg-white rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={handleChange}
            required
            name="email"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full text-right mb-2">
          <Link className="underline" href={"/forgot-password"}>
            Forgot Password?
          </Link>
        </div>
        <div className="w-full text-right mb-2">
          <Link className="underline" href={"/sign-up"}>
            Don't have an account? Sign up
          </Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <button type="submit" className="btn btn-success w-full mt-2">
          Log In
        </button>
      </form>
    </div>
  );
}
