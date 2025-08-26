'use client';
import { signInWithGooglePopup } from "@/app/api/google/google";
import Image from "next/image";
export default function SignInPage() {

 

    
   const handleGoogleLogin = async () => {
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

        <form  className="space-y-6">
          <div className="">
            <button
            onClick={handleGoogleLogin}
              type="button"
              className="flex w-full items-center justify-center rounded-lg border border-[#A0AEC0]/30 bg-[#0D1117] px-4 py-2.5 text-sm text-[#FFFFFF] transition-colors hover:border-[#A0AEC0]"
            >
              <Image
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