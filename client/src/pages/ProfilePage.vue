<template>
  <div v-if="!isPageLoading">
    <q-layout>
      <HeaderLayout></HeaderLayout>
      <div class="q-pa-md list-container">
        <h1 class="page-title">Profile</h1>
        <q-list class="items-list" bordered>
          <div v-for="(profileItem, index) in profileItems" :key="index" class="item q-ml-xl">
            <q-item class="row items-center">
              <q-item-section class="item__name text-grey text-capitalize">{{ profileItem.item.key }}</q-item-section>
              <q-btn @click="deleteProfileItem(profileItem.item)" class="option-icon" flat round dense
                icon="clear" />
            </q-item>
            <q-item class="row items-center">
              <div @input="inputChange" class="info-input tight-text" :class="profileItem.isEditing ? 'info-input_active' : ''"
                :contenteditable="profileItem.isEditing ? 'true' : 'false'">
                {{ profileItem.item.value}}
              </div>
              <q-btn
                @click="!isEditing ? setIsEditingItemTrue(profileItem.item.key, profileItem.item.value) : saveItem(profileItem.item.key, profileItem.item.value)"
                :class="isEditing && !profileItem.isEditing ? 'hidden' : ''" class="option-icon" flat round
                dense :icon="profileItem.isEditing ? 'check' : 'edit'" />
            </q-item>
          </div>
        </q-list>
      </div>
      <q-form class="q-mb-lg column items-center" @submit="addItem">
        <div class="q-mb-xs justify-center items-center column">
          <q-item
          @input="setIsCreationErrorFalse"
          v-if="isCreating">
            <q-input filled v-model="newItemKey" label="key" label-color="grey" color="white" lazy-rules
              :rules="[val => !!val || 'Key is required']" />
          </q-item>
          <q-item v-if="isCreating">
            <q-input mask="" filled v-model="newItemValue" label="value" label-color="grey" color="white" lazy-rules
              :rules="[val => !!val || 'Value is required']" />
          </q-item>
        </div>
        <p v-if="isCreating" class="error-msg">{{ isCreationError ? 'Item with this key already exists' : '' }}</p>
        <PrimaryButton text="Add item"></PrimaryButton>
      </q-form>
    </q-layout>
  </div>
</template>

<script lang="ts">
import PrimaryButton from '../components/PrimaryButton.vue';
import HeaderLayout from '../components/ProfileHeader.vue';
import UserService from 'src/services/UserService';
import { useStore } from 'src/stores/store';
import { Ref, ref } from 'vue';
import { IFullProfileItem, IProfileItem } from 'src/models/IProfileItem';
import AuthService from 'src/services/AuthService';

export default {
  setup() {
    const store = useStore();
    const isPageLoading = ref(true);
    const isCreating = ref(false);
    const isCreationError = ref(false);
    const isEditing = ref(false);
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
          const newItem: IProfileItem = { key: newItemKey.value, value: newItemValue.value };
          profileItems.value = [...profileItems.value, { item: newItem, isEditing: false }];
          isCreationError.value = false;
          isCreating.value = false;
          newItemKey.value = '';
          newItemValue.value= '';
          const response = await UserService.addProfileItem(newItem);
        }
      } else {
        isCreating.value = true;
      }
    }

    const inputChange = (e: any) => { // i don't know how to define type here, anyway bad practice
      currentEditInput.value = e.target.innerText;
    }

    const setIsCreationErrorFalse = () => {
      isCreationError.value = false;
    }

    const setIsEditingItemTrue = (itemKey: string, itemValue: string) => {
      isEditing.value = true;
      console.log(itemValue);
      if (itemValue==='' || itemValue==='---') {
        editProfileItem(itemKey, '', true);
      } else {
        editProfileItem(itemKey, itemValue, true);
      }
      /* profileItems.value = profileItems.value.map((profileItem) => {
        if (profileItem.item.key === itemKey) {
          return { item: { key: profileItem.item.key, value: profileItem.item.value }, isEditing: true }
        } else {
          return profileItem
        }
      }) */
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

    const deleteProfileItem = async (profileItem: IProfileItem) => {
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
      isPageLoading,
      addItem,
      inputChange,
      saveItem,
      setIsEditingItemTrue,
      setIsCreationErrorFalse,
      deleteProfileItem,
    }
  },
  async mounted() {
    const profileInfo: IProfileItem[] = this.store.user.profileInfo.map((el) => JSON.parse(el));
    this.profileItems = profileInfo.map((profileItem): IFullProfileItem => {
      return { item: profileItem, isEditing: false }
    });
    this.isPageLoading = false;
  },
  components: {
    PrimaryButton,
    HeaderLayout,
  },
  async beforeRouteEnter(to, from, next) {
    await AuthService.initUser();
    const store = useStore();
    if ( store.isAuth ) {
      next();
    } else {
      next('/');
    }
  }
}
</script>

<style lang="scss">
.info-input {
  overflow: hidden;
  text-overflow: ellipsis;
  border: 0;
  outline: none;
  background: transparent;
  width: 100%;
  min-height: 3rem;
  color: $white;
  font-size: 2rem;
}

.items-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.info-input_active {
  pointer-events: all;
  border-bottom: 0.1rem solid $grey;
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
  border-bottom: 0;
}

.active {
  display: block;
}

.q-field {
  &__native {
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
}

.option-icon {
  opacity: 0;
  color: $grey;
  position: absolute;
  left: -3.4rem;
}

.option-icon:hover {
  color: $white;
}

.item {
  flex-basis: 30%;
  max-width: 20rem;
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
}

.list-container {
  padding: 0;
  margin: auto;
  max-width: 80%;
}
</style>
