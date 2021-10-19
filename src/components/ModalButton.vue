<template>
    <button @click="modalOpen = true">
        {{ buttonText }}
    </button>

    <teleport to="body">
        <div v-if="modalOpen" class="modal">
            <div>
                {{ modalContent }}
                <button @click="modalOpen = false">
                Close
                </button>
            </div>
        </div>
    </teleport>
</template>

<script>
    export default {
        props: {
            buttonText: {
                type: String,
                default: "Open modal dialog"
            },
            modalContent: {
                type: String,
                default: "Modal content"
            },
        },
        data() {
            return {
                modalOpen: false,
            }
        },
    }
</script>

<style lang="css" scoped>
.modal {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background-color: rgba(0,0,0,.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 300px;
  padding: 5px;
}
</style>