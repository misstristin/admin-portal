export const _addPost = (title, content, category, username, timeStamp, likes, commentCount, comments, addLink, addImage) => {
	return fetch("http://localhost:3001/add", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({title, content, category, username, timeStamp, likes, commentCount, comments, addLink, addImage})
	  }).then(res => res.json())
}

export const _loadPosts = (category) => {
		return fetch(`http://localhost:3001/posts/${category}`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		// body: JSON.stringify({category})
	}).then(res => res.json())
}

export const _addLike = (id, currentlikes) => {
	return fetch(`http://localhost:3001/addLike/${id}/${currentlikes}`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({id, currentlikes})
	}).then(res => res.json())
}

// export const _addComment = (postId, content, username, timeStamp) => {
// 	return fetch("http://localhost:3001/addComment", {
// 			method: 'POST',
// 			headers: {
// 				'Accept': 'application/json',
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify({postId, content, username, timeStamp})
// 		}).then(res => res.json())
// }


// export const _loadComments = (postId) => {
// 	return fetch(`http://localhost:3001/posts/${id}`, {
// 	method: 'GET',
// 	headers: {
// 		'Accept': 'application/json',
// 		'Content-Type': 'application/json'
// 	},
// 	}).then(res => res.json())
// }
	
	
