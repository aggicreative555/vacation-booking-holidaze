import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../utils/toast';
import { useAuthStore } from '../../stores/useAuthStore';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const onLogout = () => {
    try {
      const username = user?.name || 'User';
      showToast.logoutSuccess(username);

      logout();

      setTimeout(() => {
        navigate('/');
      }, 2000);
      toast.dismiss();
    } catch (error) {
      console.error('Error parsing user from session storage', error);
    }
  };

  return (
    <button
      onClick={onLogout}
      className="btn-s btn-primary disabled:bg-gray-100 disabled:text-gray-400"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
