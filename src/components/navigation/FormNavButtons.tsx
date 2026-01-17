import { useLocation, useNavigate } from 'react-router-dom';
import PrimaryButton from '../ui/PrimaryButton';

export default function FormNavButtons() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const activeColor = 'bg-blue-700';
  const inactiveColor = 'bg-blue-300 text-slate-800 hover:bg-blue-400';

  return (
    <div className="flex gap-5 mb-5">
      <PrimaryButton
        title="Add Student"
        onclick={() => navigate('/students/add')}
        color={pathname === '/students/add' ? activeColor : inactiveColor}
      />

      <PrimaryButton
        title="Add Teacher"
        onclick={() => navigate('/teachers/add')}
        color={pathname === '/teachers/add' ? activeColor : inactiveColor}
      />

      <PrimaryButton
        title="Add Class"
        onclick={() => navigate('/classes/add')}
        color={pathname === '/classes/add' ? activeColor : inactiveColor}
      />

      <PrimaryButton
        title="Add Guardian"
        onclick={() => navigate('/guardians/add')}
        color={pathname === '/guardians/add' ? activeColor : inactiveColor}
      />
    </div>
  );
}
