import { signOut } from "aws-amplify/auth";

await signOut({ global: true });
