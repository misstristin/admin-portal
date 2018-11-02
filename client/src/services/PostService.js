export const _addPost = (content, category, username, timeStamp, likes, commentCount, comments) => {
	return fetch("http://localhost:3001/add", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({content, category, username, timeStamp, likes, commentCount, comments})
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