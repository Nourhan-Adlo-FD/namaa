<template>
  <Board />
</template>

<script>
import Board from './components/Board.vue'

export default {
  name: 'App',
  components: {
    Board
  }
}
</script>

<style lang="scss">
body {
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
    padding: 0 20px;
    p {
        margin: 0;
    }
    button {
        cursor: pointer;
        text-transform: capitalize;
        box-shadow: none;
        outline: none;
    }
    * {
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none;
    }
}
</style>
