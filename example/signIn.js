import { signIn } from "aws-amplify/auth";

await signIn({
  username: "test@amplify.com",
  password: "Test12@3",
});
