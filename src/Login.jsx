import React, { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase";
import { FcGoogle } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "./AuthContext"; // Import the useAuth hook

export default function GoogleLogin() {
  const { user, setUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      setUser({
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
      });
    } catch (error) {
      console.error("Login error:", error);
      alert("Google login failed");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear the user from the context on logout
      setDropdownOpen(false); // Close the dropdown
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed");
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      {user ? (
        <div className="relative py-1">
          {/* User Info and Dropdown */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
            <img
              src={user.photoURL || "https://via.placeholder.com/40"}
              alt={user.displayName}
              className="w-10 h-10 rounded-full"
            />
            <span className="text-sm font-semibold">{user.displayName}</span>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Sign out"
                className="w-full flex items-center text-left px-4 py-2 text-sm 
                  text-red-600 hover:bg-red-50 
                  dark:text-red-400 dark:hover:bg-red-900 dark:hover:text-red-100 transition"
              >
                <FiLogOut className="mr-2" />
                Sign out
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={handleLogin}
          aria-label="Sign in with Google"
          className="flex items-center gap-2 px-3 py-1 text-sm 
            bg-white text-gray-700 border border-gray-300 rounded-md 
            hover:shadow-sm hover:bg-gray-50 transition 
            dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          <FcGoogle className="text-lg" />
          Sign in
        </button>
      )}
    </div>
  );
}
