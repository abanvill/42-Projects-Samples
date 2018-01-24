# 42-matcha-legacy - API

The back-end application API.

## Login

### `POST`

> /api/login

```js
request: {
	'login': {
		type: 'STRING',
		validation: 'nil',
		optional: false
	},
	'password': {
		type: 'STRING',
		validation: 'nil',
		optional: false
	}
}
response: {
	'logged': 'BOOLEAN',
	// Learn about JSON web tokens
}
```

## Registering

### `POST`

> /api/register

```js
request: {
	'email': {
		type: 'STRING',
		validation: 'nil',
		optional: false
	},
	'username': {
		type: 'STRING',
		validation: 'nil',
		optional: false
	},
	'gender': {
		type: 'ENUM',
		validation: 'nil',
		optional: false
	},
	'first_name': {
		type: 'STRING',
		validation: 'nil',
		optional: false
	},
	'last_name': {
		type: 'STRING',
		validation: 'nil',
		optional: false
	},
	'password': {
		type: 'STRING',
		validation: 'nil',
		optional: false
	},
	'confirmation': {
		type: 'STRING',
		validation: 'nil',
		optional: false
	}
}
response: {
	'registered': 'BOOLEAN',
	// Learn about JSON web tokens
}
```

## Forgot password

### `POST`

> /api/forgot-password

```js
request: {
	'email': {
		type: 'STRING',
		validation: 'nil',
		optional: false
	},
}
response: {
	'mail_submitted': 'BOOLEAN'
}
```

## Account

### `GET`

> /api/account

```js
response: {
	'private_infos': {
		type: 'OBJECT',
		object: 'private_infos',
	}
}
```

### `POST`

> /api/edit/account

```js
request: {
	'email': {
		type: 'STRING',
		validation: 'nil',
		optional: true
	},
	'first_name': {
		type: 'STRING',
		validation: 'nil',
		optional: true
	},
	'last_name': {
		type: 'STRING',
		validation: 'nil',
		optional: true
	},
	'password': {
		type: 'STRING',
		validation: 'nil',
		optional: true
	},
	'confirmation': {
		type: 'STRING',
		validation: 'nil',
		optional: false
	}
}
response: {
	'updated': 'BOOLEAN'
}
```

## Profile

### `GET`

> /api/profile

```js
response: {
	'public_infos': {
		type: 'OBJECT',
		object: 'public_infos',
	}
}
```

### `POST`

> /api/edit/profile

```js
request: {
	'gender': {
		type: 'ENUM',
		validation: 'nil',
		optional: true
	},
	'sexual_orientation': {
		type: 'STRING',
		validation: 'nil',
		optional: true // Bisexual by default
	},
	'bio': {
		type: 'STRING',
		validation: 'nil',
		optional: true
	},
	'interests': 'ARRAY',
	'pictures': 'ARRAY'
}
response: {
	'updated': 'BOOLEAN'
}
```

## Search for users

### `POST`

> /api/search

```js
request: {
	'location': {
		'x': {
			type: 'STRING',
			validation: 'nil',
			optional: true
		}
		'y': {
			type: 'STRING',
			validation: 'nil',
			optional: true
		}
	},
	'age': {
		'low': {
			type: 'INTEGER',
			validation: 'nil',
			optional: true
		},
		'high':{
			type: 'INTEGER',
			validation: 'nil',
			optional: true
		},
	},
	'profile_strength': {
		type: 'INTEGER',
		validation: 'nil',
		optional: true
	},
	'interests': {
		type: 'ARRAY',
		object: 'interest',
		optional: true
	}
}
response: {
	'succeeded': 'BOOLEAN',
	'users': {
		type: 'ARRAY',
		object: 'public_infos',
	}
}
```

## Messages

### `GET`

> /api/messages

```js
response: {
	'threads': {
		type: 'ARRAY',
		object: 'threads'
	}
}
```

### `POST`

> /api/messages/{username}

```js
request: {
	'username': {
		type: 'STRING',
		validation: 'nil',
		optional: false
	},
	'content': {
		type: 'STRING',
		validation: 'nil',
		optional: false // Must have 1 character at least
	}
}
response: {
	'message_submitted': 'BOOLEAN'
}
```

## User profile (self)

### `GET`

> /api/user/{self username}

```js
request: {
}
response: {
	'user': {
		'public_infos': {
			type: 'OBJECT',
			object: 'public_infos',
		},
		'private_infos': {
			// Filtered
			type: 'OBJECT',
			object: 'private_infos',
		}
	}
}
```

## User profile (another user)

### `GET`

> /api/user/{username}

```js
request: {
}
response: {
	'user': {
		'public_infos': {
			type: 'OBJECT',
			object: 'public_infos',
		}
	}
}
```
