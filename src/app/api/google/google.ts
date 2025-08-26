import { GoogleAuthProvider
     ,User,
     signInWithPopup,
     AuthError,
     UserCredential} 
     from "firebase/auth";

    import { auth } from "../../../lib/firebaseClient";

export async function signInWithGooglePopup(): Promise<{ user: User, idToken: string } | null> {
  const provider = new GoogleAuthProvider();

  try {
    const result: UserCredential = await signInWithPopup(auth, provider);
    const user: User = result.user;
    const idToken = await user.getIdToken(); // We are trying to get the ID token here

    return { user, idToken };
  } catch (error: unknown) {
    const authError = error as AuthError & { customData?: { email?: string } };

    console.error(
      "Error signing in with Google (Popup):",
      authError.code,
      authError.message,
      authError.customData?.email,
      GoogleAuthProvider.credentialFromError(authError)
    );

    alert(`Error signing in: ${authError.message}`);
    return null;
  }
}