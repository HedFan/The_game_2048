<template>
    <div>
        <h1>2048</h1>
        <div class="container">
            <div class="row justify-content-center">

                    <div class="box">
                        <div v-for="x in 4" :key="x" class="block">
                            <span v-for="y in 4" :key="y + '_' + x"></span>
                        </div>
                        <Items></Items>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Items from '../components/Items'
    export default {
        name: "Game",
        components: {Items},
        data() {
            return {


            }
        },
    }
</script>

<style lang="scss">
    .box {
        overflow: hidden;
        position: relative;
        height: 490px;
        width: 490px;
        background-color: antiquewhite;
        border-radius: 8px;
        margin: auto;
        padding: 5px;
        .block {
            width: 100%;
            height: 120px;
            span {
                width: 110px;
                height: 110px;
                display: inline-block;
                border-radius: 8px;
                margin: 5px;
                background: #a52a2a42;
            }
        }
    }
    @media(max-width: 564px) {
        .box {
            height: 87vw;
            width: 87vw;
            padding: 0.9vw;
            .block {
                height: 21.2vw;
                span {
                    width: 19.5vw;
                    height: 19.5vw;
                    margin: 0.9vw;
                }
            }
        }
    }

</style>