module.exports = async (phone_number, name, status, date) => {
	const header = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${process.env.WA_TOKEN}`
	}

	const paylaod = {
		'messaging_product': 'whatsapp',
		'to': phone_number,
		'type': 'template',
		'template': {
			'name': 'attendance',
			'language': {
				'code': 'en',
				'policy': 'deterministic'
			},
			'components': [
				{
					'type': 'body',
					'parameters': [
						{
							'type': 'text',
							'text': date
						},
						{
							'type': 'text',
							'text': name
						},
						{
							'type': 'text',
							'text': `*${status}*`
						}
					]
				}
			]
		}
	}

	var raw = JSON.stringify(paylaod)

	var request_options = {
		method: 'POST',
		headers: header,
		body: raw
	}

	const data = await fetch(`${process.env.WA_URL}/messages`, request_options)
	return data.status
}