import {Player} from '@lottiefiles/react-lottie-player';
import loader from './loader.json'; // Ensure the file name matches exactly

const Loader = () => {
	return (
		<div className="flex justify-center items-center h-full">
			<Player autoplay loop src={loader} style={{height: '300px', width: '300px'}}></Player>
		</div>
	);
};

export default Loader;
