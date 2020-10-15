<template>
    <div class="content">
        <div class="content__tools">
            <el-form class="form" :model="newBook" label-width="120px" label-position="top">
                <el-form-item label="Title" prop="title">
                    <el-input v-model="newBook.title" type="text"></el-input>
                </el-form-item>
                <el-form-item label="Author" prop="author">
                    <el-input v-model="newBook.author" type="text"></el-input>
                </el-form-item>
                <el-button type="primary" :loading="loading" @click="submit()">Add book</el-button>
            </el-form>
        </div>
        <div class="content__data">
            <div class="content__title">Books</div>
            <div v-for="(book, index) in books" :key="index" class="book">
                <div class="book__title">{{ book.title }}</div>
                <div class="book__author">{{ book.author }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { Book } from './../types/book';

@Component({
    components: {},
    computed: {
        ...mapGetters({
            books: 'books/BOOKS',
            loading: 'books/LOADING'
        })
    }
})
export default class Books extends Vue {
    newBook: Book = {
        title: '',
        author: ''
    };
    mounted() {
        this.$store.dispatch('books/GET_LIST');
        this.$store.dispatch('books/WATCH_LIST');
    }
    submit() {
        this.$store.dispatch('books/ADD', this.newBook);
    }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables';
.content {
    display: flex;
    height: 100vh;
    &__tools {
        width: 30%;
        padding: 20px;
        border-right: 1px solid $color-main-80;
    }
    &__data {
        flex: 1;
        padding: 20px;
        background: linear-gradient(90deg, rgba($color-main-90, 0.95) 0%, $color-background 10%);
    }
    &__title {
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: bold;
        color: $color-primary;
    }
}
.book {
    display: flex;
    margin-bottom: 5px;
    &__title {
        font-weight: bold;
        color: $color-main-20;
    }
    &__author {
        padding-left: 6px;
        color: $color-main-30;
    }
}
</style>
