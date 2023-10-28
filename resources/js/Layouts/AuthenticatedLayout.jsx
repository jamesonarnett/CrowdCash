import Navbar from "../Components/nav/Navbar";
import Toast from "../Components/toast/Toast";

export default function Authenticated({ user, header, children }) {
    return (
        <div className="min-h-screen bg-gradient-primary-flip">
            <Navbar user={user} />
            <Toast />
            <main>{children}</main>
        </div>
    );
}
