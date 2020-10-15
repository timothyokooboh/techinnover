<template>
    <h1> dashboard {{$store.state.lastName}}</h1>
</template>

<script>
export default {
    middleware: ["auth"]
}
</script>