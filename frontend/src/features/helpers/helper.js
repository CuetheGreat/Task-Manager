export const fetchAPI = async (URL, method, body) => {
	const res = await fetch(URL, {
		method,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	})
	if (!res.ok) {
		throw new Error(`Error: ${res.statusText}`);
	}
	return res.json
}
