export const _addPost = (content, category, username, timeStamp, likes, comments) => {
	return fetch("http://localhost:3001/add", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({content, category, username, timeStamp, likes, comments})
	  }).then(res => res.json())
}

export const _loadPosts = () => {
    return fetch("http://localhost:3001/posts")
      .then(res => res.json())
  }