<template>
    <div :class="[{active: isOpen}, 'accordion-item']">
        <h4>
            <button 
                :id="`accordion-header-${itemId}`"
                class="accordion-item-header"
                :aria-expanded="isOpen ? 'true' : 'false'"
                @click="onToggle(itemId)">
                {{title}}
                <svgo-plus v-if="!isOpen" class="accordion-item-icon"/>
                <svgo-minus v-else class="accordion-item-icon"/>
            </button>
        </h4>
        <article
            class="accordion-item-content"
            :id="`accordion-panel-${itemId}`"
            aria-labelledby="accordion-header-1">
            <p>{{content}}</p>
        </article>
    </div>
</template>

<script setup lang="ts">
interface IAccordionItemProps {
    itemId: number;
    title: string;
    content: string;
    isOpen: boolean;
}

const emit = defineEmits(['toggle'])
defineProps<IAccordionItemProps>()
const onToggle = (id: number) => emit('toggle', id)
</script>
<style lang="scss" scoped src="./Accordion.scss"></style>