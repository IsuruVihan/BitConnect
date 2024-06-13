import {EyeIcon, EyeSlashIcon} from '@heroicons/react/24/outline';

const ShowPassword = (props) => {
	const {showPassword, setShowPassword} = props;
	return (
		<div onClick={() => setShowPassword(prev => !prev)} className="hover:cursor-pointer">
			{
				showPassword ? <EyeSlashIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>
			}
		</div>
	);
};

export default ShowPassword;