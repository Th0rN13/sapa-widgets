<script lang="ts">
	interface Props {
		imageSrc: string;
		name: string;
	}

	let { imageSrc, name }: Props = $props();

	let oldName: string = $state("Никого нет");
	let newName: string | null = $state(null);
	let isAnimating: boolean = $state(false);

	$effect(() => {
		if (name !== oldName) {
			newName = name;
			isAnimating = true;
		}
	});

	function handleAnimationEnd() {
		oldName = newName ?? oldName;
		newName = null;
		isAnimating = false;
	}
</script>

<div class="widget">
	<img src={imageSrc} alt="Widget" class="widget-bg" />
	<div class="nickname">
		{#if isAnimating}
			<span class="nick-item old">{oldName}</span>
			<span class="nick-item new" onanimationend={handleAnimationEnd}
				>{newName}</span
			>
		{:else}
			<span class="nick-item">{oldName}</span>
		{/if}
	</div>
</div>

<style>
	.widget {
		position: relative;
		width: 856px;
		height: 230px;
	}

	.widget-bg {
		position: absolute;
		top: 0;
		left: 0;
	}

	.nickname {
		position: absolute;
		top: 28px;
		right: 20px;
		width: 600px;
		height: 80px;
		font-size: 56px;
		font-weight: bold;

		display: flex;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
		overflow: hidden;
		mask-image: linear-gradient(
			to right,
			transparent 0%,
			black 10%,
			black 90%,
			transparent 100%
		);
	}

	.nick-item {
		position: absolute;
		display: inline-block;

		background: linear-gradient(
			to bottom,
			#ffefba 0%,
			#e6b15b 50%,
			#d48c31 100%
		);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;

		filter: drop-shadow(0px 2px 0px #704118)
			drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.3));

		-webkit-text-stroke: 2px #4d2b0f;
	}

	.nick-item.old {
		animation: slide-out 1s ease-out forwards;
	}

	.nick-item.new {
		transform: translateX(300px);
		opacity: 0;
		animation: slide-in 1s ease-out 1s forwards;
	}

	@keyframes slide-out {
		from {
			transform: translateX(0);
			opacity: 1;
		}
		to {
			transform: translateX(-300px);
			opacity: 0;
		}
	}

	@keyframes slide-in {
		from {
			transform: translateX(300px);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}
</style>
