export const _getUserInfo = (username) => {
	return fetch(`http://localhost:3001/users/${username}`, {
	    method: 'GET',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    // body: JSON.stringify({username})
	  }).then(res => res.json())
}

export const _newImage = (username, image) => {
	return fetch(`http://localhost:3001/newImage/${username}`, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    // body: JSON.stringify({username, image})
	  }).then(res => res.json())
}
