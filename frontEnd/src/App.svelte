<script>
	import { user } from './stores.js';
	import Header from "./Header.svelte";
	import Signin from "./Signin.svelte";

	const userEmail = localStorage.getItem('user')
</script>


<Header/>
{#if $user || userEmail}
<main>
	<h2>Lists</h2>
</main>
{:else}
	<Signin/>
{/if}

