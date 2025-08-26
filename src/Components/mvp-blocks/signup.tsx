'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Github,
} from 'lucide-react';
import { signInWithGooglePopup } from "@/app/api/google/google";
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { auth } from "@/lib/firebaseClient";
export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = (e:any) => {
    e.preventDefault();
    setLoading(true);
    
  };

    
   const handleGoogleLogin = async () => {
       setLoading(true);
    try {
      const signedInUser = await signInWithGooglePopup();
      if (signedInUser) {
        alert("success");
       
      }
    } catch (error) {
      console.error(error);
      alert("error");
      alert("Google login failed");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0D1117] p-4 text-[#FFFFFF]">
      <div className="w-full max-w-md rounded-[24px] bg-[#0D1117] p-8 shadow-2xl shadow-[#2B6CB0]/20 md:p-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-light uppercase text-[#FFFFFF]">
         Hello there
          </h2>
          <p className="mt-2 text-sm text-[#A0AEC0]">
          We only need your google account to get you started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="">
            <button
            onClick={handleGoogleLogin}
              type="button"
              className="flex w-full items-center justify-center rounded-lg border border-[#A0AEC0]/30 bg-[#0D1117] px-4 py-2.5 text-sm text-[#FFFFFF] transition-colors hover:border-[#A0AEC0]"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="h-5 w-5"
                alt="Google"
              />
              <span className="ml-2">Google</span>
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-[#A0AEC0]">
        </div>
      </div>
    </div>
  );
}