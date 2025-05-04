// Login.jsx
import React from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLogin({ user, setUser }) {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser({
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
    } catch (error) {
      console.error("Login error:", error);
      alert("Google login failed");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed");
    }
  };

  if (user) {
    return (
        <div className="py-1">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="flex items-center gap-2 px-3 py-1 text-sm bg-white text-gray-700 border border-gray-300 rounded-md hover:shadow-sm hover:bg-gray-50 transition"
    >
      <FcGoogle className="text-lg" />
      Sign in
    </button>
  );
}
