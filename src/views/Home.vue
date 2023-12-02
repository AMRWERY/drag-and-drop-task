<template>
  <v-container fluid>
    <v-row dense>
      <v-col class="text-center">
        <span class="text-h6">Drag and drop components below to build your form</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <p class="text-h5">Drag & Drop components</p>
        <v-card v-for="(item, index) in items" :key="index" class="draggable-item resizable" draggable="true"
          @dragstart="handleDragStart(index)" @dragover.prevent="handleDragOverForm"
          @drop.prevent="handleDropForm(index)">
          <v-row class="my-3" dense>
            <v-col cols="4">
              <v-list-subheader>{{ item.label }}</v-list-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field placeholder="placeholder" variant="outlined" density="compact" hint="help" persistent-hint />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" class="drop-area" @dragover.prevent="handleDragOver"
        @drop.prevent="handleDrop">
        <p class="text-h5">Your Form</p>
        <v-card v-for="(item, index) in formItems" :key="index" class="draggable-item resizable" draggable="true"
          @dragstart="handleDragStartForm(index)" @dragover.prevent="handleDragOverForm"
          @drop.prevent="handleDropForm(index)">
          <v-row class="my-3" dense>
            <v-col cols="4">
              <v-list-subheader>{{ item.label }}</v-list-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field placeholder="placeholder" variant="outlined" density="compact" hint="help" persistent-hint />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([
  { type: 'text', label: 'Text input' },
  { type: 'password', label: 'Password input' },
  { type: 'checkbox', label: 'Checkbox' },
  { type: 'radio', label: 'Radio button' },
]);

const formItems = ref([]);
const draggedIndex = ref(null);

const handleDragStart = (index) => {
  draggedIndex.value = index;
};

const handleDragOver = (event) => {
  event.preventDefault();
};

const handleDrop = () => {
  if (draggedIndex.value !== null) {
    const draggedItem = items.value[draggedIndex.value];
    formItems.value.push(draggedItem);
    draggedIndex.value = null;
  }
};

const handleDragStartForm = (index) => {
  draggedIndex.value = index;
};

const handleDragOverForm = (event) => {
  event.preventDefault();
};

const handleDropForm = (index) => {
  if (draggedIndex.value !== null) {
    const draggedItem = formItems.value[draggedIndex.value];
    formItems.value = formItems.value.filter((_, i) => i !== draggedIndex.value);

    if (!items.value.some(item => item.label === draggedItem.label)) {
      items.value.push(draggedItem);
    }

    draggedIndex.value = null;
  }
};
</script>

<style scoped>
.draggable-item {
  padding: 10px;
  margin: 5px;
  cursor: grab;
}

.resizable {
  resize: both;
  overflow: auto;
}

.drop-area {
  padding: 20px;
}
</style>
