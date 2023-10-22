import { doc, updateDoc } from "firebase/firestore";
import { auth, database, db } from "./firebase";
import { get, onDisconnect, onValue, ref, set } from "firebase/database";

// Fetch the current user's ID from Firebase Authentication.
const connectionRef = ref(database, ".info/connected");
onValue(connectionRef, async (snapshot) => {
  let id;
  const { uid, email } = auth.currentUser?.providerData[0] || {};
  if (!uid) {
    // User not authenticated or authentication state is still loading
    return;
  }


  if (uid === email) {
    id = auth.currentUser.uid;
  } else {
    id = uid;
  }

  let connected = snapshot.val();
  if (typeof connected !== "boolean") {
    return;
  }

  setPresence(id, connected);

  try {
    const userConnectedRef = ref(database, `connections/${id}`);
    
    onDisconnect(userConnectedRef).set(false);
  } catch (error) {
    // Handle the error here
    console.error("Error updating user status:", error);
  }
});

export async function setPresence(uid, connected) {
  const userConnectedRef = ref(database, `connections/${uid}`);
  set(userConnectedRef, connected);
}

export async function getConnectivity(uid) {
  const userRef = ref(database, `connections/${uid}`);
  const connectionSnapshot = await get(userRef);
  if (!connectionSnapshot.exists()) {
    return "connection data not found";
  }
  const connectionData = connectionSnapshot.val();
  if (typeof connectionData !== "boolean") {
    return "connection data invalid";
  }
  return connectionData;
}
