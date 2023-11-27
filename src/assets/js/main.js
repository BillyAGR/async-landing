const API = 'https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PLYq7H1T5SzMfTNR5HaBfOaxabyaMRYMax&part=snippet&maxResults=10';
const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ef6572caa7msh291632eb1f190edp10575ejsna9c53a085f58',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
	const response = await fetch(urlApi, options);
	const data = await response.json();
	return data;
}

(async () => {
	try {
		const videos = await fetchData(API, options);
		console.log('videos', videos);
		let view = `
		${videos.items.map(video => `
			<div class="group relative">
				<div
					class="w-full dark:text-gray-400 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
					<img src="${video?.snippet?.thumbnails?.high?.url}" alt="${video?.snippet?.description}" class="w-full">
				</div>
				<div class="mt-4 flex justify-between">
				<a href="https://youtube.com/watch?v=${video?.snippet?.resourceId?.videoId}&list${video?.snippet?.playlistId}&index=${video?.snippet?.position}&ab_channel=${video?.snippet?.channelTitle}" target="_blank">
					<h3 class="text-sm dark:text-gray-400">
						<span aria-hidden="true" class="absolute inset-0"></span>
						${video?.snippet?.title}
					</h3>
				</div>
			</div>
		`).slice(0, 4).join('')}`;
		content.innerHTML = view;
	} catch (error) {
		console.log(error);
	}
})();