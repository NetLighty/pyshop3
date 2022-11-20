<template>
  <div v-if="!isLoading">
    <div
  class="q-pa-md list-container">
    <h1 class="profile-title">Profile</h1>
    <q-list bordered>
      <div v-for="(profileItem, index) in profileItems" :key="index" class="item">
        <q-item class="row items-center">
          <q-item-section class="item__name text-grey text-capitalize">{{profileItem.item.key}}</q-item-section>
          <q-btn
          @click="deleteProfileItem(profileItem.item)"
          class="option-icon"
          color="grey"
          flat round dense
          icon="clear" />
        </q-item>
        <q-item class="row items-center">
          <!-- <textarea
          @input="inputChange"
          class="info-input"
          :class="profileItem.isEditing ? 'info-input_active' : ''"
          type="text"
          rows="1"
          :value="profileItem.item.value" /> -->
          <div
          @input="inputChange"
          class="info-input"
          :class="profileItem.isEditing ? 'info-input_active' : ''"
          :contenteditable="profileItem.isEditing ? 'true' : 'false'"
          >
            {{profileItem.item.value}}
          </div>
          <q-btn
          @click=" !isEditing ? editItem(profileItem.item.key) : saveItem(profileItem.item.key, profileItem.item.value)"
          :class="isEditing && !profileItem.isEditing ? 'hidden' : ''"
          class="option-icon"
          color="grey"
          flat round dense
          :icon="profileItem.isEditing ? 'check' : 'edit'" />
        </q-item>
      </div>
    </q-list>
  </div>
  <q-form @submit="addItem">
      <div class="create-item-form">
        <q-item v-if="isCreating">
          <q-input filled v-model="newItemKey" label="key" label-color="grey" color="white" lazy-rules
            :rules="[val => !!val || 'Key is required']" />
        </q-item>
        <q-item v-if="isCreating">
          <q-input mask="" filled v-model="newItemValue" label="value" label-color="grey" color="white" lazy-rules
            :rules="[val => !!val || 'Value is required']" />
        </q-item>
      </div>
      <p class="text-negative error-msg">{{ isCreationError ? 'Item with this key already exists' : '' }}</p>
      <PrimaryButton text="Add item"></PrimaryButton>
    </q-form>
  </div>
</template>

<script lang="ts">
import PrimaryButton from '../components/PrimaryButton.vue';
import UserService from 'src/services/UserService';
import { useStore } from 'src/stores/store';
import { Ref, ref } from 'vue';
import { IFullProfileItem, ProfileItem } from 'src/models/ProfileItem';
import AuthService from 'src/services/AuthService';

export default {
  setup() {
    const store = useStore();
    const isCreating = ref(false);
    const isCreationError = ref(false);
    const isEditing = ref(false);
    const isLoading = ref(true);
    const profileItems: Ref<IFullProfileItem[]> = ref([]);
    const newItemKey = ref('');
    const newItemValue = ref('');
    const currentEditInput = ref('');

    const addItem = async () => {
      if (isCreating.value) {
        const existingItem = profileItems.value.find(
          (profileItem) => profileItem.item.key.toLowerCase() === newItemKey.value.toLowerCase()
        );
        if (existingItem) {
          isCreationError.value = true;
        } else {
          const newItem: ProfileItem = { key: newItemKey.value, value: newItemValue.value };
          console.log(newItem);
          const response = await UserService.addProfileItem(newItem);
          profileItems.value = [...profileItems.value, { item: newItem, isEditing: false }];
          console.log('response', response);
          isCreationError.value = false;
          isCreating.value = false;
        }
      } else {
        isCreating.value = true;
      }
    }

    const inputChange = (e: any) => { // i dont know how to define type here, anyway bad practice
      console.log(e.target.innerText);
      currentEditInput.value = e.target.innerText;
    }

    const setIsEditingItemTrue = (itemKey: string) => {
      console.log(itemKey);
      isEditing.value = true;
      profileItems.value = profileItems.value.map((profileItem) => {
        if (profileItem.item.key === itemKey) {
          return { item: { key: profileItem.item.key, value: profileItem.item.value }, isEditing: true }
        } else {
          return profileItem
        }
      })
    }

    const editProfileItem = async (itemKey: string, value: string, isEditing: boolean) => {
      profileItems.value = profileItems.value.map((profileItem) => {
        if (profileItem.item.key === itemKey) {
          return { item: { key: itemKey, value }, isEditing };
        } else {
          return profileItem;
        }
      })
      const response = await UserService.editProfileItem({ key: itemKey, value });
      console.log(response.data);
    }

    const saveItem = async (itemKey: string, initialItemValue: string) => {
      if (currentEditInput.value !== '') {
        editProfileItem(itemKey, currentEditInput.value, false);
        currentEditInput.value = '';
      } else {
        editProfileItem(itemKey, initialItemValue, false);
      }
      isEditing.value = false;
    }

    const deleteProfileItem = async (profileItem: ProfileItem) => {
      profileItems.value = profileItems.value.filter((item) => item.item.key !== profileItem.key)
      const response = await UserService.deleteProfileItem(profileItem);
      console.log(response.data);
    }

    return {
      profileItems,
      store,
      newItemKey,
      newItemValue,
      isCreating,
      isEditing,
      isCreationError,
      isLoading,
      // itemRefs,
      addItem,
      inputChange,
      saveItem,
      editItem: setIsEditingItemTrue,
      deleteProfileItem,
    }
  },
  async mounted() {
    await AuthService.initUser();
    const profileInfo: ProfileItem[] = this.store.user.profileInfo.map((el) => JSON.parse(el));
    this.profileItems = profileInfo.map((profileItem): IFullProfileItem => {
      return {item: profileItem, isEditing: false}
    });
    this.isLoading = false;
  },
  components: {
    PrimaryButton,
  },
}
</script>

<style lang="scss">
.create-item-form {
  margin-bottom: 1rem;
}
.info-input {
  overflow: hidden;
  text-overflow: ellipsis;
  border: 0;
  outline: none;
  background: transparent;
  color: $white;
  font-size: 2rem;
}
.info-input_active {
  pointer-events: all;
  border-bottom: 0.1rem solid $grey;
  // box-shadow: 0 0 1rem 1rem rgba($grey, 0.2) inset;
}
.profile-title {
  user-select: none;
  margin: 0 0 1rem 0;
  font-size: 4rem;
  color: $white;
  font-family: 'Dancing Script', cursive;
  letter-spacing: 0.2rem;
}
.edit-input {
  // display: none;
  border-bottom: 0;
}
.active {
  display: block;
}
.q-field {
  &__native {
    padding: 0;
    color: $white;
    border-bottom: 0.1rem solid $grey;
  }
  &__control-container {
    display: flex;
    align-content: center;
  }
}
.q-form {
  margin: 0 auto;
  padding: 0;
  width: fit-content;
}
.option-icon {
  opacity: 0;
  position: absolute;
  left: -3.4rem;
}
.option-icon:hover {
  color: $white;
}

.item {
  margin-bottom: 1.1rem;
  text-align: justify;
  &__name {
    height: 2rem;
    font-size: 1.9rem;
  }

  &__info {
    font-size: 2rem;
    text-overflow: ellipsis;
    word-break: break-all;
  }
}
.item:hover {
  .option-icon {
    transition: 0.3s ease;
    opacity: 1;
  }
}

.q-item {
  padding: 0;
  min-height: auto;
  &__section {
    // width: fit-content;
  }
}

.q-input {
  width: 100%;
}

.list-container {
  padding: 0;
  margin: auto;
  width: fit-content;
  max-width: 80%;
}
</style>
