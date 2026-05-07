import { SignUp } from "@clerk/react"

export const SignUpPage = () => {
  console.log("signup")
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <SignUp />
    </div>
  )
}
