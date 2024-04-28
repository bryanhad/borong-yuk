import { BiMessageError } from "react-icons/bi";
import AuthModal from "../../_components/auth-modal";

function AuthErrorPage() {
  return (
    <AuthModal>
        <BiMessageError size={70} className="text-destructive"/>
    </AuthModal>
  )
}

export default AuthErrorPage