import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/toast";

const LogoutButton = () => {
    const navigate = useNavigate();

    const onLogout =  () => {
        try {
            const user = JSON.parse(sessionStorage.getItem('user'));
            const username = user?.name || 'User';
            showToast.logoutSuccess(username);
            sessionStorage.clear();
            setTimeout(() => {
                navigate('/');
            }, 2000);
            toast.dismiss(logoutSuccess);

        } catch (error) {
            console.error('Error parsing user from session storage', error);
        }
    };
 
    return (
    <button
        onClick={onLogout}
        className="btn-l btn-primary disabled:bg-gray-100 disabled:text-gray-400">
            Log Out
    </button>
  )
}

export default LogoutButton;