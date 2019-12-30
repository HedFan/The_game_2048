<template>
    <div id="app">
        <RouterView></RouterView>
    </div>
</template>


<script>
       export default {
        name: 'App',

    }
</script>

<style>
    html, body {
        margin: 5px;
        padding: 0;
        overflow-x: hidden;
    }

    ul {
        list-style: none;
    }

    img {
        width: 100%;
    }

    h4 {
        margin: 0 auto 15px;
    }

    li {
        cursor: pointer;
    }

    p {
        color: black;
        font-size: 16px;
    }

    p.modalW {
        position: fixed;
        width: 200px;
        height: 70px;
        left: calc(50% - 50px);
        top: 30%;
        background: white;
        padding: 20px 15px;
        border: 1px solid black;
        border-radius: 6px;
        text-align: center;
        box-shadow: 4px 3px 10px 0px rgba(0, 0, 0, 0.15);
    }

    span {
        color: brown;
    }

    input.focus {
        background-color: indianred;
    }

    /*animation*/
    .modal-enter-active, .modal-leave-active {
        transition: all .5s
    }

    .modal-enter, .modal-leave-to {
        transform: translateY(50px);
        opacity: 0;
    }

    .phone-enter-active, .phone-leave-active {
        transition: all .5s;
    }

    .phone-enter, .phone-leave-to {
        opacity: 0;
    }

    .ensi {
        color: #3a7e6a;
        cursor: pointer;
    }

    .toinen {
        border-bottom: 1px solid darkgray;
        cursor: pointer;
    }

    .active-turnarem {
        color: green;
    }

    .passive-turnarem {
        color: orangered;
    }

    .isKolmen {
        color: dodgerblue;
    }

    button {
        background: whitesmoke;
        border-radius: 5px;
    }
</style>
