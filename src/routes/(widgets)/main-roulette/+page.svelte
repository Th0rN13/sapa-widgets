<script lang="ts">
	import WidgetSingle from "$cmp/WidgetSingle.svelte";

	const names = [
		"Сапушка",
		"КиберКот",
		"Морковка",
		"Пельмешка",
		"Снежинка",
		"Бусинка",
		"Зефирка",
		"Мармелад",
		"Вафелька",
		"Кексик",
	];

	let currentName = $state(names[0]);
	let imageSrc = $state("/main_roulette_bg.png");

	$effect(() => {
		const interval = setInterval(() => {
			currentName = names[Math.floor(Math.random() * names.length)];
		}, 10000);

		return () => clearInterval(interval);
	});
</script>

<WidgetSingle {imageSrc} name={currentName} />
