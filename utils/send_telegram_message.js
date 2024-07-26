module.exports = async (telegram_id, name, status, date) => {
	const header = {
		'Content-Type': 'application/json'
	}

	const paylaod = {
		'chat_id': telegram_id,
		'parse_mode': 'MarkdownV2',
		'text': `📢 Attendance Notification \\-  \`${date}\` 🗓️\n\nDear Parents/Guardians,\nWe are pleased to inform you that your child,\`${name}\`, is *||${status}||* at tuition on \`${date}\` 📅  Their regular attendance is crucial for academic progress 📚\\. If you have any questions❓or concerns, please feel free to reach out to us\\. Thank you for your continued support 🙌\\.\n\nBest regards,\nTeam OSF`
	}

	var raw = JSON.stringify(paylaod)

	var request_options = {
		method: 'POST',
		headers: header,
		body: raw
	}

	const data = await fetch(`${process.env.TELEGRAM_URL}/sendMessage`, request_options)
	return data.status
}