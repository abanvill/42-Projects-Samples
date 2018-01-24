# 42-matcha-legacy - Models

The list of application database models.

## Database models

(**WARNING**: The current validation regular expressions are not currently reliable. They must be checked individually. In this analysis document, we'll assume that the database software in use is `MongoDB`)

### User account (`user`)

```js
{
	'id': {
		type: 'OBJECT ID',
		validation: '/^[0-9]{1,}*$/'
	},
	'public_infos': {
		type: 'OBJECT ID',
		object: 'public_infos',
		relation: 'ONE to ONE',
		validation: 'nil'
	},
	'private_infos': {
		type: 'OBJECT ID',
		object: 'private_infos',
		relation: 'ONE to ONE',
		validation: 'nil'
	},
	'username': {
		type: 'STRING',
		validation: '/^[a-zA-Z0-9]*$/'
	},
	'email': {
		type: 'STRING',
		validation: '/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/'
	},
	'password': {
		type: 'STRING',
		validation: '/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/'
	},
	'salt': {
		type: 'STRING',
		validation: 'nil'
	},
	'token': {
		type: 'STRING',
		validation: 'nil'
	},
	'subscribed_at': {
		type: 'DATE',
		validation: 'nil'
	},
	'last_connection_at': {
		type: 'DATE',
		validation: 'nil'
	},
	'is_active': {
		type: 'BOOLEAN',
		validation: 'nil'
	}
}
```

### User public informations (`public_infos`)

```js
{
	'id': {
		type: 'OBJECT ID',
		validation: '/^[0-9]{1,}*$/'
	},
	'user_id': {
		type: 'OBJECT ID',
		object: 'user',
		relation: 'ONE to ONE',
		validation: 'nil'
	},
	'status': {
		type: 'BOOLEAN',
		validation: 'nil'
	},
	'first_name': {
		type: 'STRING',
		validation: '/^[a-zA-Z]{3,32}$/'
	},
	'last_name': {
		type: 'STRING',
		validation: '/^[a-zA-Z]{3,32}$/'
	},
	'birth_date': {
		type: 'DATE',
		validation: 'nil'
	},
	'gender': {
		type: 'STRING',
		validation: 'nil'
	},
	'orientation': {
		type: 'STRING',
		validation: 'nil'
	},
	'bio': {
		type: 'STRING',
		validation: 'nil'
	},
	'score': {
		type: 'INTEGER',
		validation: 'nil'
	},
	'interests': {
		type: 'ARRAY',
		object: 'interest',
		relation: 'ONE to MANY',
		validation: 'nil'
	},
	'pictures': {
		type: 'ARRAY',
		object: 'picture',
		relation: 'ONE to MANY',
		validation: 'nil'
	},
	'current_location': {
		'x': {
			type: 'STRING',
			validation: 'nil'
		}
		'y': {
			type: 'STRING',
			validation: 'nil'
		}
	}
}
```

### User private informations (`private_infos`)

```js
{
	'id': {
		type: 'OBJECT ID',
		validation: '/^[0-9]{1,}*$/'
	},
	'user_id': {
		type: 'OBJECT ID',
		object: 'user',
		relation: 'ONE to ONE',
		validation: 'nil'
	},
	'threads': {
		type: 'ARRAY',
		object: 'thread',
		relation: 'ONE to ONE',
		validation: 'nil'
	},
	'liked_to': {
		type: 'ARRAY',
		object: 'like',
		relation: 'MANY to ONE',
		validation: 'nil'
	},
	'liked_by': {
		// For faster access
		type: 'ARRAY',
		object: 'like',
		relation: 'MANY to ONE',
		validation: 'nil'
	},
	'matches': {
		// For faster access
		type: 'ARRAY',
		object: 'user',
		relation: 'ONE to MANY',
		validation: 'nil'
	}
	'guests': {
		type: 'ARRAY',
		object: 'user',
		relation: 'ONE to MANY',
		validation: 'nil'
	},
	'blocked_users': {
		type: 'ARRAY',
		object: 'user',
		relation: 'ONE to MANY',
		validation: 'nil'
	}
}
```

### Picture (`picture`)

```js
{
	'id': {
		type: 'OBJECT ID',
		validation: '/^[0-9]{1,}*$/'
	},
	'user_id': {
		type: 'OBJECT ID',
		object: 'user',
		relation: 'ONE to ONE',
		validation: 'nil'
	},
	'number': {
		type: 'INTEGER',
		validation: '/^[0-9]{0,5}$/'
	},
	'type': {
		type: 'STRING',
		validation: 'nil'
	},
	'name': {
		type: 'STRING',
		validation: 'nil'
	}
}
```

### Interest (`interest`)

```js
{
	'id': {
		type: 'OBJECT ID',
		validation: '/^[0-9]{1,}*$/'
	},
	'name': {
		type: 'STRING',
		validation: 'nil'
	},
	'created_at': {
		type: 'DATE',
		validation: 'nil'
	},
	'updated_at': {
		type: 'DATE',
		validation: 'nil'
	}
}
```

### Thread (`thread`)

```js
{
	'id': {
		type: 'OBJECT ID',
		validation: 'nil'
	},
	'source_id': {
		type: 'OBJECT ID',
		object: 'user',
		relation: 'ONE to ONE',
		validation: 'nil'
	},
	'target_id': {
		type: 'OBJECT ID',
		object: 'user',
		relation: 'ONE to ONE',
		validation: 'nil'
	},
	'messages': {
		type: 'ARRAY',
		object: 'message',
		relation: 'ONE to MANY'
		validation: 'nil'
	},
	'created_at': {
		type: 'DATE',
		validation: 'nil'
	},
	'last_post_at': {
		type: 'DATE',
		validation: 'nil',
	}
}
```

### Message (`message`)

```js
{
	'id': {
		type: 'OBJECT ID',
		validation: 'nil'
	},
	'thread_id': {
		type: 'OBJECT ID',
		object: 'thread',
		relation: 'ONE to ONE',
		validation: 'nil'
	},
	'content': {
		type: 'STRING',
		validation: 'nil'
	},
	'read_at': {
		type: 'DATE',
		validation: 'nil'
	},
	'submitted_at': 'id': {
		type: 'OBJECT ID',
		validation: 'nil'
	},
	'is_read': {
		type: 'BOOLEAN',
		validation: 'nil'
	}
}
```

### Like (`like`)

```js
{
	'id': {
		type: 'OBJECT ID',
		validation: 'nil'
	},
	'source_id': {
		type: 'OBJECT ID',
		object: 'user',
		relation: 'ONE to ONE',
		validation: 'nil'
	},
	'target_id': {
		type: 'OBJECT ID',
		object: 'user',
		relation: 'ONE to ONE',
		validation: 'nil'
	},
	'liked_at': {
		type: 'DATE',
		validation: 'nil'
	}
}
```

### Report (`report`)

```js
{
	'id': {
		type: 'OBJECT ID',
		validation: 'nil'
	},
	'source_id': {
		type: 'ARRAY',
		object: 'user',
		relation: 'MANY to ONE',
		validation: 'nil'
	},
	'target_id': {
		type: 'OBJECT ID',
		object: 'user',
		relation: 'ONE to ONE',
		validation: 'nil'
	},
	'type': {
		type: 'ENUM',
		validation: 'nil'
	},
	'comment': {
		type: 'STRING',
		validation: 'nil'
	},
	'reported_at': {
		type: 'DATE',
		validation: 'nil'
	}
}
```
