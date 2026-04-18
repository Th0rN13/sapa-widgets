export async function fetchKing(): Promise<string> {
	const res = await fetch("/api/king");
	const data = await res.json();
	return data.name;
}

export async function fetchMonth(): Promise<string[]> {
	const res = await fetch("/api/month");
	const data = await res.json();
	return data.donaters;
}

export async function fetchLastDay(): Promise<string[]> {
	const res = await fetch("/api/last-day");
	const data = await res.json();
	return data.donaters;
}
