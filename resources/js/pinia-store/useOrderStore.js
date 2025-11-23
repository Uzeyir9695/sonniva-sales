import { defineStore, acceptHMRUpdate } from 'pinia'
export const useOrderStore = defineStore('order', {
    persist: false,
    state: () => ({
        currentStep: 1,
        scrollPositions: {},
    }),
    getters: {
        subtotal(state) {

        },
        totalPrice(state) {
            return 0
        },

        validToContinue(state) {
            return true;
        }
    },

    actions: {
        resetOrder() {
            this.currentStep = 1
            this.scrollPositions = {}
        },

        async getServices() {
            //try {
            //    const { data } = await axios.get(route('services.index'))
            //    this.services = data.services
            //    this.glassCutService = data.special_service
            //} catch (error) {
            //    console.error('Failed to load services:', error.response?.data || error.message)
            //}
        },
        nextStep() {
            if (this.currentStep < 3) this.currentStep++
        },
        prevStep() {
            if (this.currentStep > 1) this.currentStep--
        },
        saveScrollPosition(step, position) {
            this.scrollPositions[step] = position
        },
        getScrollPosition(step) {
            return this.scrollPositions[step] || 0
        },
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
}
