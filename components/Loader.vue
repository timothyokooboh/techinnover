<template>
    <div class="intro">
        <div class="intro-text">
            <h1 class="hide">
                <span class="text">
                    Techinnover
                </span>
            </h1>
            <h1 class="hide">
                <span class="text">
                    Coding
                </span>
            </h1>
            <h1 class="hide">
                <span class="text">
                    Challenge
                </span>
            </h1>
        </div>
    
        <div class="slider"> </div>
    </div>
</template>

<script>
import gsap from "gsap";

export default {
    mounted() {
        const tl = gsap.timeline(
            {
                defaults: {
                    ease: "power1.out"
                }
            }
        )

        tl.to(".text", {y: "0%", duration: 0.8, stagger: 0.25})
        tl.to(".slider", {y: "-100%", duration: 1.5, delay: 0.5})
        tl.to(".intro", {y: "-100%", duration: 1}, "-=1.4")

        setTimeout(() => {
            this.$store.state.showOnPageLoader = false
        }, 3000)
    }
}
</script>

<style lang="scss" scoped>
    .intro {
        background: black;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 500000;
    }

    .intro-text {
        color: rgb(233, 233, 233);
        font-size: 3rem;
        text-align: center;

        @media only screen and(max-width: 31.25em) {
            font-size: 2rem;
        }
    }

    .slider {
        background: rgb(97, 105, 109);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: translateY(100%);
    }

    .hide {
        background: black;
        overflow: hidden;
    }

    .hide span {
        transform: translateY(100%);
        display: inline-block;
    }

</style>