import axios from 'axios';
import { useRef, useState } from 'react';
import { youtube_parser } from './utils';

function App() {
	const inputUrlRef = useRef();
	const [urlResult, setUrlResult] = useState(null);
	const [status, setStatus] = useState('');
	const [isDownloading, setIsDownloading] = useState(false); // To manage button state
	const [pollingId, setPollingId] = useState(null); // To stop polling later

	const handleSubmit = (e) => {
		e.preventDefault();

		const youtubeId = youtube_parser(inputUrlRef.current.value);
		setStatus('Fetching video info...');
		setIsDownloading(true); // Disable button and show downloading state

		const options = {
			method: 'GET',
			url: 'https://youtube-mp36.p.rapidapi.com/dl',
			params: { id: youtubeId },
			headers: {
				'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
				'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com',
			},
		};

		axios
			.request(options)
			.then(function (response) {
				handleResponse(response.data);
			})
			.catch(function (error) {
				console.error(error);
				setStatus('Error occurred while fetching video.');
				setIsDownloading(false); // Re-enable button if an error occurs
			});

		inputUrlRef.current.value = '';
	};

	const handleResponse = (data) => {
		if (data.status === 'processing') {
			setStatus('Processing... please wait.');
			pollForCompletion(data.id); // Polling for completion
		} else if (data.link) {
			setUrlResult(data.link);
			setStatus('Completed! Click to download.');
			setIsDownloading(false); // Re-enable button
		} else {
			setStatus('Error occurred while processing.');
			setIsDownloading(false); // Re-enable button on error
		}
	};

	const pollForCompletion = (id) => {
		const intervalId = setInterval(() => {
			axios
				.get(`https://youtube-mp36.p.rapidapi.com/dl?id=${id}`, {
					headers: {
						'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
						'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com',
					},
				})
				.then((response) => {
					if (response.data.status === 'completed') {
						setUrlResult(response.data.link);
						setStatus('Completed! Click to download.');
						clearInterval(intervalId); // Stop polling
						setIsDownloading(false); // Re-enable button
					} else {
						setStatus('Still processing... please wait.');
					}
				})
				.catch((error) => {
					console.error('Error while polling:', error);
					clearInterval(intervalId); // Stop polling on error
					setStatus('Error occurred during processing.');
					setIsDownloading(false); // Re-enable button on error
				});
		}, 5000); // Poll every 5 seconds

		setPollingId(intervalId);
	};

	return (
		<div className='app'>
			<section className='content'>
				<h1 className='content_title'>Youtube video to Mp3 Converter</h1>
				<p className='content_description'>
					Transform YouTube videos into mp3 in just a few clicks.
				</p>

				<form onSubmit={handleSubmit} className='form'>
					<input
						ref={inputUrlRef}
						type='text'
						className='form_input'
						placeholder='Enter a YouTube video link...'
						disabled={isDownloading} // Disable input while downloading
					/>
					<button
						type='submit'
						className='form_button'
						disabled={isDownloading} // Disable button while downloading
					>
						{isDownloading ? 'Processing...' : 'Search'}
					</button>
				</form>

				{status && <p>{status}</p>}

				{urlResult && (
					<a
						href={urlResult}
						target='_blank'
						rel='noopener noreferrer'
						className='download_btn'
						onClick={() => setIsDownloading(false)} // Reset download state on click
						disabled={isDownloading} // Disable if another download is in progress
					>
						{isDownloading ? 'Downloading...' : 'Download MP3'}
					</a>
				)}
			</section>
		</div>
	);
}

export default App;
