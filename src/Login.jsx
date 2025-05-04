import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

export default function GoogleLogin({ setUser }) {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User logged in:", user);

      // Update user state in parent component
      setUser({
        displayName: user.displayName,
        photoURL: user.photoURL,
      });

      alert(`Welcome, ${user.displayName}!`);
    } catch (error) {
      console.error("Login error:", error);
      alert("Google login failed");
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium shadow-md text-sm"
    >
      Login with Google
    </button>
  );
}
